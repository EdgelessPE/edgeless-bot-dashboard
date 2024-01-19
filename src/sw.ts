/// <reference lib="webworker" />

import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: { url: string; revision: string | null }[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _manifest = self.__WB_MANIFEST;

registerRoute(
  ({ request }) => {
    const types: RequestDestination[] = [
      'style',
      'document',
      'script',
      'image',
    ];
    console.log(114514, request.url, request.destination);
    return types.includes(request.destination);
  },
  new StaleWhileRevalidate({
    matchOptions: {
      ignoreVary: true,
      ignoreSearch: true,
    },
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200, 304],
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

registerRoute(
  ({ request }) => {
    return request.destination === '';
  },
  new NetworkFirst({
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200, 304],
      }),
    ],
  }),
);
