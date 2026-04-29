import { z } from "zod";
import * as apipath from "./apipath.js";

// Zod schemas for each tool's parameters
export const schemas: Record<string, z.ZodObject<any> | undefined> = {
  ping: z.object({}),
  whoami: z.object({}),
  products: z.object({
    pageNum: z.number().optional().describe("Page number (default 1)"),
    pageSize: z.number().optional().describe("Page size (default 12)"),
    status: z.number().optional().describe("Status filter (default 2)"),
    search: z.string().optional().describe("Search by product name"),
  }),
  product_info: z.object({
    id: z.number().describe("Product ID (required)"),
  }),
  accounts: z.object({
    productId: z.number().describe("Product ID (required)"),
    pageNum: z.number().optional().describe("Page number (default 1)"),
    pageSize: z.number().optional().describe("Page size (default 10)"),
    accountStatus: z.number().optional().describe("Account status (default 3)"),
  }),
  account_view: z.object({
    id: z.number().describe("Account ID (required)"),
    groupType: z.number().optional().describe("Group type (default 0)"),
    lang: z.string().optional().describe("Language: zh or en (default zh)"),
  }),
  ai_model: z.object({
    content: z.string().describe("一句话产品描述（必填），例如：一瓶农夫山泉500ml矿泉水"),
    scope: z.number().optional().describe("生命周期范围。0=半生命周期，1=全生命周期。可不传"),
    scopeValue: z.string().optional().describe('半生命周期时传 "0,1,2"，全生命周期可不传'),
    factorScope: z.number().optional().describe("因子偏好。1=Ecoinvent，2=国内因子，3=不限来源。可不传"),
    userKeys: z.array(z.string()).optional().describe("用户自定义因子 key 列表，可不传"),
    signKeys: z.array(z.string()).optional().describe("标记的因子 key 列表，可不传"),
  }),
  search_factors: z.object({
    name: z.string().describe("搜索关键词（必填），例如：电力、天然气"),
    lang: z.string().optional().describe("语言：zh 或 en（默认 zh）"),
  }),
};

export const descriptions: Record<string, string> = {
  ping: "Health check — verify the Carbonstop gateway is reachable and the API key is valid.",
  whoami: "Show the identity (username, company, userId) associated with the current API key.",
  products: "List carbon footprint products with pagination and filtering.",
  product_info: "Get detailed information about a specific product by ID.",
  accounts: "List carbon footprint accounts (models) for a product.",
  account_view: "Get detailed view of a carbon footprint account with emission breakdown by lifecycle stages.",
  ai_model: "One-click AI carbon footprint modeling. Submit a product description and get factor-matched emission results with lifecycle stage breakdown.",
  search_factors: "Search CCDB carbon emission factors by keyword. Returns matching factors with metadata (unit, source, country, etc.).",
};

export interface ToolRoute {
  method: string;
  path: string;
  params: Record<string, string>; // paramName → argKey
}

export const toolRoutes: Record<string, ToolRoute> = {
  ping: { method: "GET", path: apipath.Ping(), params: {} },
  whoami: { method: "GET", path: apipath.Whoami(), params: {} },
  products: {
    method: "GET",
    path: apipath.Products(),
    params: { pageNum: "pageNum", pageSize: "pageSize", status: "status", search: "search" },
  },
  product_info: {
    method: "GET",
    path: apipath.ProductInfo(),
    params: { id: "id" },
  },
  accounts: {
    method: "GET",
    path: apipath.Accounts(),
    params: { productId: "productId", pageNum: "pageNum", pageSize: "pageSize", accountStatus: "accountStatus" },
  },
  account_view: {
    method: "GET",
    path: apipath.AccountView(),
    params: { id: "id", groupType: "groupType", lang: "lang" },
  },
  ai_model: { method: "POST", path: apipath.AiModel(), params: {} },
  search_factors: { method: "POST", path: apipath.SearchFactor(), params: {} },
};
