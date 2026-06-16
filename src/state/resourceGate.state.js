export const resourceGateState = {
    hasInitialized: false,

    resourceType: null,

    resourceMeta: {
        contentId: '',
        contentType: '',
    },

    formWrapper: null,

    hasMovedForm: false,
    hasBoundOpenButtons: false,
    hasBoundModalCloseEvents: false,

    boundForms: new WeakSet(),
};