import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

const indexURI = url.format({
  pathname: path.join(__dirname, "index.html"),
  protocol: "file:",
  slashes: true
});

app.on("ready", _ => {
  const winSetting = { width: 1600, height: 960 };
  const mainWindow = new BrowserWindow(winSetting);

  mainWindow.webContents.openDevTools();
  // mainWindow.loadURL(`${indexURI}?rootDir=${path.join(app.getPath("documents"), "ninit")}&v=1`);
  mainWindow.loadURL(indexURI);
});

app.on("window-all-closed", () => {
  app.quit();
});
