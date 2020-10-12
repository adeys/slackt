import emitter from '../../utils/emitter';
import io from "../../../shared/ws/client";
import store from "../../store";
import {addMessage} from '../../store/actions/message';

export class WebSocketClient {
    constructor(baseUrl) {
        this.socket = null;
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

        this.socket.on('connect', () => this.user = store.getState().user);
        this.socket.on('new.message', (payload) => {
            addMessage(payload);
        });
    }

    isConnected() {
        return this.socket !== null;
    }

    sendMessage(message) {
        if (!this.isConnected()) return;

        let author = {username: this.user.username, avatar: this.user.avatar};
        let msg = {from: author, content: message};
        this.socket.emit('new.message', msg);
        addMessage(msg)
    }
}
