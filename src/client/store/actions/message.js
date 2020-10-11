import store from '../index';

export function addMessage(payload) {
    let {messages} = store.getState();
    store.setState({messages: [...messages, payload]});
}