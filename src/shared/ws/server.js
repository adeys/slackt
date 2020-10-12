const mitt = require('mitt');
const WebSocket = require('ws');
const nanoId = require('nanoid');

class Room {
    constructor(name) {
        this.name = name;
        this.clients = new Map();
    }

    addClient(client) {
        this.clients.set(client.id, client);
        // Automatic remove client from room (Before implementing room sub-unsub)
        client.on('disconnect', () => this.removeClient(client));
    }

    removeClient(client) {
        if (this.clients.has(client.id)) {
            this.clients.delete(client.id);
        }
    }

    broadcastFrom(client, type, data) {
        let clients = Array.from(this.clients.values());

        this._broadcast(clients.filter(curr => curr.id !== client.id), type, data);
    }

    broadcast(type, data) {
        this._broadcast(Array.from(this.clients.values()), type, data);
    }

    _broadcast(clients, type, data) {
        // Broadcast to all provided clients
        clients.forEach(client => {
            if (client.isConnected()) {
                client.emit(type, data);
            }
        });
    }
}

class Client {
    constructor(socket, uid) {
        this.socket = socket;
        this.id = uid;
        this.emitter = mitt();
        this.configureSocket();
    }

    configureSocket() {
        ['ping', 'pong', 'error'].forEach(type => {
            this.socket.on(type, data => {
                this.emitter.emit(type, data);
            });
        });

        this.socket.on('close', () => {
            this.emitter.emit('disconnect');
        });

        this.socket.on('message', data => {
            const info = JSON.parse(data);
            if (info.type === 'connect') {
                this.emit(info.type, this.id);
            }

            this.emitter.emit(info.type, info.data);
        });
    }

    emit(type, payload) {
        this.socket.send(JSON.stringify({type, data: payload}));
    }

    isConnected() {
        return this.socket.readyState === WebSocket.OPEN;
    }

    // Events handling methods
    on(event, callback) {
        this.emitter.on(event, callback);
    }

    off(event, callback) {
        this.emitter.off(event, callback);
    }
}

class WebSocketServer {
    constructor(server) {
        this.server = server;
        this.wss = null;
        this.clients = new Map();
        this.defaultRoom = new Room('__slackt__');
        this.emitter = mitt();
    }

    listen(callback) {
        this.wss = new WebSocket.Server({server: this.server});
        this.configureServer();

        if (callback && typeof callback === 'function') {
            callback();
        }
    }

    broadcast(type, data) {
        this.defaultRoom.broadcast(type, data);
    }

    configureServer() {
        this.wss.on('connection', socket => {
            let id = nanoId.nanoid();
            let client = new Client(socket, id);

            this.clients.set(id, client);
            this.defaultRoom.addClient(client);

            console.log('New Web Socket connection');
            this.emitter.emit('connection', client);
        })
    }

    // Events handling methods
    on(event, callback) {
        this.emitter.on(event, callback);
    }

    off(event, callback) {
        this.emitter.off(event, callback);
    }
}

WebSocketServer.Room = Room;
WebSocketServer.Client = Client;
module.exports = WebSocketServer;