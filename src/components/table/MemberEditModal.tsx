import { Button, Form, Modal } from 'antd';

import { memberFields } from '@/constants/memberFields';
import type { RecordData } from '@/types/record';

import { FieldFormItem } from '../field-form/FieldFormItem';

type Props = {
  open: boolean;
  onClose: () => void;
  onEdit: (values: RecordData) => void;
  initialValues?: RecordData;
};

export function MemberEditModal({ open, onClose, onEdit, initialValues }: Props) {
  return (
    <Modal title="회원 수정" open={open} onCancel={onClose} footer={null}>
      <Form
        initialValues={initialValues}
        onFinish={onEdit}
        layout="vertical"
        requiredMark={false}
      >
        {memberFields.map(field => (
          <FieldFormItem field={field} key={field.key} />
        ))}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>취소</Button>
          <Button htmlType="submit" type="primary">저장</Button>
        </div>
      </Form>
    </Modal>
  );
}
