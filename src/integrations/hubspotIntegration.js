import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { resourceGateState as state } from '../state/resourceGate.state.js';

import { setCookie } from '../utils/cookies.js';
import { logger } from '../utils/logger.js';

import { hdyhauService } from '../services/hdyhauService.js';
import { leadMagnetService } from '../services/leadMagnetService.js';
import { caseStudyModalService } from '../services/caseStudyModalService.js';
import { resourceMessageService } from '../services/resourceMessageService.js';

export const hubspotIntegration = {
    normalizeForm(formLike) {
        const element = formLike?.[0] || formLike;

        if (!(element instanceof HTMLElement)) {
            logger.warn('Unable to normalize HubSpot form.', formLike);
            return null;
        }

        return element.closest('.hbspt-form') || element;
    },

    bindBeforeSubmit(formWrapper) {
        const form =
            formWrapper?.querySelector('form') ||
            formWrapper?.closest('form') ||
            document.querySelector('.hbspt-form form');

        if (!form) {
            logger.warn('Unable to bind before-submit lead magnet check. Form not found.');
            return;
        }

        if (form.dataset.resourceGateLeadMagnetBound === 'true') return;

        form.addEventListener(
            'submit',
            () => {
                leadMagnetService.applyToForm(formWrapper);
            },
            true
        );

        form.dataset.resourceGateLeadMagnetBound = 'true';

        logger.log('Before-submit lead magnet check bound.');
    },

    getFormMountTarget() {
        if (state.resourceType === 'article') {
            return document.querySelector(`.${config.classes.articleFormTarget}`);
        }

        if (state.resourceType === 'casestudy') {
            return document.querySelector(config.selectors.formTarget);
        }

        if (state.resourceType === 'guide') {
            return document.querySelector(config.selectors.guideFormTarget);
        }

        return null;
    },

    moveForm() {
        if (state.hasMovedForm) return;

        const target = this.getFormMountTarget();
        const formWrapper = state.formWrapper || document.querySelector('.hbspt-form');

        if (!target || !formWrapper) {
            logger.warn('Form mount target or HubSpot form not found.', {
                target,
                formWrapper,
                resourceType: state.resourceType,
            });

            return;
        }

        target.appendChild(formWrapper);

        state.formWrapper = formWrapper;
        state.hasMovedForm = true;

        logger.log('HubSpot form moved.');
    },

    onReady(formLike) {
        const formWrapper = this.normalizeForm(formLike);

        if (!formWrapper) return;

        state.formWrapper = formWrapper;

        hdyhauService.bind(formWrapper);
        hdyhauService.reset(formWrapper);

        this.moveForm();

        leadMagnetService.applyToFormWithRetry(formWrapper);
        this.bindBeforeSubmit(formWrapper);
    },
    
    onSubmitted() {
        leadMagnetService.applyToForm(state.formWrapper);

        if (state.resourceType === 'casestudy') {
            resourceMessageService.showSuccessMessage();
            return;
        }

        if (state.resourceType === 'guide') {
            resourceMessageService.showSuccessMessage();
            resourceMessageService.hideGuideFormContainer();
            return;
        }

        if (state.resourceType === 'article') {
            setCookie(
                config.cookies.articleUnlock,
                'true',
                config.cookies.days
            );

            setTimeout(() => {
                window.location.reload();
            }, 300);
        }
    },
};