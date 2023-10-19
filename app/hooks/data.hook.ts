import { useMemo } from "react";
import type { PgSelectSleepData } from "~/db/schemas.server";

type IUseData = {
  sleepHours: PgSelectSleepData[];
};

export const useData = ({ sleepHours }: IUseData) => {
  const avgSleepHours = useMemo(
    () => ({
      week: (
        sleepHours.reduce((prev, { sleep }) => prev + sleep, 0) / 7
      ).toFixed(2),
      month: (
        sleepHours.reduce((prev, { sleep }) => prev + sleep, 0) / 30
      ).toFixed(2),
    }),
    [sleepHours],
  );

  return { avgSleepHours };
};
