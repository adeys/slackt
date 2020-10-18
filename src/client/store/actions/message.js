export function addMessage(state, payload) {
    let {room, message} = payload;
    let messages = {...state.messages};
    if (!messages[room]) {
        messages[room] = [];
    }

    messages[room] = [...messages[room], message];
    return {messages};
}