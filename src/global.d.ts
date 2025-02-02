/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line import/no-unresolved
import Chrome from 'chrome';
import * as Browser from 'webextension-polyfill';

declare namespace chrome {
  export default Chrome;
}

declare namespace browser {
  export default Browser;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}
