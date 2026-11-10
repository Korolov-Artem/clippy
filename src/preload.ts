// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('clippy', {
  // Ask the main process to fit the window to the visible content.
  resizeTo: (width: number, height: number) =>
    ipcRenderer.send('clippy:resize', width, height),
});
