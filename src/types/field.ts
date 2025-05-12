export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox';

export type FieldBase = {
  type: FieldType;
  label: string;
  required: boolean;
  key: string; // 내부 식별자(확장성/커스텀 필드 대응)
};

export type TextField = FieldBase & { type: 'text' | 'textarea' };
export type DateField = FieldBase & { type: 'date' };
export type SelectField = FieldBase & { type: 'select'; options: string[] };
export type CheckboxField = FieldBase & { type: 'checkbox' };

export type Field = TextField | DateField | SelectField | CheckboxField;

