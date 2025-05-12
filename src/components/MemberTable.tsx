import { Checkbox, Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';
import type { Key } from 'react';

import { defaultFields, defaultRecords } from '@/data/default';
import type { RecordData } from '@/types/record';


const columns: ColumnType<RecordData>[] = defaultFields.map((field) => {
  let render: (value: string | boolean) => React.ReactNode;
  let filters: { text: string; value: string }[] | undefined;
  let onFilter: ((value: boolean | Key, record: RecordData) => boolean) | undefined;

  switch (field.type) {
    case 'checkbox':
      if (field.key === 'emailOptIn') {
        return {
          title: field.label,
          dataIndex: field.key,
          key: field.key,
          render: (value) => <Checkbox checked={Boolean(value)} />,
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div className="p-2">
              {[
                { label: '동의함', value: 'true' },
                { label: '동의 안 함', value: 'false' },
              ].map((option) => (
                <div key={String(option.value)}>
                  <Checkbox
                    checked={selectedKeys.includes(option.value)}
                    onChange={(e) => {
                      const nextSelectedKeys = e.target.checked
                        ? [...selectedKeys, option.value]
                        : selectedKeys.filter((key) => key !== option.value);
                      setSelectedKeys(nextSelectedKeys);
                      confirm();
                    }}
                  >
                    {option.label}
                  </Checkbox>
                </div>
              ))}
            </div>
          ),
          onFilter: (value, record) => String(Boolean(record[field.key])) === value,
        };
      }
      render = (value) => <Checkbox checked={Boolean(value)} />;
      break;
    case 'select':
      if (field.key === 'job') {
        render = (value) => value;
        filters = field.options?.map((option) => ({ text: option, value: option })) ?? [];
        onFilter = (value, record) => record.job === value;
        return {
          title: field.label,
          dataIndex: field.key,
          key: field.key,
          render,
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div className="p-2">
              {filters?.map((filter) => (
                <div key={filter.value}>
                  <Checkbox
                    checked={selectedKeys.includes(filter.value)}
                    onChange={(e) => {
                      const nextSelectedKeys = e.target.checked
                        ? [...selectedKeys, filter.value]
                        : selectedKeys.filter((key) => key !== filter.value);
                      setSelectedKeys(nextSelectedKeys);
                      confirm();
                    }}
                  >
                    {filter.text}
                  </Checkbox>
                </div>
              ))}
            </div>
          ),
          onFilter: (value, record) => record.job === value,
        };
      }
      render = (value) => value;
      break;
    case 'date':
      if (field.key === 'joinedAt') {
        render = (value) => value;
        const uniqueJoinedAt = [...new Set(defaultRecords.map(record => record.joinedAt))]
          .filter((v): v is string => typeof v === 'string');
        return {
          title: field.label,
          dataIndex: field.key,
          key: field.key,
          render,
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div className="p-2">
              {uniqueJoinedAt.map((joinedAt) => (
                <div key={joinedAt}>
                  <Checkbox
                    checked={selectedKeys.includes(joinedAt)}
                    onChange={(e) => {
                      const nextSelectedKeys = e.target.checked
                        ? [...selectedKeys, joinedAt]
                        : selectedKeys.filter((key) => key !== joinedAt);
                      setSelectedKeys(nextSelectedKeys);
                      confirm();
                    }}
                  >
                    {joinedAt}
                  </Checkbox>
                </div>
              ))}
            </div>
          ),
          onFilter: (value, record) => record.joinedAt === value,
        };
      }
      render = (value) => value;
      break;
    default:
      if (['name', 'address', 'memo'].includes(field.key)) {
        if (field.key === 'name') {
          const uniqueNames = [...new Set(defaultRecords.map(record => record.name))]
            .filter((v): v is string => typeof v === 'string');
          return {
            title: field.label,
            dataIndex: field.key,
            key: field.key,
            render: (value) => value,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
              <div className="p-2">
                {uniqueNames.map((name) => (
                  <div key={name}>
                    <Checkbox
                      checked={selectedKeys.includes(name)}
                      onChange={(e) => {
                        const nextSelectedKeys = e.target.checked
                          ? [...selectedKeys, name]
                          : selectedKeys.filter((key) => key !== name);
                        setSelectedKeys(nextSelectedKeys);
                        confirm();
                      }}
                    >
                      {name}
                    </Checkbox>
                  </div>
                ))}
              </div>
            ),
            onFilter: (value, record) => record.name === value,
          };
        }
        if (field.key === 'address') {
          const uniqueAddresses = [...new Set(defaultRecords.map(record => record.address))]
            .filter((v): v is string => typeof v === 'string');
          return {
            title: field.label,
            dataIndex: field.key,
            key: field.key,
            render: (value) => value,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
              <div className="p-2">
                {uniqueAddresses.map((address) => (
                  <div key={address}>
                    <Checkbox
                      checked={selectedKeys.includes(address)}
                      onChange={(e) => {
                        const nextSelectedKeys = e.target.checked
                          ? [...selectedKeys, address]
                          : selectedKeys.filter((key) => key !== address);
                        setSelectedKeys(nextSelectedKeys);
                        confirm();
                      }}
                    >
                      {address}
                    </Checkbox>
                  </div>
                ))}
              </div>
            ),
            onFilter: (value, record) => record.address === value,
          };
        }
        if (field.key === 'memo') {
          const uniqueMemos = [...new Set(defaultRecords.map(record => record.memo))]
            .filter((v): v is string => typeof v === 'string');
          return {
            title: field.label,
            dataIndex: field.key,
            key: field.key,
            render: (value) => value,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
              <div className="p-2">
                {uniqueMemos.map((memo) => (
                  <div key={memo}>
                    <Checkbox
                      checked={selectedKeys.includes(memo)}
                      onChange={(e) => {
                        const nextSelectedKeys = e.target.checked
                          ? [...selectedKeys, memo]
                          : selectedKeys.filter((key) => key !== memo);
                        setSelectedKeys(nextSelectedKeys);
                        confirm();
                      }}
                    >
                      {memo}
                    </Checkbox>
                  </div>
                ))}
              </div>
            ),
            onFilter: (value, record) => record.memo === value,
          };
        }
      }
      render = (value) => value;
  }

  return {
    title: field.label,
    dataIndex: field.key,
    key: field.key,
    render,
    filters,
    onFilter,
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
