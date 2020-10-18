const jwt = require('jsonwebtoken');
const jwtConfig = require('../../server/settings').jwt;
const Room = require('../../shared/ws/server').Room;
const db = require('./database');

class ChatManager {
    constructor() {
        this.server = null;
        this.userSockets = {};
        this.rooms = {
            default: new Room('default')
        };

        db.on('loaded', () => {
            db.getCollection('rooms')
                .find().forEach(room => this.addRoom({id: room._id}));
        });
    }

    /**
     * @param {WebSocketServer} server
     */
    bootstrap(server) {
        /** @param {WebSocketServer.Client} client */
        server.on('connection', client => {
            client.on('user.authentication', token => {
                try {
                    let payload = jwt.verify(token, jwtConfig.secret, jwtConfig.options);
                    client.user = {id: payload.jti, username: payload.username};
                    client.isAuthenticated = true;
                    this.userSockets[payload.jti] = client.id;
                    client.emit('user.authenticated', client.id);
                } catch (e) {
                    client.isAuthenticated = false;
                    client.user = null;
                    client.emitter.emit('authentication.error');
                }
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

            ['typing.started', 'typing.ended'].forEach(action => {
                client.on(action, ({room, user}) => {
                    this.broadcastTo(room, client, `user.${action}`, {user});
                });
            })
        });

        this.server = server;
    }

    broadcastTo(to, from, event, data) {
        let room = this.rooms[to];
        if (!room) return;

        room.broadcastFrom(from, event, data);
    }

    notifyRoom(event, room, payload) {
        this.broadcastTo(
            room,
            this.server.clients.get(this.userSockets[payload.id]),
            `room.${event}`,
            {user: payload}
        );
    }

    addRoom(room) {
        this.rooms[room.id] = new Room(room.id);
    }
}

exports.ChatManager = ChatManager;
module.exports = new ChatManager();