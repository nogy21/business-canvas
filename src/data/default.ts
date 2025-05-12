import type { Field } from "@/types/field";
import type { RecordData } from "@/types/record";

export const defaultFields: Field[] = [
  { key: 'name', type: 'text', label: '이름', required: true },
  { key: 'address', type: 'text', label: '주소', required: false },
  { key: 'memo', type: 'textarea', label: '메모', required: false },
  { key: 'joinedAt', type: 'date', label: '가입일', required: true },
  { key: 'job', type: 'select', label: '직업', required: false, options: ['개발자', 'PO', '디자이너'] },
  { key: 'emailOptIn', type: 'checkbox', label: '이메일 수신 동의', required: false },
];


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