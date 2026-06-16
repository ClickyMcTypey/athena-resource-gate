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

    logger.log('lead magnet fields applied:', {
      contentId: meta.contentId,
      contentType: meta.contentType,
      hasContentIdField: Boolean(contentIdField),
      hasContentTypeField: Boolean(contentTypeField),
    });
  },
};