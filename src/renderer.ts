/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 */

import './index.css';

console.log(
  '👋 This message is being logged by the renderer process, included via Vite',
);

// Keep the window exactly as big as #clippy. On Wayland, clicks on the
// transparent parts of a window still go to that window, so the less empty
// space it has, the less it gets in the way.
const clippy = document.getElementById('clippy');
if (clippy) {
  new ResizeObserver(() => {
    const { width, height } = clippy.getBoundingClientRect();
    window.clippy.resizeTo(Math.ceil(width), Math.ceil(height));
  }).observe(clippy);
}
