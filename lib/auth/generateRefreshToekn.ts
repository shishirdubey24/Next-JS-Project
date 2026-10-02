
import { createHash, randomUUID } from "crypto";

export const generateRefreshToken = () => {
  return randomUUID();
};
export const hashRefreshToken = (token: string) => {
  return createHash("sha256")
    .update(token)
    .digest("hex");
};