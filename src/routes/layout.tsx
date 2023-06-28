import { Outlet } from '@modern-js/runtime/router';
import { Layout } from '@arco-design/web-react';
import { PageHeader } from '@/routes/components/PageHeader';

export default function () {
  return (
    <Layout>
      <PageHeader />
      <Outlet />
    </Layout>
  );
}
