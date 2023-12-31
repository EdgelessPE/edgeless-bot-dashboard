import { InputProps, Select, SelectProps } from '@arco-design/web-react';
import { SortBy } from '@/routes/utils';
import { PageSearch } from '@/routes/components/PageSearch';
import './ListHeader.less';

export function ListHeader({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
}: {
  search?: string;
  onSearchChange?: InputProps['onChange'];
  sortBy?: SortBy;
  onSortByChange?: SelectProps['onChange'];
}) {
  return (
    <div className="list-header">
      <PageSearch value={search} onChange={onSearchChange} />
      <div>
        <small style={{ marginRight: '8px' }}>排序方式：</small>
        <Select
          style={{ width: '120px' }}
          value={sortBy}
          onChange={onSortByChange}
          options={[
            { label: '健康度', value: 'health' },
            { label: '名称', value: 'name' },
            { label: '构建日期', value: 'date' },
          ]}
        />
      </div>
    </div>
  );
}
