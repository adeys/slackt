import emitter from '../../utils/emitter';
import io from "../../../shared/ws/client";
import store from "../../store";
import {addMessage} from '../../store/actions/message';
import {addTypingUser, removeTypingUser} from "../../store/actions/room";

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

        this.socket.on('error', ({code, message}) => {
            console.error('Error : ', code, message);
        });

        this.socket.on('close', () => console.log('Connection closed'));

        this.socket.on('connection', () => {
            this.user = store.getState().user;
            this.authenticate();
        });

        this.socket.on('user.authenticated', (id) => {
            this.id = id;
            let {rooms} = store.getState();

            // Subscribe to all client rooms
            rooms.forEach(room => {
                this.subscribe(room);
            })
        });

        this.socket.on('room.user.joined', ({room, data}) => {
            store.action(addMessage)({room, message: {
                content: `${data.user.username} joined`,
                type: 'event'
            }});
        });

        this.socket.on('room.user.left', ({room, data}) => {
            store.action(addMessage)({room, message: {
                content: `${data.user.username} left`,
                type: 'event'
            }});
        });

        this.socket.on('user.typing.started', ({room, data}) => {
            store.action(addTypingUser)(room, data.user);
        });

        this.socket.on('user.typing.ended', ({room, data}) => {
            store.action(removeTypingUser)(room, data.user);
        });

        this.socket.on('new.message', ({room, data}) => {
            store.action(addMessage)({room, message: {...data, type: 'message'}});
        });
    }

    authenticate() {
        this.socket.emit('user.authentication', this.user.token);
    }

    isConnected() {
        return this.socket !== null;
    }

    sendTo(room, message) {
        if (!this.isConnected()) return;

        let msg = this._buildMessage(message);
        this.socket.to(room).emit('new.message', msg);

        store.action(addMessage)({room, message: {...msg, type: 'message'}});
    }

    subscribe(room) {
        this.socket.emit('room.subscribe', room);
    }

    unsubscribe(room) {
        this.socket.emit('room.unsubscribe', room);
    }

    isTypingIn(room, status) {
        let action = `typing.${!!status ? 'started' : 'ended'}`;
        this.socket.emit(action, {room, user: {username: this.user.username, avatar: this.user.avatar}});
    }

    _buildMessage(message) {
        let author = {username: this.user.username, avatar: this.user.avatar};
        return  {from: author, content: message};
    }
}
