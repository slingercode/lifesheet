import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql, getTableColumns, desc, eq, asc } from "drizzle-orm";
import postgres from "postgres";

import { data } from "./schemas.server";

import type { PgSelectData, PgSelectSleepData } from "./schemas.server";

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
      .orderBy(desc(data.timestamp))
      .limit(100);

    return response;
  } catch (error: any) {
    const { message = "" } = error || {};

    throw new Error(`Error fetching data: ${message}`);
  }
};

export const getSleepHours = async (): Promise<PgSelectSleepData[]> => {
  try {
    const queryClient = postgres(process.env.POSTGRES_URL!, {
      ssl: "require",
    });

    const db: PostgresJsDatabase = drizzle(queryClient);

    const response = await db
      .select({
        sleep: data.responseNumber,
        date: sql<string>`to_char(${data.timestamp} at time zone 'utc' at time zone 'cst', 'DD Month YYYY')`,
      })
      .from(data)
      .where(eq(data.question_id, 1))
      .orderBy(asc(data.timestamp))
      .limit(30);

    const transformData: PgSelectSleepData[] = response.map(
      ({ sleep, date }) => ({
        date: date.replace("  ", ""),
        sleep: Number(sleep) ?? 0,
      }),
    );

    return transformData;
  } catch (error: any) {
    const { message = "" } = error || {};

    throw new Error(`Error fetching data: ${message}`);
  }
};
