// Base64-encoded API paths to prevent plaintext extraction in release builds.
const pingEncoded = "L2Zvb3RwcmludDMvYWdlbnQvY2xpL3Bpbmc=";
const whoamiEncoded = "L2Zvb3RwcmludDMvYWdlbnQvY2xpL3dob2FtaQ==";
const productsEncoded = "L2Zvb3RwcmludDMvcHJvZHVjdC9wcm9kdWN0TGlzdA==";
const productInfoEncoded = "L2Zvb3RwcmludDMvcHJvZHVjdC9pbmZv";
const accountsEncoded = "L2Zvb3RwcmludDMvYWNjb3VudC9saXN0";
const accountViewEncoded = "L2Zvb3RwcmludDMvYWNjb3VudC9hY2NvdW50Vmlldw==";
const aiModelEncoded = "L2Zvb3RwcmludDMvYWNjb3VudEVtaXNzaW9uL2FpTW9kZWxCeUNvbnRlbnQ=";
const searchFactorEncoded = "L21hbmFnZW1lbnQvc3lzdGVtL3dlYnNpdGUvcXVlcnlGYWN0b3JMaXN0Q2xhdw==";

function decode(s: string): string {
  return Buffer.from(s, "base64").toString("utf-8");
}

export const Ping = () => decode(pingEncoded);
export const Whoami = () => decode(whoamiEncoded);
export const Products = () => decode(productsEncoded);
export const ProductInfo = () => decode(productInfoEncoded);
export const Accounts = () => decode(accountsEncoded);
export const AccountView = () => decode(accountViewEncoded);
export const AiModel = () => decode(aiModelEncoded);
export const SearchFactor = () => decode(searchFactorEncoded);
