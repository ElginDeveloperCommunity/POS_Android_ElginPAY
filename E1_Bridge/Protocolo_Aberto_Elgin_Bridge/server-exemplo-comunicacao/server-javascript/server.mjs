import net from 'node:net'

const PORT = 3001;
const HOST = '192.168.214.11';

const payloadServer = {
	"code": 0,
	"content": "",
	"is_special_operation": false
}

const serverStatus = net.createServer(() => {});

serverStatus.on('connection', (socket) => {
    console.log('new connection');

    socket.write(JSON.stringify(payloadServer));

    socket.on('data', (data) => {
        console.log(data);
        socket.write(JSON.stringify(payloadServer));
    })
})

serverStatus.listen(PORT, HOST, () => {
    console.log('opened server on', serverStatus.address());
})
