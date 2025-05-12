export type RecordValue =
  | string // text, textarea, date, select
  | boolean; // checkbox

export type RecordData = {
  [fieldKey: string]: RecordValue;
};
