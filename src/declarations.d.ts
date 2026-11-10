/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
declare module '*.css';

interface Window {
  clippy: {
    resizeTo: (width: number, height: number) => void;
  };
}
