import { rules } from '@/constants/memberFields';
import type { MemberField } from '@/types/field';
import { Checkbox, DatePicker, Input, Select } from 'antd';
import type { Rule } from 'antd/lib/form';
import type { ReactNode } from 'react';


/**
 * 회원 필드 placeholder 타입 가드 함수
 */
const hasPlaceholder = (field: MemberField): field is MemberField & { placeholder: string } =>
  'placeholder' in field && typeof field.placeholder === 'string';

/**
 * 회원 필드 options 타입 가드 함수
 */
const hasOptions = (field: MemberField): field is MemberField & { options: { label: string; value: string }[] } =>
  'options' in field && Array.isArray(field.options);

/**
 * 회원 필드 타입에 따른 컴포넌트 매핑
 * @param field 회원 필드
 * @returns 회원 필드 타입에 따른 컴포넌트
 */
export const mapFieldToComponent: Record<string, (field: MemberField) => ReactNode> = {
  name: () => <Input />,
  address: () => <Input />,
  memo: () => <Input.TextArea rows={2} />,
  joinedAt: (field) => <DatePicker placeholder={hasPlaceholder(field) ? field.placeholder : undefined} />,
  job: (field) => (
    <Select
      options={hasOptions(field) ? field.options.map(({ label, value }) => ({
        label,
        value,
      })) : []}
    />
  ),
  emailOptIn: () => <Checkbox />
};

export const valuePropNameMap: Record<string, string | undefined> = {
  emailOptIn: 'checked',
};

export const getRules = (field: MemberField): Rule[] => [
  field.required && rules.required(field.label),
  'maxLength' in field && field.maxLength !== undefined && rules.maxLength(field.maxLength),
].filter(Boolean) as Rule[];

