import type { MemberField } from '@/types/field';
import { Form } from 'antd';
import { getRules, mapFieldToComponent, valuePropNameMap } from './fieldFormUtils';


type FieldFormItemProps = {
  field: MemberField;
};

/**
 * 회원 필드 폼 아이템
 * @param field 회원 필드
 * @returns 회원 필드 폼 아이템
 */
export function FieldFormItem({ field }: FieldFormItemProps) {
  const input = mapFieldToComponent[field.key]?.(field) ?? null;
  const valuePropName = valuePropNameMap[field.key];

  return (
    <Form.Item
      label={
        <span className="text-sm text-black/45 font-semibold">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </span>
      }
      name={field.key}
      rules={getRules(field)}
      valuePropName={valuePropName}
      validateTrigger={['onChange', 'onBlur']}
    >
      {input}
    </Form.Item>
  );
}