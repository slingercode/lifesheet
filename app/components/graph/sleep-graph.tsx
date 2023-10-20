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

  const labels = useMemo(
    () => sleepHours.map(({ date }) => date),
    [sleepHours],
  );

  const hours = useMemo(
    () => sleepHours.map(({ sleep }) => sleep),
    [sleepHours],
  );

  const data = useMemo<ChartProps["data"]>(
    () => ({
      labels,
      datasets: [
        {
          label: "Sleep hours",
          data: hours,
          backgroundColor:
            resolvedTheme === "light" ? "rgb(10, 10, 10)" : "#F2DDA4",
        },
      ],
    }),
    [hours, labels, resolvedTheme],
  );

  return <Chart type="bar" data={data} />;
};
