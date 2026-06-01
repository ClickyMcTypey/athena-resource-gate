export const app = {
    init() {
        console.log('[AthenaResourceGate] app initialized');
    },

    onHubSpotReady(formLike) {
        console.log('[AthenaResourceGate] HubSpot ready', formLike);
    },

    onHubSpotSubmitted() {
        console.log('[AthenaResourceGate] HubSpot submitted');
    },
};