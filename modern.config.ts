import appTools, { defineConfig } from '@modern-js/app-tools';
import { InjectManifest } from 'workbox-webpack-plugin';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      // bundler: 'experimental-rspack',
    }),
  ],
  tools: {
    webpack: config => {
      config.plugins?.push(
        new InjectManifest({
          swSrc: 'src/sw.ts',
        }),
      );
      return {
        ...config,
      };
    },
  },
});
