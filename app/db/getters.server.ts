import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql, getTableColumns } from "drizzle-orm";
import postgres from "postgres";

import { data } from "./schemas.server";

import type { PgSelectData } from "./schemas.server";

export const getData = async (): Promise<PgSelectData[]> => {
  try {
    const queryClient = postgres(process.env.POSTGRES_URL!, {
      ssl: "require",
    });

    const db: PostgresJsDatabase = drizzle(queryClient);

    const response: PgSelectData[] = await db
      .select({
        ...getTableColumns(data),
        formatted: sql<string>`to_char(${data.timestamp} at time zone 'utc' at time zone 'cst', 'DD Month YYYY')`,
      })
      .from(data)
      .limit(100);

    return response;
  } catch (error: any) {
    const { message = "" } = error || {};

    throw new Error(`Error fetching data: ${message}`);
  }
};
