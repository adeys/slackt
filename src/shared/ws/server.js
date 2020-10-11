const mitt = require('mitt');
const WebSocket = require('ws');
const nanoId = require('nanoid');

class Client {
    constructor(socket, uid) {
        this.socket = socket;
        this.id = uid;

        this.registerListeners();
        this.emitter = mitt();
    }

    registerListeners() {
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
        this.emitter = mitt();
    }

    listen(callback) {
        this.wss = new WebSocket.Server({server: this.server});
        this._registerListeners();

        if (callback && typeof callback === 'function') {
            callback();
        }
    }

    broadcast(type, data) {
        // Broadcast to all connected clients
        Array.from(this.clients.values())
            .forEach(client => {
                if (client.isConnected()) {
                    client.emit(type, data);
                }
            });
    }

    _registerListeners() {
        this.wss.on('connection', socket => {
            let id = nanoId.nanoid();
            let client = new Client(socket, id);

            this.clients.set(id, client);
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

module.exports = WebSocketServer;