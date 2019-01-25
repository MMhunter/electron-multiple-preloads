import { shim as shimRenderer } from './renderer';
import { shim as shimMain, createMultiplePreloadWindow  } from './main';

export = {
  shimRenderer,
  shimMain,
  createMultiplePreloadWindow
}