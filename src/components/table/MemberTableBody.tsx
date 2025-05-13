import type { RecordData } from '@/types/record';
import { Table, type TableProps } from 'antd';
import type { ColumnType } from 'antd/lib/table';

type MemberTableBodyProps = {
  records: RecordData[];
  columns: ColumnType<RecordData>[];
  rowSelection?: TableProps<RecordData>['rowSelection'];
};

/**
 * 회원 테이블 바디
 * @param records 회원 목록
 * @param columns 회원 컬럼
 * @param rowSelection 회원 행 선택
 * @returns 회원 테이블
 */
export function MemberTableBody({ records, columns, rowSelection }: MemberTableBodyProps) {
  return (
    <Table
      rowKey="name"
      dataSource={records}
      columns={columns}
      rowSelection={rowSelection}
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
  );
}
