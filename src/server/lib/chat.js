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
        /** @param {Client} client */
        server.on('connection', client => {
            // this.rooms.default.addClient(client);

            client.on('room.subscribe', roomId => {
                let room = this.rooms[roomId];
                if (room) {
                    room.addClient(client);
                    client.emit('subscribed');
                }
            });

            client.on('room.unsubscribe', roomId => {
                let room = this.rooms[roomId];
                if (room) {
                    room.removeClient(client);
                    client.emit('unsubscribed');
                }
            });

            client.on('new.message', msg => {
                this.broadcastTo('default', client, 'new.message', msg);
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