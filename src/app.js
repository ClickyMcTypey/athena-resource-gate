import { resourceGateState as state } from './state/resourceGate.state.js';

import { logger } from './utils/logger.js';
import { resourceService } from './services/resourceService.js';

export const app = {
    init() {
        state.resourceType = resourceService.detectType();

        logger.log('app initialized');
        logger.log('resource type:', state.resourceType);
        logger.log('resource meta:', resourceService.getMeta());

        if (!state.resourceType) return;

        if (state.resourceType === 'article') {
            logger.log('article page detected');
            return;
        }

        if (state.resourceType === 'casestudy') {
            logger.log('case study page detected');
            return;
        }
    },

    onHubSpotReady(formLike) {
        logger.log('HubSpot ready', formLike);
    },

    onHubSpotSubmitted() {
        logger.log('HubSpot submitted');
    },
};