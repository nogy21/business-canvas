import { Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';

import { defaultRecords } from '@/data/default';
import type { RecordData } from '@/types/record';
import createColumns from './createColumns';

const columns: ColumnType<RecordData>[] = createColumns();

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
