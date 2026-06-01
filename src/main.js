import { app } from './app.js';

window.AthenaResourceGate = app;

function boot() {
    app.init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}