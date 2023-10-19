import { json } from "@remix-run/node";

import { getSleepHours } from "~/db/getters.server";

export const loader = async () => {
  try {
    const sleepHours = await getSleepHours();

    return json({ sleepHours });
  } catch (error) {
    return json({ sleepHours: [] });
  }
};
