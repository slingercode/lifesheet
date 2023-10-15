import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { question } from "./schemas.server";

import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Create questions 14-oct-2023
export const seedQuestions = async () => {
  try {
    const queryClient = postgres(process.env.POSTGRES_URL!, {
      ssl: "require",
    });

    const db: PostgresJsDatabase = drizzle(queryClient);

    await db
      .insert(question)
      .values([
        { question: "hoursOfSleep" },
        { question: "steps" },
        { question: "water" },
        { question: "poop" },
        { question: "mood" },
        { question: "work" },
        { question: "productive" },
        { question: "lolGames" },
        { question: "lolWins" },
        { question: "lolPanas" },
        { question: "lolTilt" },
        { question: "todayWas" },
      ]);

    console.log("Success");
  } catch (error) {
    console.error("Error:", error);
  }
};
