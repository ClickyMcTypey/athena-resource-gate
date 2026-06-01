import { resourceGateState as state } from './state/resourceGate.state.js';

import { logger } from './utils/logger.js';

import { resourceService } from './services/resourceService.js';
import { articleGateService } from './services/articleGateService.js';
import { caseStudyModalService } from './services/caseStudyModalService.js';

import { hubspotIntegration } from './integrations/hubspotIntegration.js';

export const app = {
    init() {
        caseStudyModalService.bindEvents({
            beforeOpen() {
                hubspotIntegration.moveForm();
            },
        });

        state.resourceType = resourceService.detectType();

        logger.log('app initialized');
        logger.log('resource type:', state.resourceType);
        logger.log('resource meta:', resourceService.getMeta());

        if (!state.resourceType) return;

        if (state.resourceType === 'article') {
            const gateStatus = articleGateService.init();

            logger.log('article gate status:', gateStatus);

            if (gateStatus === 'gated') {
                hubspotIntegration.moveForm();
            }

            return;
        }

        if (state.resourceType === 'casestudy') {
            hubspotIntegration.moveForm();
        }
    },

    onHubSpotReady(formLike) {
        hubspotIntegration.onReady(formLike);
    },

    onHubSpotSubmitted() {
        hubspotIntegration.onSubmitted();
    },

    openCaseStudyModal() {
        caseStudyModalService.open();
    },

    closeCaseStudyModal() {
        caseStudyModalService.close();
    },
};