import { Outlet } from '@modern-js/runtime/router';
import { Layout } from '@arco-design/web-react';
import { PageHeader } from '@/routes/components/PageHeader';

// 注册 service-worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(res => console.log(`[SW] Service worker registered : `, res));
}

export default function () {
  return (
    <Layout>
      <PageHeader />
      <Outlet />
    </Layout>
  );
}
