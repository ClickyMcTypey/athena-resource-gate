import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { resourceGateState as state } from '../state/resourceGate.state.js';
import { resourceService } from './resourceService.js';
import { setFieldValue } from '../utils/dom.js';
import { logger } from '../utils/logger.js';

export const leadMagnetService = {
  getFirstAttributeValue(attributeName) {
    const elements = Array.from(document.querySelectorAll(`[${attributeName}]`));

    const match = elements.find((element) => {
      const value = element.getAttribute(attributeName);
      return value && value.trim();
    });

    return match?.getAttribute(attributeName)?.trim() || '';
  },

  getResolvedMeta() {
    const storedMeta = resourceService.getMeta?.() || state.resourceMeta || {};

    const domContentId = this.getFirstAttributeValue('contentid');
    const domContentType = this.getFirstAttributeValue('contenttype');

    return {
      contentId:
        storedMeta.contentId ||
        domContentId ||
        '',

      contentType:
        storedMeta.contentType ||
        domContentType ||
        state.resourceType ||
        '',
    };
  },

  findField(formWrapper, fieldName) {
    return (
      formWrapper?.querySelector(`[name="${fieldName}"]`) ||
      state.formWrapper?.querySelector(`[name="${fieldName}"]`) ||
      document.querySelector(`.hbspt-form [name="${fieldName}"]`) ||
      document.querySelector(`[name="${fieldName}"]`)
    );
  },

  applyToForm(formWrapper = state.formWrapper) {
    const meta = this.getResolvedMeta();

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

    const rows = [
      {
        field: config.hubspotFields.leadMagnetContentId,
        found: Boolean(contentIdField),
        attemptedValue: meta.contentId,
        finalValue: contentIdField?.value || '',
        filled: Boolean(contentIdField?.value),
      },
      {
        field: config.hubspotFields.leadMagnetContentType,
        found: Boolean(contentTypeField),
        attemptedValue: meta.contentType,
        finalValue: contentTypeField?.value || '',
        filled: Boolean(contentTypeField?.value),
      },
    ];

    logger.log('lead magnet apply result:', rows);

    if (config.debug) {
      console.table(rows);
    }

    return {
      meta,
      rows,
      contentIdField,
      contentTypeField,
      contentIdFilled: Boolean(contentIdField?.value),
      contentTypeFilled: Boolean(contentTypeField?.value),
    };
  },

  applyToFormWithRetry(formWrapper = state.formWrapper, attempts = 15) {
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
          meta: result.meta,
          contentIdFilled: result.contentIdFilled,
          contentTypeFilled: result.contentTypeFilled,
        });
      }
    }, 200);
  },
};