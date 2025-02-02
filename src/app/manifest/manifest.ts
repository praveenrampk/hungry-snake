import { ManifestV3Export } from '@crxjs/vite-plugin';
import packageJson from '../../../package.json';
import chromeMV3 from './browser-instance/chrome';
import firefoxMV3 from './browser-instance/firefox';

const browser = process.env.BROWSER ?? 'chrome';

let manifest: ManifestV3Export = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  action: {
    default_title: 'Hungry snake',
    default_popup: 'src/popup.html',
    default_icon: {
      '16': 'public/icons/icon-16.png',
      '48': 'public/icons/icon-48.png',
      '128': 'public/icons/icon-128.png',
    },
  },
  icons: {
    '16': 'public/icons/icon-16.png',
    '48': 'public/icons/icon-48.png',
    '128': 'public/icons/icon-128.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/app/content/index.ts'],
      css: [],
      run_at: 'document_start',
      all_frames: true,
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'public/icons/icon-16.png',
        'public/icons/icon-48.png',
        'public/icons/icon-128.png',
      ],
      matches: ['*://*/*'],
      use_dynamic_url: true,
    },
  ],
  devtools_page: 'src/app/devtools/index.html',
  host_permissions: [
    'http://localhost:8545/',
    'file://*/*',
    'http://*/*',
    'https://*/*',
  ],
  permissions: [
    'storage',
    'unlimitedStorage',
    'clipboardWrite',
    'activeTab',
    'tabs',
    'notifications',
    'alarms',
  ],
};

console.log('browser: ', browser); // chrome

switch (browser) {
  case 'chrome':
  case 'brave':
    manifest = { ...manifest, ...chromeMV3 } as any;
    break;

  case 'firefox':
    manifest = { ...manifest, ...firefoxMV3 } as any;
    break;
  default:
    throw new Error('Unsupported browser');
}

export default manifest;
