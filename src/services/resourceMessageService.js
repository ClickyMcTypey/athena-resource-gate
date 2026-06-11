import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { logger } from '../utils/logger.js';

export const resourceMessageService = {
    showSuccessMessage() {
        const greeter = document.querySelector(config.selectors.resourceGreeter);
        const greeterSub = document.querySelector(config.selectors.resourceGreeterSub);

        if (greeter) {
            greeter.textContent = config.messages.resourceSuccessTitle;
        }

        if (greeterSub) {
            greeterSub.textContent = config.messages.resourceSuccessSubtitle;
        }

        logger.log('Resource success message shown.');
    },

    hideGuideFormContainer() {
        const formContainer = document.querySelector(config.selectors.guideFormTarget);

        if (!formContainer) {
            logger.warn('Guide form container not found:', config.selectors.guideFormTarget);
            return;
        }

        formContainer.style.display = 'none';

        logger.log('Guide form container hidden.');
    },
};