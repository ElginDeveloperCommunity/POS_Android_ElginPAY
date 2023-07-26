"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const statusServer_1 = require("./statusServer");
const transactionServer_1 = require("./transactionServer");
const STATUS_PORT = 3001;
const TRANSACTION_PORT = 3000;
const HOST = '192.168.214.11';
const statusServer = new statusServer_1.StatusServer();
const transactionServer = new transactionServer_1.TransactionServer();
statusServer.listen(STATUS_PORT, HOST, () => {
    logger_1.logger.info(`Status Server listening on ${HOST}:${STATUS_PORT}`);
});
transactionServer.listen(TRANSACTION_PORT, HOST, () => {
    logger_1.logger.info(`Transaction Server listening on ${HOST}:${TRANSACTION_PORT}`);
});
//# sourceMappingURL=index.js.map