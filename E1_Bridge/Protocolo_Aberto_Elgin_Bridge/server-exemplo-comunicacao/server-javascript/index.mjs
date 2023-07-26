import { logger } from "./logger.mjs";
import { StatusServer } from "./statusServer.mjs";
import { TransactionServer } from "./transactionServer.mjs";

const STATUS_PORT = 3001;
const TRANSACTION_PORT = 3000;
const HOST = '192.168.214.11';

const statusServer = new StatusServer();
const transactionServer = new TransactionServer();

statusServer.listen(STATUS_PORT, HOST, () => {
    logger.info(`Status Server listening on ${HOST}:${STATUS_PORT}`)
})

transactionServer.listen(TRANSACTION_PORT, HOST, () => {
    logger.info(`Transaction Server listening on ${HOST}:${TRANSACTION_PORT}`)
})
