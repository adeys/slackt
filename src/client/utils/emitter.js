import mitt from 'mitt';
import store from "../store";
import {route} from "preact-router";

let emitter = mitt();

emitter.on('login.success', ({token}) => {
    store.setState({user: {token: token}});
    route('/dashboard');
});

export default emitter;