const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    useContentSize: true,
    fullscreen: true,
    kiosk: true
  });
  mainWindow.loadURL(__dirname + '/index.html#' + encodeURIComponent(process.argv[1] || ''));
  mainWindow.focus();
});
