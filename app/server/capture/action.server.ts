import { insertData } from "~/db";

import { redirect, json } from "@remix-run/node";

import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const hoursOfSleep = Number(formData.get("hoursOfSleep"));
    const steps = Number(formData.get("steps"));
    const water = Number(formData.get("water"));
    const poop = Number(formData.get("poop"));
    const mood = String(formData.get("mood"));
    const work = Number(formData.get("work"));
    const productive = Number(formData.get("productive"));
    const todayWas = String(formData.get("todayWas"));
    const lolGames = Number(formData.get("lolGames"));
    const lolWins = Number(formData.get("lolWins"));
    const lolPanas = String(formData.get("lolPanas")) !== "null" ? true : false;
    const lolTilt = String(formData.get("lolTilt")) !== "null" ? true : false;

    await insertData({
      health: {
        hoursOfSleep,
        steps,
        water,
        poop,
      },
      mentalHealth: { mood },

      work: {
        work: work !== 0 ? work : undefined,
        productive: productive !== 0 ? productive : undefined,
      },
      misc: {
        todayWas,
      },
      lol:
        lolGames !== 0
          ? {
              lolGames,
              lolWins,
              lolPanas,
              lolTilt,
            }
          : undefined,
    });

    return redirect("/");
  } catch (error) {
    return json({});
  }
};
