import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

console.log((self as any).__WB_MANIFEST);
registerRoute(
  ({ request }) => request.method === 'GET',
  new StaleWhileRevalidate(),
);
