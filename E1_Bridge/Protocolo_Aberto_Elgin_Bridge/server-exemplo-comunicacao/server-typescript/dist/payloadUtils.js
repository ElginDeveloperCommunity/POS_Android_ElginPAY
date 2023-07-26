"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorPayload = exports.createPayloadConfirmation = exports.createPayloadStatus = void 0;
function createPayloadStatus() {
    return {
        code: 0,
        content: "",
        is_special_operation: false
    };
}
exports.createPayloadStatus = createPayloadStatus;
function createPayloadConfirmation() {
    return {
        code: 0,
        content: "ACK",
        is_special_operation: false
    };
}
exports.createPayloadConfirmation = createPayloadConfirmation;
function createErrorPayload(errorMessage) {
    return {
        code: -1,
        content: errorMessage,
        is_special_function: false
    };
}
exports.createErrorPayload = createErrorPayload;
//# sourceMappingURL=payloadUtils.js.map