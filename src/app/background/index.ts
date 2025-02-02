import { ROUTES } from '@src/routes/constants';
import { detectBrowser } from '@src/shared-kernel/utils/detect-browser';
import * as browser from 'webextension-polyfill';

console.log('Background script loaded');

browser.runtime.onInstalled.addListener(async () => {
  //   const onboardingState = await browser.storage.local.get("onboarding");
  //   if (Object.keys(onboardingState).length) return;

  const isFirefox = detectBrowser() === 'firefox';

  // browser.tabs.create({
  //   url: `.${isFirefox ? '' : '/src'}/popup.html#${ROUTES.DASHBOARD}`,
  // });
});
