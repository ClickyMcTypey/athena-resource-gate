export const resourceGateConfig = {
  selectors: {
    container: '.resource-rtf',
    marker: '#gater',

    article: '[contenttype="article"]',
    caseStudy: '[contenttype="casestudy"]',

    modal: '#resourcemodal',
    formTarget: '[data-resource-form-target]',

    openFormButton: '[cmd="openform"]',
    closeFormButton: '[cmd="closeform"]',

    resourceGreeter: '#resourcegreeter',
    resourceGreeterSub: '#resourcegreetersub',
  },

  classes: {
    articleFormTarget: 'gater-after',
    modalOpen: 'is-open',
  },

  cookies: {
    articleUnlock: 'athn_res',
    days: 7,
  },

  hubspotFields: {
    hdyhauPrimary: 'hdyhau_primary',
    hdyhauSecondary: 'hdyhau_secondary',
    leadMagnetContentId: 'leadmagnet_contentid',
    leadMagnetContentType: 'leadmagnet_contenttype',
  },

  fallbackValues: {
    hdyhauSecondary: 'athena20122740',
  },

  messages: {
    caseStudySuccessTitle: 'Success',
    caseStudySuccessSubtitle: "We'll get in touch with you shortly.",
  },

  debug: true,
};