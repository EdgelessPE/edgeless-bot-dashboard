import { useState } from 'react';
import { List } from '@arco-design/web-react';
import { useLoaderData } from '@modern-js/runtime/router';
import { ListHeader } from '@/routes/components/ListHeader';
import { SortBy, useListProps } from '@/routes/utils';
import { renderHealth } from '@/routes/renderers/health';
import type { PageData } from '@/routes/page.loader';
import './index.less';

const Index = () => {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortBy>('health');

  const pageData = useLoaderData() as PageData;
  const listProps = useListProps(pageData.statusMap, sortBy, searchText);

  return (
    <div className="container">
      <List
        {...listProps}
        header={
          <ListHeader
            onSearchChange={setSearchText}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        }
        hoverable
        wrapperClassName="list"
        render={item => {
          return (
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={renderHealth(item.health)}
                title={item.title}
                description={`最新构建版本：${item.latestVersion}`}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Index;
