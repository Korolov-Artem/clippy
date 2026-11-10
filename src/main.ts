import { app, BrowserWindow, Tray } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { Menu } from "electron/main";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
    transparent: true,
    frame: false,
    // Keep Clippy above other windows. Works on X11, macOS and Windows.
    // Native Wayland has no API for this, so under Umbriel the
    // default_pinned window rule does the job instead.
    alwaysOnTop: true,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // DevTools stay closed by default. Open them in their own window when needed:
  //   - start with CLIPPY_DEVTOOLS=1 (e.g. `CLIPPY_DEVTOOLS=1 npm start`), or
  //   - press F12 / Ctrl+Shift+I while Clippy is focused.
  const toggleDevTools = () => {
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools({ mode: "detach" });
    }
  };

  if (process.env.CLIPPY_DEVTOOLS === "1") {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;
    const key = input.key.toLowerCase();
    if (key === "f12" || (input.control && input.shift && key === "i")) {
      event.preventDefault();
      toggleDevTools();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  const contextMenu = Menu.buildFromTemplate([
    { label: "Settings", type: "radio" },
    { label: "Quit", type: "radio" },
  ]);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
