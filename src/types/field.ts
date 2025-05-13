type FieldBase = {
  key: string; // 내부 식별자(확장성/커스텀 필드 대응)
  label: string;
  required: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
};

type TextField = FieldBase & { type: 'text' | 'textarea', maxLength?: number };
type DateField = FieldBase & { type: 'date', placeholder?: string };
type SelectField = FieldBase & { type: 'select', options: { label: string; value: string }[] };
type CheckboxField = FieldBase & { type: 'checkbox' };

export type MemberField = TextField | DateField | SelectField | CheckboxField;