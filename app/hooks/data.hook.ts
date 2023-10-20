import { useMemo } from "react";
import type { PgSelectSleepData } from "~/db/schemas.server";

type IUseData = {
  sleepHours: PgSelectSleepData[];
};

export const useData = ({ sleepHours }: IUseData) => {
  const avgSleepHours = useMemo(
    () => () => {
      const avg = (days: number) =>
        sleepHours.reduce((prev, { sleep }) => prev + sleep, 0) / days;

      return {
        week: avg(7).toFixed(2),
        month: avg(30).toFixed(2),
      };
    },
    [sleepHours],
  );

  return { avgSleepHours };
};
