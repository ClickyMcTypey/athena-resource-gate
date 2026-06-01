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
};