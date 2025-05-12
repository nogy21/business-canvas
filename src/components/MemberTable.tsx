import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select, Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';

import { defaultRecords } from '@/data/default';
import type { RecordData } from '@/types/record';

import createColumns from './createColumns';

const columns: ColumnType<RecordData>[] = createColumns();

export default function MemberTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal 열기/닫기 핸들러
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleAdd = (values: RecordData) => {
    alert(JSON.stringify(values));
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
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
        }}
        dataSource={defaultRecords}
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
        <Form layout="vertical" onFinish={handleAdd}>
          {/* 이름 */}
          <Form.Item label="이름" name="name" rules={[{ required: true, message: '이름을 입력하세요.' }]}>
            <Input />
          </Form.Item>
          {/* 주소 */}
          <Form.Item label="주소" name="address" rules={[{ required: true, message: '주소를 입력하세요.' }]}>
            <Input />
          </Form.Item>
          {/* 메모 */}
          <Form.Item label="메모" name="memo">
            <Input.TextArea />
          </Form.Item>
          {/* 가입일 */}
          <Form.Item label="가입일" name="joinedAt">
            <DatePicker />
          </Form.Item>
          {/* 직업 */}
          <Form.Item label="직업" name="job">
            <Select>
              <Select.Option value="developer">개발자</Select.Option>
              <Select.Option value="designer">디자이너</Select.Option>
              <Select.Option value="manager">매니저</Select.Option>
            </Select>
          </Form.Item>
          {/* 이메일 수신 여부 */}
          <Form.Item label="이메일 수신 여부" name="emailOptIn">
            <Checkbox />
          </Form.Item>

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

