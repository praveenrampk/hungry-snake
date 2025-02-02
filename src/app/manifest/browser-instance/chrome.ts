const chromeMV3 = {
  permissions: ['storage', 'tabs'],
  background: {
    service_worker: 'src/app/background/index.ts',
    type: 'module',
  },
  content_security_policy: {
    extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
  },
  externally_connectable: {
    matches: ['*://*/*'],
    ids: ['*'],
  },
  minimum_chrome_version: '88',
  commands: {
    _execute_action: {
      suggested_key: {
        windows: 'Alt+Shift+H',
        mac: 'Alt+Shift+H',
        linux: 'Alt+Shift+H',
        chromeos: 'Alt+Shift+H',
      },
    },
  },
};

export default chromeMV3;
