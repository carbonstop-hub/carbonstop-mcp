import { getBaseURL, Version } from "./version.js";

export interface Config {
  baseURL: string;
  apiKey: string;
  timeout: number;
}

export function load(): Config {
  const baseURL =
    process.env.CARBONSTOP_BASE_URL || getBaseURL() || "";
  const apiKey = process.env.CARBONSTOP_API_KEY || "";
  const timeout = parseInt(process.env.CARBONSTOP_TIMEOUT || "60", 10);

  return {
    baseURL: baseURL.replace(/\/$/, ""),
    apiKey,
    timeout,
  };
}
