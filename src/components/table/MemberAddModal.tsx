import { Button, Form, Modal, type FormInstance } from 'antd';

import { defaultJob, memberFields } from '@/constants/memberFields';
import type { RecordData } from '@/types/record';

import { FieldFormItem } from '../field-form/FieldFormItem';


type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (values: RecordData) => void;
  form: FormInstance<RecordData>;
};

export function MemberAddModal({ open, onClose, onAdd, form }: Props) {
  return (
    <Modal title="회원 추가" open={open} onCancel={onClose} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onAdd}
        requiredMark={false}
        initialValues={{ job: defaultJob }}
      >
        {memberFields.map(field => (
          <FieldFormItem key={field.key} field={field} />
        ))}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>취소</Button>
          <Button htmlType="submit">추가</Button>
        </div>
      </Form>
    </Modal>
  );
}
