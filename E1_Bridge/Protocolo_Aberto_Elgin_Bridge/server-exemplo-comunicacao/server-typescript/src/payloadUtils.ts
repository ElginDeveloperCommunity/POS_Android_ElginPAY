
export function createPayloadStatus() {
    return {
        code: 0,
        content: "",
        is_special_operation: false
    };
}

export function createPayloadConfirmation() {
    return {
        code: 0,
        content: "ACK",
        is_special_operation: false
    };
}

export function createErrorPayload(errorMessage: string) {
    return {
        code: -1,
        content: errorMessage,
        is_special_function: false
    }
}
