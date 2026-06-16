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

        if (document.querySelector(config.selectors.guide)) {
            return 'guide';
        }

        logger.warn(
            'No resource type found. Expected [contenttype="article"], [contenttype="casestudy"], or [contenttype="guide"].'
        );

        return null;
    },

    readMetaFromDom() {
        const contentIdEl = document.querySelector('[contentid]');
        const contentTypeEl = document.querySelector('[contenttype]');

        return {
            contentId: contentIdEl?.getAttribute('contentid') || '',
            contentType: contentTypeEl?.getAttribute('contenttype') || state.resourceType || '',
        };
    },

    captureMeta() {
        state.resourceMeta = this.readMetaFromDom();

        logger.log('resource meta captured:', state.resourceMeta);

        return state.resourceMeta;
    },

    getMeta() {
        return state.resourceMeta;
    },
};