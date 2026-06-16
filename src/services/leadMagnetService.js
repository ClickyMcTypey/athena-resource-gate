import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { resourceService } from './resourceService.js';
import { setFieldValue } from '../utils/dom.js';
import { logger } from '../utils/logger.js';

export const leadMagnetService = {
  findField(formWrapper, fieldName) {
    return (
      formWrapper?.querySelector(`[name="${fieldName}"]`) ||
      document.querySelector(`.hbspt-form [name="${fieldName}"]`) ||
      document.querySelector(`[name="${fieldName}"]`)
    );
  },

  applyToForm(formWrapper) {
    const meta = resourceService.getMeta();

    const contentIdField = this.findField(
      formWrapper,
      config.hubspotFields.leadMagnetContentId
    );

    const contentTypeField = this.findField(
      formWrapper,
      config.hubspotFields.leadMagnetContentType
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
      contentIdFieldFound: Boolean(contentIdField),
      contentTypeFieldFound: Boolean(contentTypeField),
      contentIdFieldValue: contentIdField?.value || '',
      contentTypeFieldValue: contentTypeField?.value || '',
    });

    return {
      contentIdField,
      contentTypeField,
      contentIdFilled: Boolean(contentIdField?.value),
      contentTypeFilled: Boolean(contentTypeField?.value),
    };
  },

  applyToFormWithRetry(formWrapper, attempts = 15) {
    let count = 0;

    const interval = setInterval(() => {
      count++;

      const result = this.applyToForm(formWrapper);

      const done =
        result.contentIdFilled &&
        result.contentTypeFilled;

      if (done || count >= attempts) {
        clearInterval(interval);

        logger.log('lead magnet retry finished:', {
          attemptsUsed: count,
          done,
          contentIdFilled: result.contentIdFilled,
          contentTypeFilled: result.contentTypeFilled,
        });
      }
    }, 200);
  },
};