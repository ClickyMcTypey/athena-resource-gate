import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { resourceGateState as state } from '../state/resourceGate.state.js';
import { setFieldValue } from '../utils/dom.js';

export const hdyhauService = {
  updateSecondary(formWrapper, primaryValue) {
    if (!formWrapper) return;

    const secondaryWrapper = formWrapper.querySelector('.hs_hdyhau_secondary');
    if (!secondaryWrapper) return;

    const secondaryInput = secondaryWrapper.querySelector('input');
    const secondaryLabel =
      secondaryWrapper.querySelector('label span') ||
      secondaryWrapper.querySelector('span');

    const labelText = config.hdyhauLabels[primaryValue];

    if (labelText) {
      secondaryWrapper.style.display = '';
      setFieldValue(secondaryInput, '');

      if (secondaryLabel) {
        secondaryLabel.textContent = labelText;
      }

      return;
    }

    secondaryWrapper.style.display = 'none';
    setFieldValue(secondaryInput, config.fallbackValues.hdyhauSecondary);
  },

  bind(formWrapper) {
    if (!formWrapper || state.boundForms.has(formWrapper)) return;

    formWrapper.addEventListener('change', (event) => {
      if (!event.target.matches(`[name="${config.hubspotFields.hdyhauPrimary}"]`)) {
        return;
      }

      this.updateSecondary(formWrapper, event.target.value);
    });

    state.boundForms.add(formWrapper);
  },

  reset(formWrapper) {
    if (!formWrapper) return;

    const primarySelect = formWrapper.querySelector(
      `[name="${config.hubspotFields.hdyhauPrimary}"]`
    );

    if (!primarySelect) return;

    primarySelect.selectedIndex = 0;

    this.updateSecondary(formWrapper, primarySelect.value);

    primarySelect.dispatchEvent(new Event('change', { bubbles: true }));
  },
};