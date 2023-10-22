import { Chart } from "chart.js/auto";
import { useLoaderData } from "@remix-run/react";

import { loader } from "~/server/home";

import { SleepGraph } from "~/components";
import { useData } from "~/hooks";
import { Tabs, TabsList, TabsTrigger } from "~/ui/tabs";

import type { MetaFunction } from "@remix-run/node";

export { loader };

export const meta: MetaFunction = () => {
  return [
    { title: "Lifesheet" },
    { name: "description", content: "Personal data for ednoesco" },
  ];
};

export default function Index() {
  Chart.register();

  const { sleepHours } = useLoaderData<typeof loader>();
  const { slicedSleepHours, avgSleepHours, handleChangeSplit } = useData({
    sleepHours,
  });

  const { month, week } = avgSleepHours();

  return (
    <div className="px-5 py-10 md:px-40">
      <Tabs className="pb-5" defaultValue="7" onValueChange={handleChangeSplit}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="7">Week</TabsTrigger>
          <TabsTrigger value="30">Month</TabsTrigger>
        </TabsList>
      </Tabs>

      <SleepGraph sleepHours={slicedSleepHours} />

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
