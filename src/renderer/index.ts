

declare const WebView;

export function shim() {

  const path = require('path');
  const platform = require('os').platform();

  require('electron').ipcRenderer.sendSync('shim-multiple-preloads');

  let webViewImplPath = '';
  if (platform === 'darwin') {
    webViewImplPath = path.join(require('electron').remote.app.getPath('exe'), '../../Resources/electron.asar/renderer/web-view/web-view')
  } else if ( platform === 'win32' || platform === 'linux') {
    webViewImplPath = path.join(require('electron').remote.app.getPath('exe'), './resources/electron.asar/renderer/web-view/web-view')
  } else {
    console.warn('electron-multiple-preloads lib is not tested on current platform.');
    webViewImplPath = path.join(require('electron').remote.app.getPath('exe'), './resources/electron.asar/renderer/web-view/web-view')
  }
  const WebViewImpl = require(webViewImplPath);
  const original = WebViewImpl.prototype.buildParams;
  WebViewImpl.prototype.buildParams = function() {
    if (this.webviewNode.preloads && this.webviewNode.preloads.length > 0) {
      this.attributes['preload'].setValue(path.resolve(__dirname, '../preload/webview.js'))
      this.attributes['webpreferences'].setValue((this.webviewNode.webpreferences || '') + `,extraPreloads=${this.webviewNode.preloads.join('###')}`);
    }
    return original.apply(this, arguments);
  }

}