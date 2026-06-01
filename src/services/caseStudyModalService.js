import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { resourceGateState as state } from '../state/resourceGate.state.js';
import { logger } from '../utils/logger.js';

export const caseStudyModalService = {
    open() {
        const modal = document.querySelector(config.selectors.modal);

        if (!modal) {
            logger.warn('Case study modal not found:', config.selectors.modal);
            return;
        }

        modal.style.setProperty('display', 'flex', 'important');
        modal.classList.add(config.classes.modalOpen);
        modal.setAttribute('aria-hidden', 'false');

        logger.log('Case study modal opened.');
    },

    close() {
        const modal = document.querySelector(config.selectors.modal);

        if (!modal) {
            logger.warn('Case study modal not found:', config.selectors.modal);
            return;
        }

        modal.style.setProperty('display', 'none', 'important');
        modal.classList.remove(config.classes.modalOpen);
        modal.setAttribute('aria-hidden', 'true');

        logger.log('Case study modal closed.');
    },

    bindOpenEvents({ beforeOpen } = {}) {
        if (state.hasBoundOpenButtons) return;

        document.addEventListener('click', (event) => {
            const button = event.target.closest(config.selectors.openFormButton);

            if (!button) return;

            const isCaseStudyPage = document.querySelector(config.selectors.caseStudy);

            if (!isCaseStudyPage) return;

            event.preventDefault();

            state.resourceType = 'casestudy';

            if (typeof beforeOpen === 'function') {
                beforeOpen();
            }

            this.open();
        });

        state.hasBoundOpenButtons = true;
    },

    bindCloseEvents() {
        if (state.hasBoundModalCloseEvents) return;

        document.addEventListener('click', (event) => {
            const modal = document.querySelector(config.selectors.modal);

            if (!modal) return;

            const closeButton = event.target.closest(config.selectors.closeFormButton);

            if (closeButton) {
                event.preventDefault();
                this.close();
                return;
            }

            if (event.target === modal) {
                this.close();
            }
        });

        state.hasBoundModalCloseEvents = true;
    },

    bindEvents(options = {}) {
        this.bindOpenEvents(options);
        this.bindCloseEvents();
    },
};