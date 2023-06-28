import { Layout, Menu } from '@arco-design/web-react';
import { IconGithub } from '@arco-design/web-react/icon';
import { openUrl } from '@/routes/utils';

export function HeaderMenus() {
  const items = [
    {
      key: 'home',
      title: '首页',
      url: 'https://home.edgeless.top',
    },
    {
      key: 'wiki',
      title: '文档',
      url: 'https://wiki.edgeless.top/bot',
    },
    {
      key: 'down',
      title: '下载站',
      url: 'https://down.edgeless.top',
    },
  ];
  return (
    <Menu mode="horizontal" selectable={false} className="menus">
      {items.map(item => (
        <Menu.Item key={item.key} onClick={() => openUrl(item.url)}>
          {item.title}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export const PageHeader = () => {
  return (
    <Layout.Header className="header">
      <img src="https://home.edgeless.top/favicon.ico" className="logo" />
      <h3 className="title">Edgeless Bot Dashboard</h3>
      <HeaderMenus />
      <IconGithub
        className="github"
        onClick={() => {
          openUrl('https://github.com/EdgelessPE/edgeless-bot');
        }}
      />
    </Layout.Header>
  );
};
