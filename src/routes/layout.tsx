import { IconGithub } from '@arco-design/web-react/icon';
import { Outlet } from '@modern-js/runtime/router';
import { Layout } from '@arco-design/web-react';
import { openUrl } from '@/routes/utils';
import { HeaderMenus } from '@/routes/header-menus';

export default function () {
  return (
    <Layout>
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
      <Outlet />
    </Layout>
  );
}
