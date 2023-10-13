import type { Config } from "drizzle-kit";

export default {
  schema: "./app/db/schemas.server.ts",
  out: "./drizzle",
} satisfies Config;
