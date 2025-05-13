import type { RecordData } from "@/types/record";

export const defaultRecords: RecordData[] = [
  {
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    joinedAt: '2024-10-02',
    job: '개발자',
    emailOptIn: true,
  },
  {
    name: 'Foo Bar',
    address: '서울 서초구',
    memo: '한국인',
    joinedAt: '2024-10-01',
    job: 'PO',
    emailOptIn: false,
  },
];