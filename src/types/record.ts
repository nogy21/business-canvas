import type { Dayjs } from "dayjs";

export type RecordValue =
  | string // text, textarea, date, select
  | boolean // checkbox
  | Dayjs; // date

export type RecordData = {
  [fieldKey: string]: RecordValue;
};
