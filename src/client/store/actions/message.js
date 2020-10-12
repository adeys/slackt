import store from '../index';

export function addMessage(payload) {
    let {room, message} = payload;
    let messages = {...store.getState().messages};
    if (!messages[room]) {
        messages[room] = [];
    }

    messages[room] = [...messages[room], message];
    store.setState({messages});
}