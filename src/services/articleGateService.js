import { resourceGateConfig as config } from '../config/resourceGate.config.js';
import { getCookie } from '../utils/cookies.js';
import { logger } from '../utils/logger.js';

export const articleGateService = {
  getContainer() {
    return document.querySelector(config.selectors.container);
  },

  getGaterParent(container) {
    if (!container) return null;

    const marker = container.querySelector(config.selectors.marker);

    if (!marker) {
      logger.warn('Article gate marker not found:', config.selectors.marker);
      return null;
    }

    marker.style.display = 'none';

    let parent = marker;

    while (parent && parent.parentElement !== container) {
      parent = parent.parentElement;
    }

    return parent && parent.parentElement === container ? parent : null;
  },

  createGateWrapper() {
    const wrapper = document.createElement('div');

    wrapper.className = config.classes.articleFormTarget;
    wrapper.innerHTML = `
      <div class="gater-flavor">
        <h2 class="gater-title">Continue Reading</h2>
      </div>
    `;

    return wrapper;
  },

  applyGate() {
    const container = this.getContainer();

    if (!container) {
      logger.warn('Article container not found:', config.selectors.container);
      return;
    }

    const gaterParent = this.getGaterParent(container);

    if (!gaterParent) return;

    const children = Array.from(container.children);
    const markerIndex = children.indexOf(gaterParent);

    if (markerIndex === -1) return;

    children.slice(markerIndex + 1).forEach((child) => {
      child.remove();
    });

    const nextElement = gaterParent.nextElementSibling;

    if (!nextElement?.classList.contains(config.classes.articleFormTarget)) {
      gaterParent.insertAdjacentElement('afterend', this.createGateWrapper());
    }

    logger.log('Article gate applied.');
  },

  unlockContent() {
    const container = this.getContainer();

    if (!container) return;

    const gaterParent = this.getGaterParent(container);

    if (gaterParent) {
      gaterParent.remove();
    }

    const wrapper = container.querySelector(`.${config.classes.articleFormTarget}`);

    if (wrapper) {
      wrapper.remove();
    }

    logger.log('Article content unlocked.');
  },

  hasUnlockCookie() {
    return Boolean(getCookie(config.cookies.articleUnlock));
  },

  init() {
    if (this.hasUnlockCookie()) {
      this.unlockContent();
      return 'unlocked';
    }

    this.applyGate();
    return 'gated';
  },
};