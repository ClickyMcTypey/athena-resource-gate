import { resourceGateConfig as config } from '../config/resourceGate.config.js';

export const logger = {
  log(...args) {
    if (config.debug) {
      console.log('[AthenaResourceGate]', ...args);
    }
  },

  warn(...args) {
    if (config.debug) {
      console.warn('[AthenaResourceGate]', ...args);
    }
  },
};