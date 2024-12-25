import React from 'react';
import { Html, Root, Head, Body } from '@modern-js/runtime/document';

export default function Document(): React.ReactElement {
  return (
    <Html>
      <Head>
        <title>Edgeless Bot Dashboard</title>
        <link
          rel="icon"
          href="https://cloud.edgeless.top/picbed/bot/logo.ico"
          type="image/x-icon"
        />
      </Head>
      <Body>
        <Root rootId="root" />
      </Body>
    </Html>
  );
}
