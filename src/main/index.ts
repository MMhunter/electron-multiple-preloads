import { webContents as ElectronWebContents, ipcMain, BrowserWindow } from 'electron';

export function shim() {

  ipcMain.on('shim-multiple-preloads', (event) => {
    const webContents = event.sender;
    webContents.addListener('will-attach-webview', (event, webPreferences) => {
      if (typeof webPreferences.extraPreloads === 'string') {
        try {
          const preloads = webPreferences.extraPreloads.split('###');
          if (preloads.length >= 1) {
            webPreferences.additionalArguments = preloads.map(preload => {
              return '--extra-preloads=' + preload;
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
    event.returnValue = true;
  });

}

const preloadPath = require('path').resolve(__dirname, '../preload/browser-window.js');

export function createMultiplePreloadWindow (...args): BrowserWindow  {
  let options = args[0];
  if (!options) {
    options = {};
  }
  if (!options.webPreferences) {
    options.webPreferences = {};
  }
  options.webPreferences.preload = preloadPath;
  args = args.splice(0, 1, options);
  return new BrowserWindow(...args);
}