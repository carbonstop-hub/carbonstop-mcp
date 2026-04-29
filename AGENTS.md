# AGENTS.md

Carbonstop MCP Server — AI assistant instructions.

## Purpose

This is an MCP server providing carbon footprint modeling tools via the Carbonstop Gateway API. It runs as a stdio JSON-RPC server consumed by MCP clients (Claude Desktop, Cursor, etc.).

## Architecture

```
src/index.ts    → MCP server entry, registers tools with SDK
src/tools.ts    → tool definitions and API route mappings
src/client.ts   → HTTP client with retry (3 retries, exponential backoff)
src/config.ts   → env var loading (CARBONSTOP_API_KEY, CARBONSTOP_BASE_URL)
src/apipath.ts  → base64-encoded API paths
src/version.ts  → version info (injected at build time)
```

- Transport: stdio (JSON-RPC 2.0 via stdin/stdout)
- Build: TypeScript → Node.js ESM
- Distribution: npm package + `npx` runner

## Tools

7 tools mirroring the Carbonstop Gateway API:

- `ping` — GET, health check
- `whoami` — GET, current user identity
- `products` — GET, product list with pagination/search
- `product_info` — GET, product detail by ID
- `accounts` — GET, account list by product
- `account_view` — GET, account detail with emission breakdown
- `ai_model` — POST, AI one-click carbon modeling

## Environment

- `CARBONSTOP_API_KEY` (required) — API key from carbon cloud platform
- `CARBONSTOP_BASE_URL` (optional) — override gateway base URL
- `CARBONSTOP_TIMEOUT` (default 60) — request timeout in seconds
