import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { resourceGateState as state } from '../state/resourceGate.state.js';
import { logger } from '../utils/logger.js';

export const resourceService = {
  detectType() {
    if (document.querySelector(config.selectors.caseStudy)) {
      return 'casestudy';
    }

    if (document.querySelector(config.selectors.article)) {
      return 'article';
    }

    logger.warn('No resource type found. Expected [contenttype="article"] or [contenttype="casestudy"].');

    return null;
  },

  getContentId() {
    const element = document.querySelector('[contentid]');

    if (!element) {
      logger.warn('Missing [contentid] attribute.');
      return '';
    }

    return element.getAttribute('contentid') || '';
  },

  getContentType() {
    const element = document.querySelector('[contenttype]');

    if (!element) {
      logger.warn('Missing [contenttype] attribute. Falling back to state.resourceType.');
      return state.resourceType || '';
    }

    return element.getAttribute('contenttype') || state.resourceType || '';
  },

  getMeta() {
    return {
      contentId: this.getContentId(),
      contentType: this.getContentType(),
    };
  },
};