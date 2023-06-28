import { useState } from 'react';
import { List, Space, Tag } from '@arco-design/web-react';
import { useLoaderData } from '@modern-js/runtime/router';
import { ViewBuilds } from '@/routes/components/ViewBuilds';
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
            <List.Item key={item.title} extra={<ViewBuilds item={item} />}>
              <List.Item.Meta
                avatar={renderHealth(item.health)}
                title={
                  <Space>
                    {item.title}
                    <Tag>{item.latestVersion}</Tag>
                  </Space>
                }
                description={`构建日期：${item.latestBuildDate ?? '暂无构建'}`}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Index;
