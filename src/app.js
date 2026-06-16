import { resourceGateState as state } from './state/resourceGate.state.js';

import { logger } from './utils/logger.js';

import { resourceService } from './services/resourceService.js';
import { articleGateService } from './services/articleGateService.js';
import { caseStudyModalService } from './services/caseStudyModalService.js';

import { hubspotIntegration } from './integrations/hubspotIntegration.js';

import { leadMagnetService } from './services/leadMagnetService.js';

export const app = {
    state,

    init() {
        if (state.hasInitialized) return;

        state.hasInitialized = true;

        caseStudyModalService.bindEvents({
            beforeOpen() {
                hubspotIntegration.moveForm();
            },
        });

        state.resourceType = resourceService.detectType();

        /**
         * Capture this early.
         * This must happen before articleGateService.init()
         * because article gating can remove DOM content after #gater.
         */
        resourceService.captureMeta();

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
            return;
        }

        if (state.resourceType === 'guide') {
            hubspotIntegration.moveForm();
            return;
        }
    },

    debugLeadMagnet() {
        return leadMagnetService.applyToForm(state.formWrapper);
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