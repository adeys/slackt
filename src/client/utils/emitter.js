import mitt from 'mitt';
import {route} from "preact-router";
import store from "../store";
import getStorage from "./storage";

let emitter = mitt();

emitter.on('login.success', ({user}) => {
    let state = {user: user, auth: {isLoggedIn: true}};
    store.setState(state);
    getStorage().setItem('slackt.user', JSON.stringify(state));

    route('/dashboard');

    // Trigger web sockets connection after 20s in order to wait for token active time
    setTimeout(() => emitter.emit('trigger.ws.connect'), 20000);
});

export default emitter;