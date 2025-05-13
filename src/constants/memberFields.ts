import type { MemberField } from "@/types/field";
import type { Rule } from "antd/lib/form";

/**
 * 회원 필드
 */
export const memberFields: MemberField[] = [
  {
    key: 'name',
    type: 'text',
    label: '이름',
    width: 120,
    required: true,
    maxLength: 20,
  },
  {
    key: 'address',
    type: 'text',
    label: '주소',
    width: 250,
    required: false,
    maxLength: 20,
  },
  {
    key: 'memo',
    type: 'textarea',
    label: '메모',
    width: 250,
    required: false,
    maxLength: 50,
  },
  {
    key: 'joinedAt',
    type: 'date',
    label: '가입일',
    width: 150,
    required: true,
    placeholder: 'Select Date',
  },
  {
    key: 'job',
    type: 'select',
    label: '직업',
    width: 250,
    required: false,
    options: [{ label: '개발자', value: '개발자' }, { label: 'PO', value: 'PO' }, { label: '디자이너', value: '디자이너' }],
  },
  {
    key: 'emailOptIn',
    type: 'checkbox',
    label: '이메일 수신 여부',
    width: 120,
    required: false,
  },
];

export const defaultJob = '개발자';


type MemberFieldRuleFactories = {
  required: (label: string) => Rule;
  maxLength: (maxLength: number) => Rule;
};

/**
 * 회원 필드 규칙
 */
export const rules: MemberFieldRuleFactories = {
  required: (label) => ({
    required: true,
    message: `${label}은 필수값입니다.`
  }),
  maxLength: (maxLength) => ({
    max: maxLength,
    message: `글자수 ${maxLength}을 초과할 수 없습니다.`
  }),
};
