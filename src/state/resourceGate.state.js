export const resourceGateState = {
    hasInitialized: false,

    resourceType: null,
    formWrapper: null,

    hasMovedForm: false,
    hasBoundOpenButtons: false,
    hasBoundModalCloseEvents: false,

    boundForms: new WeakSet(),
};