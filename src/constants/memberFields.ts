import type { Rule } from "antd/lib/form";

/**
 * 회원 필드
 */
export const memberFields = [
  { key: 'name', label: '이름', required: true, maxLength: 20 },
  { key: 'address', label: '주소', required: false, maxLength: 20 },
  { key: 'memo', label: '메모', required: false, maxLength: 50 },
  { key: 'joinedAt', label: '가입일', required: true, placeholder: 'Select Date' },
  { key: 'job', label: '직업', required: false, options: [{ label: '개발자', value: '개발자' }, { label: 'PO', value: 'PO' }, { label: '디자이너', value: '디자이너' }] },
  { key: 'emailOptIn', label: '이메일 수신 여부', required: false },
] as const;

export type MemberField = typeof memberFields[number];


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
