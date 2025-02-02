import { storeAsync } from '@src/redux/store';
import App from '@src/routes/routes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import * as browser from 'webextension-polyfill';
import '@src/styles/main.css';

const bootstrap = async () => {
  const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)');

  document
    .getElementById('switch-dark-mode')
    ?.setAttribute('data-theme', defaultTheme.matches ? 'dark' : 'light');

  const isPopupOpen = browser.extension.getViews({ type: 'popup' }).length > 0;
  const body = document.getElementsByTagName('body');

  if (isPopupOpen) {
    body[0].style.width = '357px';
    body[0].style.height = '600px';
  }

  const rootElement = document.getElementById('app-container') as HTMLElement;

  if (!rootElement) {
    console.error('Target container is not a DOM element.');
    return;
  }

  const root = createRoot(rootElement);
  const asyncStore = await storeAsync();

  root.render(
    <Provider store={asyncStore}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  );
};

bootstrap().catch((e) =>
  console.log('Error while bootstrapping application: ', e)
);
