import {
  app,
  BrowserWindow,
} from 'electron';
import * as path from 'path';


// RootPath
const ROOT_PATH = "file://" + path.resolve("");

// mainWindowのHTMLファイル
const rootPath = `${ROOT_PATH}/build/react/index.html`;

// アプリ起動時の処理
app.on('ready', e => {
  const winSetting = { width: 1600, height: 960 };
  const mainWindow = new BrowserWindow(winSetting);
  // デベロップツールの表示

  console.log(`${rootPath}?rootDir=${app.getPath("documents")}`);
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(`${rootPath}?rootDir=${path.join(app.getPath("documents"), "ninit")}`);
});

// アプリ終了時の処理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
