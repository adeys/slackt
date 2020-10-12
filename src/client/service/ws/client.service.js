import emitter from '../../utils/emitter';
import io from "../../../shared/ws/client";
import store from "../../store";
import {addMessage} from '../../store/actions/message';

export class WebSocketClient {
    constructor(baseUrl) {
        this.socket = null;
        this.id = null;
        this.baseUrl = baseUrl;
        this.user = null;

        emitter.on('trigger.ws.connect', () => {
            this.connect();
        });

    }

    connect() {
        if (!this.isConnected()) {
            this.socket = io();
            this.socket.connect(this.baseUrl);
        }

        this.socket.on('connect', (id) => {
            this.id = id;
            let {user, rooms} = store.getState();
            this.user = user;

            // Subscribe to all client rooms
            rooms.forEach(room => {
                this.subscribe(room);
            })
        });

        this.socket.on('new.message', ({room, data}) => {
            addMessage({room, message: data});
        });
    }

    isConnected() {
        return this.socket !== null;
    }

    sendTo(room, message) {
        if (!this.isConnected()) return;

        let msg = this._buildMessage(message);
        this.socket
            .to(room)
            .emit('new.message', msg);

        addMessage({room, message: msg});
    }

    subscribe(room) {
        this.socket.emit('room.subscribe', room);
    }

    _buildMessage(message) {
        let author = {username: this.user.username, avatar: this.user.avatar};
        return  {from: author, content: message};
    }
}
