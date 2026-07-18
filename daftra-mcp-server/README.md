# خادم MCP لدفترة (Daftra MCP Server)

خادم [MCP](https://modelcontextprotocol.io) يربط Claude بحسابك في [دفترة](https://www.daftra.com) عبر Daftra REST API، ويتيح إنشاء الفواتير والعملاء والموردين والمنتجات وجلبها مباشرة من المحادثة.

## الأدوات المتاحة

| الأداة | الوصف | نقطة النهاية |
|---|---|---|
| `create_sales_invoice` | إنشاء فاتورة بيع | `POST /api2/invoices` |
| `create_purchase_invoice` | إنشاء فاتورة شراء | `POST /api2/purchase_invoices` |
| `add_client` | إضافة عميل | `POST /api2/clients` |
| `add_supplier` | إضافة مورد | `POST /api2/suppliers` |
| `add_product` | إضافة منتج | `POST /api2/products` |
| `list_invoices` | جلب الفواتير (بيع أو شراء، مع فلاتر وترقيم صفحات) | `GET /api2/invoices` أو `GET /api2/purchase_invoices` |
| `list_clients` | جلب العملاء | `GET /api2/clients` |
| `list_suppliers` | جلب الموردين | `GET /api2/suppliers` |

## المتطلبات

- Node.js 18 أو أحدث
- مفتاح API من حسابك في دفترة: **الإعدادات ← إعدادات الحساب ← API** (أو ما يعادلها في واجهة دفترة)

## التثبيت والبناء

```bash
cd daftra-mcp-server
npm install
npm run build
```

## متغيرات البيئة

| المتغير | مطلوب | الوصف |
|---|---|---|
| `DAFTRA_API_KEY` | ✅ | مفتاح API الخاص بحسابك |
| `DAFTRA_SUBDOMAIN` | ✅* | النطاق الفرعي لحسابك — مثلاً `mycompany` إذا كان رابط حسابك `mycompany.daftra.com` |
| `DAFTRA_BASE_URL` | ✅* | بديل عن `DAFTRA_SUBDOMAIN`: الرابط الكامل مثل `https://mycompany.daftra.com` |

\* يكفي تعيين أحد المتغيرين `DAFTRA_SUBDOMAIN` أو `DAFTRA_BASE_URL`.

## الإعداد في Claude Desktop

أضف ما يلي إلى ملف `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "daftra": {
      "command": "node",
      "args": ["/المسار/الكامل/إلى/daftra-mcp-server/dist/index.js"],
      "env": {
        "DAFTRA_API_KEY": "ضع_مفتاح_API_هنا",
        "DAFTRA_SUBDOMAIN": "mycompany"
      }
    }
  }
}
```

## الإعداد في Claude Code

```bash
claude mcp add daftra \
  --env DAFTRA_API_KEY=ضع_مفتاح_API_هنا \
  --env DAFTRA_SUBDOMAIN=mycompany \
  -- node /المسار/الكامل/إلى/daftra-mcp-server/dist/index.js
```

## أمثلة استخدام

بعد الإعداد، يمكنك أن تطلب من Claude مثلاً:

- «أضف عميلاً جديداً اسمه شركة النور، بريده info@alnoor.com»
- «أنشئ فاتورة بيع للعميل رقم 12 فيها 3 قطع من المنتج رقم 5 بسعر 250»
- «اجلب فواتير الشراء لشهر يونيو 2026»
- «أضف منتج: مكيف سبليت 1.5 حصان، سعر البيع 18500، سعر الشراء 15000»

## ملاحظات

- المصادقة تتم بإرسال المفتاح في ترويسة `APIKEY` مع كل طلب، وفق توثيق Daftra API.
- إنشاء الفواتير يرسل البيانات بصيغة دفترة: `{"Invoice": {...}, "InvoiceItem": [...]}` للبيع و`{"PurchaseInvoice": {...}, "PurchaseInvoiceItem": [...]}` للشراء.
- أسماء بعض الحقول تتبع تسمية دفترة حرفياً (مثل `low_stock_thershold`).
- **لا تضع مفتاح API في الكود أو في Git** — استخدم متغيرات البيئة فقط.
