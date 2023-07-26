"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.turnOnDebugger = void 0;
let debug = true;
let info = true;
function turnOnDebugger() {
    debug = true;
}
exports.turnOnDebugger = turnOnDebugger;
exports.logger = {
    debug(...message) {
        if (!debug)
            return;
        console.log(...message);
    },
    info(...message) {
        if (!info)
            return;
        console.log(...message);
    }
};
//# sourceMappingURL=logger.js.map