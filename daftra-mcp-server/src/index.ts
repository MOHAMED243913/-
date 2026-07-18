#!/usr/bin/env node
/**
 * Daftra MCP Server
 *
 * Exposes Daftra (دفترة) accounting operations as MCP tools over stdio:
 *  - create_purchase_invoice  إنشاء فاتورة شراء
 *  - create_sales_invoice     إنشاء فاتورة بيع
 *  - add_client               إضافة عميل
 *  - add_supplier             إضافة مورد
 *  - add_product              إضافة منتج
 *  - list_invoices            جلب الفواتير (بيع أو شراء)
 *  - list_clients             جلب العملاء
 *  - list_suppliers           جلب الموردين
 *
 * All tools call the Daftra REST API (api2) authenticated with the
 * account API key from the DAFTRA_API_KEY environment variable.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { DaftraClient, DaftraApiError, loadConfig } from "./daftra-client.js";

const client = new DaftraClient(loadConfig());

const server = new McpServer({
  name: "daftra",
  version: "1.0.0",
});

/** Format any tool result / error as MCP text content. */
function ok(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function fail(error: unknown) {
  const message =
    error instanceof DaftraApiError
      ? `Daftra API request failed (HTTP ${error.status}): ${error.body}`
      : error instanceof Error
        ? error.message
        : String(error);
  return {
    content: [{ type: "text" as const, text: message }],
    isError: true,
  };
}

/** Strip undefined values so we only send fields the caller provided. */
function compact<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  );
}

// ---------------------------------------------------------------------------
// Shared schemas
// ---------------------------------------------------------------------------

const invoiceItemSchema = z.object({
  product_id: z.number().optional().describe("Daftra product ID (optional if item/description is provided)"),
  item: z.string().optional().describe("Item name/label as it appears on the invoice"),
  description: z.string().optional().describe("Item description"),
  unit_price: z.number().describe("Unit price"),
  quantity: z.number().default(1).describe("Quantity (default 1)"),
  tax1: z.number().optional().describe("Tax 1 percentage (e.g. 14 for 14% VAT)"),
  tax2: z.number().optional().describe("Tax 2 percentage"),
  discount: z.number().optional().describe("Line discount amount or percentage per Daftra settings"),
});

const listingParams = {
  page: z.number().optional().describe("Page number (default 1)"),
  limit: z.number().optional().describe("Results per page (default 20, max 1000)"),
};

// ---------------------------------------------------------------------------
// Invoices
// ---------------------------------------------------------------------------

server.registerTool(
  "create_sales_invoice",
  {
    title: "إنشاء فاتورة بيع",
    description:
      "Create a sales invoice in Daftra (POST /api2/invoices). Requires a client_id and at least one line item.",
    inputSchema: {
      client_id: z.number().describe("Daftra client ID the invoice is issued to"),
      date: z.string().optional().describe("Invoice date YYYY-MM-DD (defaults to today)"),
      no: z.string().optional().describe("Invoice number (auto-generated if omitted)"),
      currency_code: z.string().optional().describe("Currency code, e.g. EGP, SAR, USD"),
      notes: z.string().optional().describe("Invoice notes"),
      discount: z.number().optional().describe("Invoice-level discount"),
      deposit: z.number().optional().describe("Amount already paid (creates a payment/deposit)"),
      draft: z.boolean().optional().describe("Save as draft instead of issuing"),
      items: z.array(invoiceItemSchema).min(1).describe("Invoice line items"),
    },
  },
  async ({ items, draft, ...rest }) => {
    try {
      const payload = {
        Invoice: compact({
          ...compact(rest as Record<string, unknown>),
          draft: draft === undefined ? undefined : draft ? 1 : 0,
        }),
        InvoiceItem: items.map((item) => compact(item)),
      };
      return ok(await client.post("invoices", payload));
    } catch (error) {
      return fail(error);
    }
  },
);

server.registerTool(
  "create_purchase_invoice",
  {
    title: "إنشاء فاتورة شراء",
    description:
      "Create a purchase invoice in Daftra (POST /api2/purchase_invoices). Requires a supplier_id and at least one line item.",
    inputSchema: {
      supplier_id: z.number().describe("Daftra supplier ID the purchase is from"),
      date: z.string().optional().describe("Invoice date YYYY-MM-DD (defaults to today)"),
      no: z.string().optional().describe("Purchase invoice number (auto-generated if omitted)"),
      currency_code: z.string().optional().describe("Currency code, e.g. EGP, SAR, USD"),
      notes: z.string().optional().describe("Invoice notes"),
      discount: z.number().optional().describe("Invoice-level discount"),
      deposit: z.number().optional().describe("Amount already paid to the supplier"),
      draft: z.boolean().optional().describe("Save as draft instead of issuing"),
      items: z.array(invoiceItemSchema).min(1).describe("Purchase invoice line items"),
    },
  },
  async ({ items, draft, ...rest }) => {
    try {
      const payload = {
        PurchaseInvoice: compact({
          ...compact(rest as Record<string, unknown>),
          draft: draft === undefined ? undefined : draft ? 1 : 0,
        }),
        PurchaseInvoiceItem: items.map((item) => compact(item)),
      };
      return ok(await client.post("purchase_invoices", payload));
    } catch (error) {
      return fail(error);
    }
  },
);

server.registerTool(
  "list_invoices",
  {
    title: "جلب الفواتير",
    description:
      "List invoices from Daftra. Set type to 'sales' (GET /api2/invoices) or 'purchase' (GET /api2/purchase_invoices). Supports pagination and basic filters.",
    inputSchema: {
      type: z.enum(["sales", "purchase"]).default("sales").describe("Invoice type: sales or purchase"),
      client_id: z.number().optional().describe("Filter sales invoices by client ID"),
      supplier_id: z.number().optional().describe("Filter purchase invoices by supplier ID"),
      date_from: z.string().optional().describe("Filter: invoices on/after this date (YYYY-MM-DD)"),
      date_to: z.string().optional().describe("Filter: invoices on/before this date (YYYY-MM-DD)"),
      ...listingParams,
    },
  },
  async ({ type, client_id, supplier_id, date_from, date_to, page, limit }) => {
    try {
      const path = type === "purchase" ? "purchase_invoices" : "invoices";
      const query: Record<string, string | number | undefined> = { page, limit };
      if (client_id !== undefined) query["filter[client_id]"] = client_id;
      if (supplier_id !== undefined) query["filter[supplier_id]"] = supplier_id;
      if (date_from) query["filter[date][gte]"] = date_from;
      if (date_to) query["filter[date][lte]"] = date_to;
      return ok(await client.get(path, query));
    } catch (error) {
      return fail(error);
    }
  },
);

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

server.registerTool(
  "add_client",
  {
    title: "إضافة عميل",
    description: "Create a new client (customer) in Daftra (POST /api2/clients).",
    inputSchema: {
      business_name: z.string().optional().describe("Company/business name (required if no first/last name)"),
      first_name: z.string().optional().describe("Contact first name"),
      last_name: z.string().optional().describe("Contact last name"),
      email: z.string().optional().describe("Email address"),
      phone1: z.string().optional().describe("Primary phone number"),
      phone2: z.string().optional().describe("Secondary phone number"),
      address1: z.string().optional().describe("Address line 1"),
      city: z.string().optional().describe("City"),
      state: z.string().optional().describe("State/governorate"),
      country_code: z.string().optional().describe("ISO country code, e.g. EG, SA"),
      tax_number: z.string().optional().describe("Client tax registration number"),
      client_number: z.string().optional().describe("Client number/code (auto-generated if omitted)"),
      credit_limit: z.number().optional().describe("Credit limit"),
      notes: z.string().optional().describe("Notes"),
    },
  },
  async (input) => {
    try {
      const data = compact(input as Record<string, unknown>);
      if (!data.business_name && !data.first_name && !data.last_name) {
        return fail(new Error("Provide business_name or first_name/last_name."));
      }
      return ok(await client.post("clients", { Client: data }));
    } catch (error) {
      return fail(error);
    }
  },
);

server.registerTool(
  "list_clients",
  {
    title: "جلب العملاء",
    description: "List clients from Daftra (GET /api2/clients). Supports pagination and name/email filters.",
    inputSchema: {
      business_name: z.string().optional().describe("Filter by business name"),
      email: z.string().optional().describe("Filter by email"),
      phone: z.string().optional().describe("Filter by phone number"),
      ...listingParams,
    },
  },
  async ({ business_name, email, phone, page, limit }) => {
    try {
      const query: Record<string, string | number | undefined> = { page, limit };
      if (business_name) query["filter[business_name]"] = business_name;
      if (email) query["filter[email]"] = email;
      if (phone) query["filter[phone1]"] = phone;
      return ok(await client.get("clients", query));
    } catch (error) {
      return fail(error);
    }
  },
);

// ---------------------------------------------------------------------------
// Suppliers
// ---------------------------------------------------------------------------

server.registerTool(
  "add_supplier",
  {
    title: "إضافة مورد",
    description: "Create a new supplier in Daftra (POST /api2/suppliers).",
    inputSchema: {
      business_name: z.string().optional().describe("Company/business name (required if no first/last name)"),
      first_name: z.string().optional().describe("Contact first name"),
      last_name: z.string().optional().describe("Contact last name"),
      email: z.string().optional().describe("Email address"),
      phone1: z.string().optional().describe("Primary phone number"),
      phone2: z.string().optional().describe("Secondary phone number"),
      address1: z.string().optional().describe("Address line 1"),
      city: z.string().optional().describe("City"),
      state: z.string().optional().describe("State/governorate"),
      country_code: z.string().optional().describe("ISO country code, e.g. EG, SA"),
      tax_number: z.string().optional().describe("Supplier tax registration number"),
      supplier_number: z.string().optional().describe("Supplier number/code (auto-generated if omitted)"),
      notes: z.string().optional().describe("Notes"),
    },
  },
  async (input) => {
    try {
      const data = compact(input as Record<string, unknown>);
      if (!data.business_name && !data.first_name && !data.last_name) {
        return fail(new Error("Provide business_name or first_name/last_name."));
      }
      return ok(await client.post("suppliers", { Supplier: data }));
    } catch (error) {
      return fail(error);
    }
  },
);

server.registerTool(
  "list_suppliers",
  {
    title: "جلب الموردين",
    description: "List suppliers from Daftra (GET /api2/suppliers). Supports pagination and name/email filters.",
    inputSchema: {
      business_name: z.string().optional().describe("Filter by business name"),
      email: z.string().optional().describe("Filter by email"),
      ...listingParams,
    },
  },
  async ({ business_name, email, page, limit }) => {
    try {
      const query: Record<string, string | number | undefined> = { page, limit };
      if (business_name) query["filter[business_name]"] = business_name;
      if (email) query["filter[email]"] = email;
      return ok(await client.get("suppliers", query));
    } catch (error) {
      return fail(error);
    }
  },
);

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

server.registerTool(
  "add_product",
  {
    title: "إضافة منتج",
    description: "Create a new product in Daftra (POST /api2/products).",
    inputSchema: {
      name: z.string().describe("Product name"),
      description: z.string().optional().describe("Product description"),
      unit_price: z.number().optional().describe("Selling unit price"),
      buy_price: z.number().optional().describe("Purchase (cost) price"),
      product_code: z.string().optional().describe("Product code/SKU (auto-generated if omitted)"),
      barcode: z.string().optional().describe("Barcode"),
      category_id: z.number().optional().describe("Daftra category ID"),
      brand_id: z.number().optional().describe("Daftra brand ID"),
      unit_id: z.number().optional().describe("Measurement unit ID"),
      track_stock: z.boolean().optional().describe("Enable inventory stock tracking"),
      stock_balance: z.number().optional().describe("Opening stock quantity (when tracking stock)"),
      low_stock_thershold: z.number().optional().describe("Low stock alert threshold (Daftra field spelling)"),
      tax1: z.number().optional().describe("Default tax 1 percentage"),
      tax2: z.number().optional().describe("Default tax 2 percentage"),
    },
  },
  async ({ track_stock, ...rest }) => {
    try {
      const data = compact({
        ...compact(rest as Record<string, unknown>),
        track_stock: track_stock === undefined ? undefined : track_stock ? 1 : 0,
      });
      return ok(await client.post("products", { Product: data }));
    } catch (error) {
      return fail(error);
    }
  },
);

// ---------------------------------------------------------------------------
// Startup
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Daftra MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error starting Daftra MCP server:", error);
  process.exit(1);
});
