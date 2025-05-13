import type { Dayjs } from "dayjs";

type RecordValue =
  | string // text, textarea, date, select
  | boolean // checkbox
  | Dayjs; // date

export type RecordData = {
  [fieldKey: string]: RecordValue;
};
