let debug = true;
let info = true;

export function turnOnDebugger() {
    debug = true;
}

export const logger = {
    debug(...message) {
        if (!debug) return;

        console.log(...message);
    },
    info(...message) {
        if (!info) return;
        console.log(...message);
    }
}

