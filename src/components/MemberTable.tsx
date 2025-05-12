import { Checkbox, Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';

import { defaultFields, defaultRecords } from '@/data/default';
import type { RecordData } from '@/types/record';


const columns: ColumnType<RecordData>[] = defaultFields.map((field) => {
  let render: (value: string | boolean) => React.ReactNode;
  switch (field.type) {
    case 'checkbox':
      render = (value) => <Checkbox checked={Boolean(value)} />;
      break;
    case 'date':
      render = (value) => value; // 추후 날짜 포맷팅 가능
      break;
    default:
      render = (value) => value;
  }

  return {
    title: field.label,
    dataIndex: field.key,
    key: field.key,
    render,
  };
});

export default function MemberTable() {
  return (
    <div>
      {/* 테이블 헤더 */}
      <Title level={2}>회원 목록</Title>
      {/* 테이블 본체 */}
      <Table rowKey="name" dataSource={defaultRecords} columns={columns} pagination={false} />
    </div>
  );
}
