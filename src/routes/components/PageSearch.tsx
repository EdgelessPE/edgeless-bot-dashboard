import { Input, InputProps } from '@arco-design/web-react';
import './PageSearch.less';

export const PageSearch = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: InputProps['onChange'];
}) => {
  return (
    <div className="page-search">
      <Input.Search
        searchButton
        allowClear
        placeholder="搜索任务名称"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
