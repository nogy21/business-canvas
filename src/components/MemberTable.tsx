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
  const [records, setRecords] = useState<RecordData[]>(defaultRecords);
  const [form] = Form.useForm();

  // Modal 열기/닫기 핸들러
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
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
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
          {/* 이름 */}
          <Form.Item
            label={
              <span>
                이름
                <span className="text-red-500 ml-1">
                  *
                </span>
              </span>
            }
            name="name"
            rules={[
              { required: true, message: '이름을 입력하세요.' },
              { max: 20, message: '이름은 20자 이하로 입력하세요.' },
            ]}
          >
            <Input maxLength={20} />
          </Form.Item>
          {/* 주소 */}
          <Form.Item
            label="주소"
            name="address"
            rules={[
              { max: 20, message: '주소는 20자 이하로 입력하세요.' },
            ]}
          >
            <Input maxLength={20} />
          </Form.Item>
          {/* 메모 */}
          <Form.Item
            label="메모"
            name="memo"
            rules={[
              { max: 50, message: '메모는 50자 이하로 입력하세요.' },
            ]}
          >
            <Input.TextArea maxLength={50} />
          </Form.Item>
          {/* 가입일 */}
          <Form.Item
            label={
              <span>
                가입일
                <span className="text-red-500 ml-1">
                  *
                </span>
              </span>
            }
            name="joinedAt"
            rules={[
              { required: true, message: '가입일을 선택하세요.' },
            ]}
          >
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
          <Form.Item label="이메일 수신 여부" name="emailOptIn" valuePropName="checked">
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

