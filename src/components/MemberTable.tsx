import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';

import { memberFields } from '@/constants/memberFields';
import { defaultRecords } from '@/data/default';
import type { RecordData } from '@/types/record';

import createColumns from './createColumns';
import { FieldFormItem } from './FieldFormItem';

const columns: ColumnType<RecordData>[] = createColumns();

export default function MemberTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState<RecordData[]>(defaultRecords);
  const [form] = Form.useForm();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleAdd = (values: RecordData) => {
    const joinedAt: string = (typeof values.joinedAt === 'object' && 'format' in values.joinedAt)
      ? values.joinedAt.format('YYYY-MM-DD')
      : typeof values.joinedAt === 'string' ? values.joinedAt : '';
    const emailOptIn: boolean = typeof values.emailOptIn === 'boolean' ? values.emailOptIn : false;

    setRecords((prev) => [...prev, { ...values, joinedAt, emailOptIn }]);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      {/* 테이블 헤더 */}
      <div className="flex items-center justify-between px-[14px]">
        <Title level={2} className="h-[48px] flex items-center mb-0! text-[16px]!">회원 목록</Title>
        <Button
          type="primary"
          className="rounded-full"
          icon={<PlusOutlined className="text-[11px]" />}
          onClick={handleOpen}
        >
          추가
        </Button>
      </div>

      {/* 테이블 본체 */}
      <Table
        rowKey="name"
        rowSelection={{
          type: 'checkbox'
        }}
        dataSource={records}
        columns={columns}
        pagination={false}
        className="rounded-xl border border-gray-200 bg-white"
        rowClassName={() => "text-base font-normal"}
        components={{
          header: {
            cell: (props) => <td {...props} className="px-2 py-2" />,
          },
          body: {
            cell: (props) => <td {...props} className="px-2! py-3!" />,
          },
        }}
      />

      {/* 회원 추가 Modal */}
      <Modal
        title="회원 추가"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd} requiredMark={false}>
          {memberFields.map(field => (
            <FieldFormItem key={field.key} field={field} />
          ))}

          {/* 취소/추가 */}
          <div className="flex justify-end gap-2">
            <Button onClick={handleClose}>취소</Button>
            <Button htmlType="submit">추가</Button>
          </div>
        </Form>
      </Modal>

    </div>
  );
}

