import net from 'node:net'

import { createPayloadStatus } from './payloadUtils.mjs';
import { logger } from './logger.mjs';

export class StatusServer {
    constructor() {
        this.server = net.createServer(this.handleConnection.bind(this));
    }

    handleConnection(socket) {
        logger.info('Server: Status Port Connected')

        const payload = createPayloadStatus();

        socket.write(JSON.stringify(payload));
        socket.end();
    }

    listen(port, host, callback) {
        this.server.listen(port, host, callback);
    }
}
