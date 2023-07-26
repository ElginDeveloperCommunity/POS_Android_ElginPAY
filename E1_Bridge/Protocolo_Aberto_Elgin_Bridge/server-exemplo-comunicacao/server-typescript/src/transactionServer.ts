import net from 'node:net'

import { createPayloadConfirmation, createErrorPayload } from './payloadUtils'
import { logger } from './logger';
import * as OperationHandlers from './operationHandlers'

interface Payload {
    operation: number;
    params: object;
}

interface OperationhandlersMap {
    [key: number]: (params: any) => OperationHandlers.CommonResponse;
}

export class TransactionServer {
    private server: net.Server;
    private receivedData: string;
    private operationHandlers: OperationhandlersMap;

    constructor() {
        this.server = net.createServer(this.handleConnection.bind(this));
        this.receivedData = '';

        // map of operation codes to process functions
        this.operationHandlers = {
            1  : OperationHandlers.processIniciarVenda,
            2  : OperationHandlers.processAdmMenu,
            4  : OperationHandlers.processIniciarCancelamentoVenda,
            15 : OperationHandlers.processAdmInstalacao,
            16 : OperationHandlers.processAdmReimpressao,
            19 : OperationHandlers.processAdmTesteDeComunicacao,
            23 : OperationHandlers.processAdmConfiguracao,
            24 : OperationHandlers.processAdmManutencao,
        }
    }

    /**
     * @param {net.Socket} socket 
     */
    handleConnection(socket: net.Socket) {
        logger.info('Server: Transaction Port Connected')

        socket.on('data', (data) => {
            logger.debug('data', data.toString('utf8'));

            this.receivedData += data.toString('utf8');

            if (socket.readableLength === 0) {
                this.writeConfirmationToSocket(socket);
                this.writeToSocket(socket, this.receivedData);

                this.receivedData = '';
            }
        });

        socket.on('end', () => {
            logger.debug('ended reading');
        })

        socket.on('close', (err) => {
            if (err)
                logger.debug('some error happened')
            logger.debug('connection closed')
        })

        socket.on('error', (err) => {
            logger.debug('an error occurred')
            logger.debug(err.message)
        })

        socket.on('timeout', () => {
            logger.debug('connection timeout')
        })
    }

    /**
     * @param {net.Socket} socket 
     */
    writeConfirmationToSocket(socket: net.Socket) {
        const responsePayload = createPayloadConfirmation();

        const buff = Buffer.from(JSON.stringify(responsePayload));

        socket.write(buff);
        logger.debug('writing', buff.toString('utf8'));
    }

    /**
     * @param {net.Socket} socket 
     */
    writeToSocket(socket: net.Socket, data: string) {
        const receivedData = this.cleanData(data);

        const receivedPayload = JSON.parse(receivedData);

        const responsePayload = this.processReceivedPayload(receivedPayload);

        const buff = Buffer.from(JSON.stringify(responsePayload));

        socket.write(buff);
        logger.debug('writing', buff.toString('utf8'));
    }

    cleanData(s: string) {
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
        s = s.replace(/[\u0000-\u0019]+/g,"");

        return s;
    }

    /**
     * @param {{ operation: number, params: Object }} payload
     */
    processReceivedPayload(payload: Payload) {
        const { operation, params } = payload;

        // find appropriate processing function based on the operation
        const processingFunction = this.operationHandlers[operation];

        if (processingFunction)
            return processingFunction(params);

        return createErrorPayload('Invalid operation code');
    }

    listen(port: number, host: string, callback: () => void) {
        this.server.listen(port, host, callback);
    }
}
