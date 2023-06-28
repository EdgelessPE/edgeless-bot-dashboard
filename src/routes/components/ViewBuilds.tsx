import { Alert, Button, List, Modal } from '@arco-design/web-react';
import { formatDate, openUrl, SortedItem } from '@/routes/utils';

export function ViewBuilds({ item }: { item: SortedItem }) {
  const onClick = () => {
    Modal.info({
      title: item.title,
      content: (
        <div>
          {item.errorMessage !== 'No error yet' && (
            <>
              <small>最近的错误消息：</small>
              <Alert
                type="error"
                title={item.errorMessage}
                style={{ marginBottom: '16px' }}
              />
            </>
          )}
          <small>服务中的构建：</small>
          <List
            dataSource={item.builds}
            size="small"
            render={build => {
              return (
                <List.Item>
                  <List.Item.Meta
                    title={`${build.fileName} （${build.version}）`}
                    description={formatDate(build.timestamp)}
                  />
                </List.Item>
              );
            }}
          />
        </div>
      ),
      closable: true,
      okText: '转到 GitHub',
      onOk: () => {
        openUrl(
          `https://github.com/EdgelessPE/edgeless-bot/blob/next/tasks/${encodeURIComponent(
            item.title,
          )}/config.toml`,
        );
      },
    });
  };
  return (
    <>
      <Button type="text" onClick={onClick}>
        查看详情
      </Button>
    </>
  );
}
