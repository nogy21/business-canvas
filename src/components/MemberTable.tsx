import { PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
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
      <div className="flex items-center justify-between px-[14px]">
        <Title level={2} className="h-[48px] flex items-center mb-0! text-[16px]!">회원 목록</Title>
        <Button
          type="primary"
          className="rounded-full"
          icon={<PlusOutlined className="text-[11px]" />}
          onClick={() => { }}>
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
    </div>
  );
}

