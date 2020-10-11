import mitt from 'mitt';
import {route} from "preact-router";
import store from "../store";
import getStorage from "./storage";

let emitter = mitt();

emitter.on('login.success', ({user}) => {
    store.setState({user: user, auth: {isLoggedIn: true}});
    getStorage().setItem('slackt.state', JSON.stringify(store.getState()));

    route('/dashboard');
    emitter.emit('trigger.ws.connect');
});

export default emitter;