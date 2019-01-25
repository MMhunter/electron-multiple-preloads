
declare module 'electron-multiple-preloads' {

  export function shimMain();

  export function shimRenderer();

  export function createMultiplePreloadWindow(options?: any): any;

}