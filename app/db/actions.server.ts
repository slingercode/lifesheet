import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { data } from "./schemas.server";

import type { PgInsertData } from "./schemas.server";

export const connectDb = () => {
  try {
    const queryClient = postgres(process.env.POSTGRES_URL!, {
      ssl: "require",
    });

    return queryClient;
  } catch (error) {
    return undefined;
  }
};

/** TODO: Zod */
type InsertDataParams = {
  health: {
    hoursOfSleep: number;
    steps: number;
    water: number;
    poop: number;
  };
  mentalHealth: {
    mood: string;
  };
  work: {
    work?: number;
    productive?: number;
  };
  misc: {
    todayWas: string;
  };
  lol?: {
    lolGames: number;
    lolWins: number;
    lolPanas: boolean;
    lolTilt: boolean;
  };
};

export const insertData = async ({
  health: { hoursOfSleep, steps, water, poop },
  mentalHealth: { mood },
  work: { work, productive },
  misc: { todayWas },
  lol,
}: InsertDataParams) => {
  try {
    let values: PgInsertData[] = [
      {
        category: "number",
        question_id: 1,
        responseNumber: hoursOfSleep.toString(),
      },
      {
        category: "number",
        question_id: 2,
        responseNumber: steps.toString(),
      },
      {
        category: "number",
        question_id: 3,
        responseNumber: water.toString(),
      },
      {
        category: "number",
        question_id: 4,
        responseNumber: poop.toString(),
      },
      {
        category: "string",
        question_id: 5,
        responseString: mood,
      },

      {
        category: "string",
        question_id: 12,
        responseString: todayWas,
      },
    ];

    if (work) {
      values = [
        ...values,
        {
          category: "number",
          question_id: 6,
          responseNumber: work.toString(),
        },
      ];
    }

    if (productive) {
      values = [
        ...values,
        {
          category: "number",
          question_id: 7,
          responseNumber: productive.toString(),
        },
      ];
    }

    if (lol) {
      const { lolGames, lolWins, lolPanas, lolTilt } = lol;

      values = [
        ...values,
        {
          category: "number",
          question_id: 8,
          responseNumber: lolGames.toString(),
        },
        {
          category: "number",
          question_id: 9,
          responseNumber: lolWins.toString(),
        },
        {
          category: "boolean",
          question_id: 10,
          responseBoolean: lolPanas,
        },
        {
          category: "boolean",
          question_id: 11,
          responseBoolean: lolTilt,
        },
      ];
    }

    const queryClient = connectDb();

    if (queryClient === undefined) {
      throw new Error();
    }

    const db: PostgresJsDatabase = drizzle(queryClient);

    await db.insert(data).values(values);
  } catch (error: any) {
    throw new Error();
  }
};
