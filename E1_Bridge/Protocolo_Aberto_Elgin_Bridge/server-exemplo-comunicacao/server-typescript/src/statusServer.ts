import net from 'node:net'

import { createPayloadStatus } from './payloadUtils';
import { logger } from './logger';

export class StatusServer {
    private server: net.Server;

    constructor() {
        this.server = net.createServer(this.handleConnection.bind(this));
    }

    handleConnection(socket: net.Socket) {
        logger.info('Server: Status Port Connected')

        const payload = createPayloadStatus();

        socket.write(JSON.stringify(payload));
        socket.end();
    }

    listen(port: number, host: string, callback: () => void) {
        this.server.listen(port, host, callback);
    }
}
