import { defaultRecords } from '@/data/default';
import { Checkbox } from 'antd';
import type { FilterDropdownProps } from 'antd/lib/table/interface';
import type { ReactNode } from 'react';


/**
 * 필드별 렌더 함수
 */
export const fieldRenderers: Record<string, (value: string | boolean) => ReactNode> = {
  emailOptIn: (value) => <Checkbox checked={Boolean(value)} />,
  joinedAt: (value) => <span className="text-sm" > {value} </span>,
  job: (value) => <span className="text-sm" > {value} </span>,
  name: (value) => <span className="text-sm" > {value} </span>,
  address: (value) => <span className="text-sm" > {value} </span>,
  memo: (value) => <span className="text-sm" > {value} </span>,
};

/**
 * 필드별 필터 옵션
 */
export const fieldFilterOptions: Record<string, string[]> = {
  emailOptIn: ['true', 'false'],
  job: Array.from(new Set(defaultRecords.map(({ job }) => String(job)))),
  name: Array.from(new Set(defaultRecords.map(({ name }) => String(name)))),
  address: Array.from(new Set(defaultRecords.map(({ address }) => String(address)))),
  memo: Array.from(new Set(defaultRecords.map(({ memo }) => String(memo)))),
  joinedAt: Array.from(new Set(defaultRecords.map(({ joinedAt }) => String(joinedAt)))),
};

/**
 * 공통 필터 드롭다운 생성 함수
 */
export const createCheckboxFilterDropdown = (options: string[]) =>
  ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) =>
  (
    <div className="w-full p-2" >
      {
        options.map((value) => (
          <div key={value} >
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