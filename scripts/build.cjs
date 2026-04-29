// Generate src/baseurl.ts from RELEASE_BASE_URL_ENCODED env var.
// In CI, RELEASE_BASE_URL_ENCODED is set as a GitHub Secret.
const fs = require("fs");
const path = require("path");

const encoded = process.env.RELEASE_BASE_URL_ENCODED || "";
const content = `// Auto-generated at build time. Do not commit.
export const encodedBaseURL: string = ${JSON.stringify(encoded)};
`;

fs.writeFileSync(path.join(__dirname, "..", "src", "baseurl.ts"), content);

const preview = encoded ? encoded.slice(0, 8) + "..." : "(empty)";
console.log(`[build] Injected RELEASE_BASE_URL_ENCODED: ${preview}`);
