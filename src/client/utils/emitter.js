import mitt from 'mitt';
import store from "../store";
import {route} from "preact-router";

let emitter = mitt();

emitter.on('login.success', ({user}) => {
    store.setState({user: user, auth: {isLoggedIn: true}});
    localStorage.setItem('slackt.state', JSON.stringify(store.getState()));
    route('/dashboard');
});

export default emitter;