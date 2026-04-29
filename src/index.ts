#!/usr/bin/env node
import { createHash } from "crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { load } from "./config.js";
import { Client } from "./client.js";
import { schemas, descriptions, toolRoutes } from "./tools.js";
import { Version } from "./version.js";

const config = load();

if (!config.apiKey) {
  console.error("[carbonstop-mcp] CARBONSTOP_API_KEY is required");
  process.exit(2);
}

const server = new McpServer({
  name: "carbonstop-mcp",
  version: Version,
});

const client = new Client(config);

function textContent(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

function errorContent(text: string) {
  return { content: [{ type: "text" as const, text }], isError: true };
}

for (const [name, schema] of Object.entries(schemas)) {
  if (!schema) continue;

  server.registerTool(
    name,
    {
      description: descriptions[name] || "",
      inputSchema: schema,
    },
    async (args: any) => {
      const route = toolRoutes[name];
      if (!route) {
        return errorContent(`Unknown tool: ${name}`);
      }

      try {
        const query: Record<string, string> = {};
        for (const [paramName, argKey] of Object.entries(route.params)) {
          if (args[argKey] !== undefined && args[argKey] !== null) {
            query[paramName] = String(args[argKey]);
          }
        }

        let status: number;
        let body: string;

        if (route.method === "POST") {
          // Compute MD5 sign for search_factors tool
          const body_params: any = { ...args };
          if (name === "search_factors") {
            const signStr = "openclaw_ccdb" + (body_params.name || "");
            body_params.sign = createHash("md5").update(signStr).digest("hex");
          }
          const result = await client.post(route.path, body_params);
          status = result.status;
          body = result.body;
        } else {
          const result = await client.get(route.path, query);
          status = result.status;
          body = result.body;
        }

        if (status < 200 || status >= 300) {
          return errorContent(`HTTP ${status}\n${body}`);
        }

        try {
          const parsed = JSON.parse(body);
          return textContent(JSON.stringify(parsed, null, 2));
        } catch {
          return textContent(body);
        }
      } catch (err) {
        return errorContent(
          `Error: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
