import { Config } from "./config.js";

const userAgent = "carbonstop-mcp/0.1.0";
const maxRetries = 3;
const baseBackoff = 1000;

export class Client {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  private async request(
    method: string,
    path: string,
    body?: string,
    query?: Record<string, string>
  ): Promise<{ status: number; body: string }> {
    if (!path.startsWith("/")) path = "/" + path;

    const u = new URL(this.config.baseURL + path);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v) u.searchParams.set(k, v);
      }
    }

    let lastErr: Error | null = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      if (attempt > 0) {
        const backoff = Math.pow(2, attempt - 1) * baseBackoff;
        await new Promise((r) => setTimeout(r, backoff));
      }

      try {
        const headers: Record<string, string> = {
          "X-API-Key": this.config.apiKey,
          Accept: "application/json",
          "User-Agent": userAgent,
        };
        if (body) {
          headers["Content-Type"] = "application/json;charset=utf-8";
        }

        const resp = await fetch(u.toString(), {
          method,
          headers,
          body,
          signal: AbortSignal.timeout(this.config.timeout * 1000),
        });

        const text = await resp.text();

        if (resp.status === 429 || resp.status >= 500) {
          lastErr = new Error(`retryable server error: ${resp.status}`);
          continue;
        }

        return { status: resp.status, body: text };
      } catch (e) {
        lastErr = e as Error;
        continue;
      }
    }

    throw new Error(
      `request failed after ${maxRetries + 1} retries: ${lastErr?.message}`
    );
  }

  async get(path: string, query?: Record<string, string>) {
    return this.request("GET", path, undefined, query);
  }

  async post(path: string, jsonBody?: unknown) {
    return this.request("POST", path, JSON.stringify(jsonBody));
  }
}
