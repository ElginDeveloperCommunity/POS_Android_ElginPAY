"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionServer = void 0;
const node_net_1 = __importDefault(require("node:net"));
const payloadUtils_1 = require("./payloadUtils");
const logger_1 = require("./logger");
const OperationHandlers = __importStar(require("./operationHandlers"));
class TransactionServer {
    server;
    receivedData;
    operationHandlers;
    constructor() {
        this.server = node_net_1.default.createServer(this.handleConnection.bind(this));
        this.receivedData = '';
        // map of operation codes to process functions
        this.operationHandlers = {
            1: OperationHandlers.processIniciarVenda,
            2: OperationHandlers.processAdmMenu,
            4: OperationHandlers.processIniciarCancelamentoVenda,
            15: OperationHandlers.processAdmInstalacao,
            16: OperationHandlers.processAdmReimpressao,
            19: OperationHandlers.processAdmTesteDeComunicacao,
            23: OperationHandlers.processAdmConfiguracao,
            24: OperationHandlers.processAdmManutencao,
        };
    }
    /**
     * @param {net.Socket} socket
     */
    handleConnection(socket) {
        logger_1.logger.info('Server: Transaction Port Connected');
        socket.on('data', (data) => {
            logger_1.logger.debug('data', data.toString('utf8'));
            this.receivedData += data.toString('utf8');
            if (socket.readableLength === 0) {
                this.writeConfirmationToSocket(socket);
                this.writeToSocket(socket, this.receivedData);
                this.receivedData = '';
            }
        });
        socket.on('end', () => {
            logger_1.logger.debug('ended reading');
        });
        socket.on('close', (err) => {
            if (err)
                logger_1.logger.debug('some error happened');
            logger_1.logger.debug('connection closed');
        });
        socket.on('error', (err) => {
            logger_1.logger.debug('an error occurred');
            logger_1.logger.debug(err.message);
        });
        socket.on('timeout', () => {
            logger_1.logger.debug('connection timeout');
        });
    }
    /**
     * @param {net.Socket} socket
     */
    writeConfirmationToSocket(socket) {
        const responsePayload = (0, payloadUtils_1.createPayloadConfirmation)();
        const buff = Buffer.from(JSON.stringify(responsePayload));
        socket.write(buff);
        logger_1.logger.debug('writing', buff.toString('utf8'));
    }
    /**
     * @param {net.Socket} socket
     */
    writeToSocket(socket, data) {
        const receivedData = this.cleanData(data);
        const receivedPayload = JSON.parse(receivedData);
        const responsePayload = this.processReceivedPayload(receivedPayload);
        const buff = Buffer.from(JSON.stringify(responsePayload));
        socket.write(buff);
        logger_1.logger.debug('writing', buff.toString('utf8'));
    }
    cleanData(s) {
        // Preserve newlines, etc. - use valid JSON
        s = s.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
        // Remove non-printable and other non-valid JSON characters
        s = s.replace(/[\u0000-\u0019]+/g, "");
        return s;
    }
    /**
     * @param {{ operation: number, params: Object }} payload
     */
    processReceivedPayload(payload) {
        const { operation, params } = payload;
        // find appropriate processing function based on the operation
        const processingFunction = this.operationHandlers[operation];
        if (processingFunction)
            return processingFunction(params);
        return (0, payloadUtils_1.createErrorPayload)('Invalid operation code');
    }
    listen(port, host, callback) {
        this.server.listen(port, host, callback);
    }
}
exports.TransactionServer = TransactionServer;
//# sourceMappingURL=transactionServer.js.map