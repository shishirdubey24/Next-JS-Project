
import { randomUUID } from "crypto";

export const generateSessionId = () => {
  return randomUUID();
};

