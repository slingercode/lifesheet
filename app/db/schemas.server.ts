import {
  bigserial,
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const question = pgTable("lifesheet_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull().unique(),
});

export const data = pgTable("lifesheet", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  category: text("category", {
    enum: ["string", "boolean", "number"],
  }).notNull(),
  question_id: integer("question_id")
    .references(() => question.id)
    .notNull(),
  responseString: text("response_string"),
  responseBoolean: boolean("response_boolean"),
  responseNumber: numeric("response_number"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type PgSelectData = typeof data.$inferSelect & {
  formatted?: string;
};

export type PgInsertData = typeof data.$inferInsert;

export type PgSelectSleepData = {
  sleep: number;
  date: string;
};
