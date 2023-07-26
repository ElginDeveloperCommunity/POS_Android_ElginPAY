/// <reference types="node" />
import net from 'node:net';
export declare class StatusServer {
    private server;
    constructor();
    handleConnection(socket: net.Socket): void;
    listen(port: number, host: string, callback: () => void): void;
}
//# sourceMappingURL=statusServer.d.ts.map