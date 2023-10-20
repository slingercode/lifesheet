import { Chart } from "chart.js/auto";
import { useLoaderData } from "@remix-run/react";

import { loader } from "~/server/home";

import { SleepGraph } from "~/components";
import { useData } from "~/hooks";

import type { MetaFunction } from "@remix-run/node";

export { loader };

export const meta: MetaFunction = () => {
  return [
    { title: "Lifesheet" },
    { name: "description", content: "Personal data for ednoesco" },
  ];
};

export default function Index() {
  const { sleepHours } = useLoaderData<typeof loader>();
  const { avgSleepHours } = useData({ sleepHours });

  const { month, week } = avgSleepHours();

  Chart.register();

  return (
    <div className="py-10 pl-2 pr-5 md:px-40">
      <SleepGraph sleepHours={sleepHours} />

      <div className="flex w-full flex-col items-center pt-10">
        <p className="font-light">
          Avg in a week:
          <span className="font-bold">{` ~${week}`}</span>
        </p>

        <p className="font-light">
          Avg in a month:
          <span className="font-bold">{` ~${month}`}</span>
        </p>
      </div>
    </div>
  );
}
