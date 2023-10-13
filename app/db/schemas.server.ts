import {
  bigserial,
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const data = pgTable("lifesheet", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  category: text("category", {
    enum: ["string", "boolean", "number"],
  }).notNull(),
  question: text("question").notNull(),
  responseString: text("response_string"),
  responseBoolean: boolean("response_boolean"),
  responseNumber: numeric("response_number"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type Data = typeof data.$inferSelect & {
  formatted?: string;
};
