const jwt = require('jsonwebtoken');
const jwtConfig = require('../../server/settings').jwt;
const Room = require('../../shared/ws/server').Room;

class ChatManager {
    constructor() {
        this.server = null;
        this.rooms = {
            default: new Room('default')
        };
    }

    /**
     * @param {WebSocketServer} server
     */
    bootstrap(server) {
        /** @param {WebSocketServer.Client} client */
        server.on('connection', client => {
            client.on('user.authentication', token => {
                if (!jwt.verify(token, jwtConfig.secret, jwtConfig.options)) {
                    client.isAuthenticated = false;
                    client.token = null;
                    client.emitter.emit('authentication.error');
                    return;
                }

                client.token = token;
                client.isAuthenticated = true;
                client.emit('user.authenticated', client.id);
            });

            client.on('room.subscribe', roomId => {
                let room = this.rooms[roomId];
                if (room) {
                    room.addClient(client);
                    client.emit('room.subscribed');
                }
            });

            client.on('room.unsubscribe', roomId => {
                let room = this.rooms[roomId];
                if (room) {
                    room.removeClient(client);
                    client.emit('room.unsubscribed');
                }
            });

            client.on('room.broadcast', ({room, event}) => {
                this.broadcastTo(room, client, event.type, event.payload);
            });
        });

        this.server = server;
    }

    broadcastTo(to, from, event, data) {
        let room = this.rooms[to];
        if (!room) return;

        room.broadcastFrom(from, event, data);
    }
}

module.exports = ChatManager;