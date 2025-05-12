import { defaultFields, defaultRecords } from '@/data/default';
import type { RecordData } from '@/types/record';
import { MoreOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import type { FilterDropdownProps } from 'antd/lib/table/interface';
import type { ReactNode } from 'react';

/**
 * 공통 필터 드롭다운 생성 함수
 */
const createCheckboxFilterDropdown = (options: string[]) =>
  ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) =>
  (
    <div className="w-full p-2">
      {options.map((value) => (
        <div key={value}>
          <Checkbox
            checked={selectedKeys.includes(value)}
            onChange={(e) => {
              const next = e.target.checked
                ? [...selectedKeys, value]
                : selectedKeys.filter((key) => key !== value);
              setSelectedKeys(next);
              confirm();
            }}
          >
            {value}
          </Checkbox>
        </div>
      ))}
    </div>
  );

/**
 * 필터 조건 생성기
 */
const createFilteredColumn = (
  key: keyof RecordData,
  label: string,
  options: string[],
  valueRenderer: (value: string | boolean) => ReactNode = (value) => value,
  width = 120,
): ColumnType<RecordData> => ({
  title: <span className='font-semibold text-gray-800'>
    {label}
  </span>,
  dataIndex: key,
  key,
  width,
  render: (value) => <span className='text-sm'>{valueRenderer(value)}</span>,
  filterDropdown: createCheckboxFilterDropdown(options),
  onFilter: (value, record) => String(record[key]) === value,
});

/**
 * 더보기 버튼 컬럼
 */
const moreButtonColumn: ColumnType<RecordData> = {
  title: '', // 헤더 비움
  key: 'actions',
  dataIndex: 'actions',
  width: 48, // Figma에 맞게 조정
  align: 'center',
  render: () => (
    <button
      type="button"
      className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
      aria-label="메뉴"
      tabIndex={0}
    >
      <MoreOutlined className="text-sm text-gray-500" />
    </button>
  ),
}

/**
 * 최종 컬럼 구성
 */
export default function createColumns(): ColumnType<RecordData>[] {
  return [...defaultFields.map((field) => {
    switch (field.key) {
      case "emailOptIn":
        return createFilteredColumn(
          "emailOptIn",
          field.label,
          ["true", "false"],
          (value) => <Checkbox checked={Boolean(value)} />,
        );

      case "name":
      case "address":
      case "memo":
      case "joinedAt":
      case "job": {
        const uniqueValues = Array.from(
          new Set(defaultRecords.map((r) => String(r[field.key]))),
        );
        return createFilteredColumn(field.key, field.label, uniqueValues);
      }

      default: {
        const render =
          field.type === "checkbox"
            ? (v: boolean) => <Checkbox checked={Boolean(v)} />
            : (v: string) => v;
        return {
          title: (
            <span className='font-semibold text-gray-800'>
              {field.label}
            </span>
          ),
          dataIndex: field.key,
          key: field.key,
          render,
        };
      }
    }
  }), moreButtonColumn];
}
