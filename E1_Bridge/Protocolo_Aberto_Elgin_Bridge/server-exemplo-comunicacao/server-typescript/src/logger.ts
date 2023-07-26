let debug = true;
let info = true;

export function turnOnDebugger() {
    debug = true;
}

export const logger = {
    debug(...message: string[]) {
        if (!debug) return;

        console.log(...message);
    },
    info(...message: string[]) {
        if (!info) return;
        console.log(...message);
    }
}

