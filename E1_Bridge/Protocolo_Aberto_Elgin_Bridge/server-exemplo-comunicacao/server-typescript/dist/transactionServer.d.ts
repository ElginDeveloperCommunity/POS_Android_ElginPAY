/// <reference types="node" />
import net from 'node:net';
import * as OperationHandlers from './operationHandlers';
interface Payload {
    operation: number;
    params: object;
}
export declare class TransactionServer {
    private server;
    private receivedData;
    private operationHandlers;
    constructor();
    /**
     * @param {net.Socket} socket
     */
    handleConnection(socket: net.Socket): void;
    /**
     * @param {net.Socket} socket
     */
    writeConfirmationToSocket(socket: net.Socket): void;
    /**
     * @param {net.Socket} socket
     */
    writeToSocket(socket: net.Socket, data: string): void;
    cleanData(s: string): string;
    /**
     * @param {{ operation: number, params: Object }} payload
     */
    processReceivedPayload(payload: Payload): {
        code: number;
        content: string;
        is_special_function: boolean;
    } | OperationHandlers.CommonResponse;
    listen(port: number, host: string, callback: () => void): void;
}
export {};
//# sourceMappingURL=transactionServer.d.ts.map