"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusServer = void 0;
const node_net_1 = __importDefault(require("node:net"));
const payloadUtils_1 = require("./payloadUtils");
const logger_1 = require("./logger");
class StatusServer {
    server;
    constructor() {
        this.server = node_net_1.default.createServer(this.handleConnection.bind(this));
    }
    handleConnection(socket) {
        logger_1.logger.info('Server: Status Port Connected');
        const payload = (0, payloadUtils_1.createPayloadStatus)();
        socket.write(JSON.stringify(payload));
        socket.end();
    }
    listen(port, host, callback) {
        this.server.listen(port, host, callback);
    }
}
exports.StatusServer = StatusServer;
//# sourceMappingURL=statusServer.js.map