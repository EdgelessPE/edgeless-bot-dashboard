import React from 'react';
import { Html, Root, Head, Body } from '@modern-js/runtime/document';

export default function Document(): React.ReactElement {
  return (
    <Html>
      <Head>
        <title>Edgeless Bot Dashboard</title>
        <link
          rel="icon"
          href="https://pineapple.edgeless.top/picbed/wiki/bot/logo.ico"
          type="image/x-icon"
        />
      </Head>
      <Body>
        <Root rootId="root" />
      </Body>
    </Html>
  );
}
