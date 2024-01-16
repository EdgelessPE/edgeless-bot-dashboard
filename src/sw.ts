import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { StaleWhileRevalidate } from 'workbox-strategies';

console.log((self as any).__WB_MANIFEST);
registerRoute(
  ({ request }) => {
    const types: RequestDestination[] = [
      'style',
      'document',
      'script',
      'image',
      '',
    ];
    // console.log(114514, request.url, request.destination);
    return types.includes(request.destination);
  },
  new StaleWhileRevalidate({
    matchOptions: {
      ignoreVary: true,
      ignoreSearch: true,
    },
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      {
        cacheKeyWillBeUsed: async ({ request }) => {
          const url = new URL(request.url);
          return url.pathname;
        },
      },
    ],
  }),
);
