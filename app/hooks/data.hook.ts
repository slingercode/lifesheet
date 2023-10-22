import { useMemo, useState } from "react";
import type { PgSelectSleepData } from "~/db/schemas.server";

type IUseDataProps = {
  sleepHours: PgSelectSleepData[];
};

export const useData = ({ sleepHours }: IUseDataProps) => {
  const [split, setSplit] = useState(7);

  const slicedSleepHours = useMemo(
    () => sleepHours.slice(-split),
    [sleepHours, split],
  );

  const avgSleepHours = useMemo(
    () => () => {
      const avg = (days: PgSelectSleepData[], opt?: number) =>
        days.reduce((prev, { sleep }) => prev + sleep, 0) /
        (opt ?? days.length);

      return {
        week: avg(sleepHours.slice(-7)).toFixed(2),
        month: avg(sleepHours, 30).toFixed(2),
      };
    },
    [sleepHours],
  );

  const handleChangeSplit = (value: string) => {
    setSplit(Number(value));
  };

  return { slicedSleepHours, avgSleepHours, handleChangeSplit };
};
