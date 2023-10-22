import { useTheme } from "next-themes";
import { useMemo } from "react";
import { Chart } from "react-chartjs-2";

import type { ChartProps } from "react-chartjs-2";
import type { PgSelectSleepData } from "~/db/schemas.server";

type SleepGraphProps = {
  sleepHours: PgSelectSleepData[];
};

export const SleepGraph = ({ sleepHours }: SleepGraphProps) => {
  const { resolvedTheme } = useTheme();

  const hours = useMemo(
    () => sleepHours.map(({ sleep }) => sleep),
    [sleepHours],
  );

  const labels = useMemo<ChartProps["data"]["labels"]>(
    () => sleepHours.map(({ date }) => date),
    [sleepHours],
  );

  const data = useMemo<ChartProps["data"]>(
    () => ({
      labels,
      datasets: [
        {
          label: "Sleep hours",
          data: hours,
          backgroundColor: resolvedTheme === "light" ? "#fcd34d" : "#fde68a",
        },
      ],
    }),
    [hours, labels, resolvedTheme],
  );

  const options = useMemo<ChartProps["options"]>(
    () => ({
      scales: {
        x: {
          title: {
            display: true,
            text: "Days",
          },
          ticks: {
            display: false,
          },
        },
      },
    }),
    [],
  );

  return <Chart type="bar" data={data} options={options} />;
};
