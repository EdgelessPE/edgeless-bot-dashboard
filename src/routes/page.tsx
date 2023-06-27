import { List } from '@arco-design/web-react';
import { useLoaderData } from '@modern-js/runtime/router';
import { renderHealth } from '@/routes/renderers/health';
import type { PageData } from '@/routes/page.loader';
import './index.less';

const Index = () => {
  const pageData = useLoaderData() as PageData;
  return (
    <div className="container">
      <List
        hoverable
        wrapperClassName="list"
        dataSource={Object.entries(pageData.statusMap)}
        render={([title, { recent }]) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={renderHealth(recent.health)}
                title={title}
                description={`最新构建版本：${recent.latestVersion}`}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Index;
