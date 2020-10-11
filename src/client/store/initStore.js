import devtools from "unistore/devtools";
import rootStore from "./index";
import emitter from "../utils/emitter";

let store = process.env.NODE_ENV !== 'production' ? devtools(rootStore) : rootStore;

let state = localStorage.getItem('slackt.state');

if (state) {
    store.setState(JSON.parse(state));
    if (store.getState().auth.isLoggedIn) {
        emitter.emit('trigger.ws.connect');
    }
}

export default store;