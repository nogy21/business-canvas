import { memberFields } from '@/constants/memberFields';
import type { RecordData } from '@/types/record';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { createCheckboxFilterDropdown, fieldFilterOptions, fieldRenderers } from './columnUtils';



/**
 * 컬럼 생성 함수
 */
const createFieldColumn = (
  field: typeof memberFields[number],
): ColumnType<RecordData> => {
  const render = fieldRenderers[field.key] ?? ((value: string | boolean) => value);
  const filterOptions = fieldFilterOptions[field.key];

  return {
    title: <span className='font-semibold text-gray-800'>
      {field.label}
    </span>,
    dataIndex: field.key,
    key: field.key,
    width: field.width,
    align: field.align,
    render,
    ...(filterOptions && {
      filterDropdown: createCheckboxFilterDropdown(filterOptions),
      onFilter: (value, record) => String(record[field.key]) === value,
    }),
  };
};

/**
 * 더보기 버튼 컬럼
 */
const createMoreButtonColumn = (onEdit: (record: RecordData) => void, onDelete: (record: RecordData) => void): ColumnType<RecordData> => ({
  title: '',
  key: 'actions',
  dataIndex: 'actions',
  width: 48,
  align: 'center',
  render: (_, record: RecordData) => (
    <Dropdown
      menu={{
        items: [
          {
            key: 'edit',
            label: '수정',
            onClick: () => onEdit(record),
          },
          {
            type: 'divider',
          },
          {
            key: 'delete',
            label: <span className='text-red-500'>삭제</span>,
            onClick: () => onDelete(record),
          },
        ],
      }}
      trigger={['click']}
    >
      <button
        type="button"
        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
        aria-label="메뉴"
        tabIndex={0}
      >
        <MoreOutlined className="text-sm text-gray-500" />
      </button>
    </Dropdown>
  ),
});

/**
 * 최종 컬럼 구성
 */
export default function createColumns(onEdit: (record: RecordData) => void, onDelete: (record: RecordData) => void): ColumnType<RecordData>[] {
  return [
    ...memberFields.map(createFieldColumn),
    createMoreButtonColumn(onEdit, onDelete),
  ];
}
