/**
 * Thin HTTP client for the Daftra REST API (api2).
 *
 * Authentication uses the account API key sent in the `APIKEY` header.
 * The base URL is the account's Daftra domain, e.g. https://mycompany.daftra.com
 */

import { EnvHttpProxyAgent, setGlobalDispatcher } from "undici";

// Node's fetch ignores HTTP(S)_PROXY by default; honor it when present so the
// server works behind corporate/agent proxies.
if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.https_proxy || process.env.http_proxy) {
  setGlobalDispatcher(new EnvHttpProxyAgent());
}

export interface DaftraConfig {
  baseUrl: string;
  apiKey: string;
}

export class DaftraApiError extends Error {
  constructor(
    public status: number,
    public body: string,
    message?: string,
  ) {
    super(message ?? `Daftra API error (HTTP ${status}): ${body}`);
    this.name = "DaftraApiError";
  }
}

export function loadConfig(): DaftraConfig {
  const apiKey = process.env.DAFTRA_API_KEY;
  if (!apiKey) {
    throw new Error(
      "DAFTRA_API_KEY environment variable is required (your Daftra account API key).",
    );
  }

  let baseUrl = process.env.DAFTRA_BASE_URL;
  if (!baseUrl) {
    const subdomain = process.env.DAFTRA_SUBDOMAIN;
    if (!subdomain) {
      throw new Error(
        "Set DAFTRA_SUBDOMAIN (e.g. 'mycompany' for mycompany.daftra.com) or DAFTRA_BASE_URL (full URL).",
      );
    }
    baseUrl = `https://${subdomain}.daftra.com`;
  }

  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}

export class DaftraClient {
  constructor(private config: DaftraConfig) {}

  private async request(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    options: { query?: Record<string, string | number | undefined>; body?: unknown } = {},
  ): Promise<unknown> {
    const url = new URL(`${this.config.baseUrl}/api2/${path.replace(/^\/+/, "")}`);
    if (options.query) {
      for (const [key, value] of Object.entries(options.query)) {
        if (value !== undefined && value !== null && `${value}` !== "") {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const response = await fetch(url, {
      method,
      headers: {
        APIKEY: this.config.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new DaftraApiError(response.status, text);
    }

    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { raw: text };
    }
  }

  get(path: string, query?: Record<string, string | number | undefined>) {
    return this.request("GET", path, { query });
  }

  post(path: string, body: unknown) {
    return this.request("POST", path, { body });
  }
}
