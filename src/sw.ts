import { registerRoute } from 'workbox-routing';
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
  }),
);
