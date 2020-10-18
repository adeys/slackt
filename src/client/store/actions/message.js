export function addMessage(state, payload) {
    let {room, message} = payload;
    let messages = {...state.messages};
    if (!messages[room]) {
        messages[room] = [];
    }

    messages[room] = [...messages[room], message];
    let update =  {messages};

    if (state.currentRoom !== room) {
        let rooms = [...state.rooms];
        rooms.find(item => item.id === room).unread_messages++;
        update.rooms = rooms;
    }

    return update;
}

export function markAsRead(state, roomId) {
    let rooms = [...state.rooms];
    let idx = rooms.findIndex(item => item.id === roomId);

    if (idx !== -1 ) {
        rooms[idx].unread_messages = 0;
        return {rooms};
    }

    return {};
}