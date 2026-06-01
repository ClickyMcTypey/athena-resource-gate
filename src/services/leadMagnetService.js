import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { resourceService } from './resourceService.js';
import { setFieldValue } from '../utils/dom.js';
import { logger } from '../utils/logger.js';

export const leadMagnetService = {
  applyToForm(formWrapper) {
    if (!formWrapper) return;

    const meta = resourceService.getMeta();

    const contentIdField = formWrapper.querySelector(
      `[name="${config.hubspotFields.leadMagnetContentId}"]`
    );

    const contentTypeField = formWrapper.querySelector(
      `[name="${config.hubspotFields.leadMagnetContentType}"]`
    );

    if (contentIdField && meta.contentId) {
      setFieldValue(contentIdField, meta.contentId);
    }

    if (contentTypeField && meta.contentType) {
      setFieldValue(contentTypeField, meta.contentType);
    }

    if (!contentIdField) {
      logger.warn('HubSpot field not found:', config.hubspotFields.leadMagnetContentId);
    }

    if (!contentTypeField) {
      logger.warn('HubSpot field not found:', config.hubspotFields.leadMagnetContentType);
    }
  },
};