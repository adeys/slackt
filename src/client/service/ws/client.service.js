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
            this.user = store.getState().user;
        });

        this.socket.on('new.message', (payload) => {
            addMessage(payload);
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

        addMessage(msg);
    }

    _buildMessage(message) {
        let author = {username: this.user.username, avatar: this.user.avatar};
        return  {from: author, content: message};
    }
}
