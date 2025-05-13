import { rules, type MemberField } from '@/constants/memberFields';
import { Checkbox, DatePicker, Form, Input, Select } from 'antd';
import type { Rule } from 'antd/lib/form';

type FieldFormItemProps = {
  field: MemberField;
};

/**
 * 회원 필드 타입에 따른 컴포넌트 매핑
 * @param field 회원 필드
 * @returns 회원 필드 타입에 따른 컴포넌트
 */
const mapFieldToComponent = (field: MemberField) => {
  switch (field.key) {
    case 'name':
    case 'address':
      return <Input />;
    case 'memo':
      return <Input.TextArea rows={2} />;
    case 'joinedAt':
      return <DatePicker placeholder={field.placeholder} />;
    case 'job':
      return (
        <Select
          options={field.options?.map(({ label, value }) => ({
            label,
            value,
          })) || []}
          defaultValue={field.options?.[0]}
        />
      );
    case 'emailOptIn':
      return <Checkbox />;
    default:
      return null;
  }
};

/**
 * 회원 필드 폼 아이템
 * @param field 회원 필드
 * @returns 회원 필드 폼 아이템
 */
export function FieldFormItem({ field }: FieldFormItemProps) {
  return (
    <Form.Item
      key={field.key}
      label={
        <span>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </span>
      }
      name={field.key}
      rules={[
        field.required && rules.required(field.label),
        ('maxLength' in field && field?.maxLength !== undefined) && rules.maxLength(field.maxLength),
      ].filter(Boolean) as Rule[]}
      valuePropName={field.key === 'emailOptIn' ? 'checked' : undefined}
    >
      {mapFieldToComponent(field)}
    </Form.Item>
  );
}