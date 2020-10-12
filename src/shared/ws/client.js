import mitt from "mitt";

const EVENT_TYPE = {
    EMIT: 'emit',
    BROADCAST: 'broadcast'
};

class Client {
    /**
     * @property {boolean} connected
     * @property {window.WebSocket} socket
     * @property {Array} queue
     * @property {Emitter} emitter
     */
    constructor() {
        this.id = null;
        this.connected = false;
        this.socket = null;
        this.queue = [];
        this.emitter = mitt();

        this.type = EVENT_TYPE.EMIT;
        this.targetRoom = null;
    }

    connect(url) {
        let parts = new URL(url || location.href);
        this.socket = new WebSocket([
            parts.protocol.replace('http', 'ws'),
            '//',
            parts.host,
        ].join(''));

        this.configureSocket();
        return this;
    }

    configureSocket() {
        this.socket.onopen = event => {
            this.emit('connect');
            this.connected = true;

            while (this.queue.length) {
                this.socket.send(this.queue.shift());
            }
        };

        this.socket.onmessage = event => {
            let info = JSON.parse(event.data);
            if (info.type === 'connect') {
                this.id = info.data;
                this.emitter.emit('connect');
            }

            this.emitter.emit(info.type, info.data || null);
        };

        this.socket.onerror = error => {
            this.emitter.emit('error', error);
        };

        this.socket.onclose = event => {
            this.socket = null;
            this.emitter.emit('close');
        };
    }

    close() {
        if (this.socket) this.socket.close();
        return this;
    }

    to(room) {
        this.type = EVENT_TYPE.BROADCAST;
        this.targetRoom = room;

        return this;
    }

    emit(type, data = null) {
        let payload = this.type === EVENT_TYPE.BROADCAST
            ? {
                type: 'room.broadcast',
                data: {
                    room: this.targetRoom,
                    event: {type, payload: data}
                }
            }
            : {type, data};

        let json = JSON.stringify(payload);
        this.connected ? this.socket.send(json) : this.queue.push(json);

        // Reset
        this.type = EVENT_TYPE.EMIT;
        this.targetRoom = null;

        return this;
    }

    on(type, callback) {
        this.emitter.on(type, callback);
        return this;
    }

    off(type, callback) {
        this.emitter.off(type, callback);
        return this;
    }

    send(data) {
        return this.emit('message', data);
    }
}

export default () => new Client();