import { encodedBaseURL } from "./baseurl.js";

export function getBaseURL(): string {
  if (!encodedBaseURL) return "";
  // If it already looks like a URL, return as-is (dev / env override).
  if (encodedBaseURL.includes("://")) return encodedBaseURL;
  // Release builds: base64-encoded to hide from strings/grep.
  try {
    return Buffer.from(encodedBaseURL, "base64").toString("utf-8");
  } catch {
    return "";
  }
}

export const Version = "2.0.0";
export const Commit = "none";
export const BuildTime = "unknown";
