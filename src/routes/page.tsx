import { Badge, List, Space, Tag } from '@arco-design/web-react';
import { useLoaderData } from '@modern-js/runtime/router';
import { URLParams } from '@/routes/hooks/types';
import { useURLParams } from '@/routes/hooks/useURLParams';
import { useListProps } from '@/routes/hooks/useListProps';
import { ViewBuilds } from '@/routes/components/ViewBuilds';
import { ListHeader } from '@/routes/components/ListHeader';
import { getDateColor } from '@/routes/utils';
import { renderHealth } from '@/routes/renderers/health';
import type { PageData } from '@/routes/page.loader';
import './index.less';

const Index = () => {
  const pageData = useLoaderData() as PageData;
  const { params, setParams } = useURLParams<URLParams>({
    current: 1,
    pageSize: 10,
    sortBy: 'health',
    search: '',
  });
  const listProps = useListProps(pageData.statusMap, params, setParams);

  return (
    <div className="container">
      <List
        {...listProps}
        header={
          <ListHeader
            search={params.search}
            onSearchChange={search => {
              setParams(val => ({
                ...val,
                search,
              }));
            }}
            sortBy={params.sortBy}
            onSortByChange={sortBy => {
              setParams(val => ({
                ...val,
                sortBy,
              }));
            }}
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
                description={
                  <Badge
                    color={getDateColor(item.latestBuildDate)}
                    text={`构建日期：${item.latestBuildDate ?? '暂无构建'}`}
                  />
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Index;
