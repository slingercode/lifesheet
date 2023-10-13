import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql, getTableColumns } from "drizzle-orm";
import postgres from "postgres";

import { data } from "./schemas.server";

import type { Data } from "./schemas.server";

export const getData = async (): Promise<Data[]> => {
  try {
    const queryClient = postgres(process.env.POSTGRES_DB!, {
      ssl: "require",
    });

    const db: PostgresJsDatabase = drizzle(queryClient);

    const response: Data[] = await db
      .select({
        ...getTableColumns(data),
        formatted: sql<string>`to_char(timestamp, 'DD Month YYYY')`,
      })
      .from(data);

    return response;
  } catch (error: any) {
    const { message = "" } = error || {};

    throw new Error(`Error fetching data: ${message}`);
  }
};
