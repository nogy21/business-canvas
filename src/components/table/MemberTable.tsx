import { useState } from 'react';

import { Form, Modal } from 'antd';
import type { ColumnType } from 'antd/lib/table';

import { defaultRecords } from '@/data/default';
import type { RecordData } from '@/types/record';

import createColumns from '../column/createColumns';
import { MemberAddModal } from './MemberAddModal';
import { MemberEditModal } from './MemberEditModal';
import { MemberTableBody } from './MemberTableBody';
import { MemberTableHeader } from './MemberTableHeader';
import { addMember, editMember, removeMember, toEditInitialValues } from './memberTableUtils';
import { useModal } from './useModal';


/**
 * 회원 테이블
 */
export default function MemberTable() {
  const [form] = Form.useForm<RecordData>();
  const [records, setRecords] = useState<RecordData[]>(defaultRecords);
  const [editRecord, setEditRecord] = useState<RecordData | null>(null);
  const addModal = useModal();
  const editModal = useModal();

  const handleAdd = (values: RecordData) => {
    setRecords((prev) => addMember(prev, values));
    addModal.hide();
    form.resetFields();
  };

  const handleEdit = (record: RecordData) => {
    setEditRecord(record);
    editModal.show();
  };

  const handleEditSubmit = (values: RecordData) => {
    setRecords(prev => editMember(prev, String(editRecord?.name ?? ''), values));
    editModal.hide();
    setEditRecord(null);
  };

  const handleDelete = (record: RecordData) => {
    Modal.confirm({
      title: '정말 삭제하시겠습니까?',
      content: `"${record.name}" 회원 정보를 삭제합니다.`,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: () => {
        setRecords(prev => removeMember(prev, String(record.name)));
      },
    });
  };

  const columns: ColumnType<RecordData>[] = createColumns(handleEdit, handleDelete);

  return (
    <div>
      {/* 테이블 헤더 */}
      <MemberTableHeader handleOpen={addModal.show} />

      {/* 테이블 바디 */}
      <MemberTableBody
        records={records}
        columns={columns}
        rowSelection={{ type: 'checkbox' }}
      />

      {/* 회원 추가 Modal */}
      <MemberAddModal
        open={addModal.open}
        onClose={addModal.hide}
        onAdd={handleAdd}
        form={form}
      />

      {/* 회원 수정 Modal */}
      <MemberEditModal
        open={editModal.open}
        onClose={editModal.hide}
        onEdit={handleEditSubmit}
        initialValues={editRecord
          ? toEditInitialValues(editRecord)
          : undefined
        }
      />
    </div>
  );
}

