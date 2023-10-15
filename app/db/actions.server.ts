import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { data } from "./schemas.server";

export const insertData = async () => {
  try {
    const queryClient = postgres(process.env.POSTGRES_URL!, {
      ssl: "require",
    });

    const db: PostgresJsDatabase = drizzle(queryClient);
    await db.insert(data).values({
      category: "string",
      question: "Test",
      responseString: "Response",
    });
  } catch (error: any) {
    const { message = "" } = error || {};

    throw new Error(`Error inserting data: ${message}`);
  }
};
