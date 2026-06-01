export const resourceGateState = {
  resourceType: null,
  formWrapper: null,

  hasMovedForm: false,
  hasBoundOpenButtons: false,
  hasBoundModalCloseEvents: false,

  boundForms: new WeakSet(),
};