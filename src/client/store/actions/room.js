import request from "../../utils/request";
import {useWsClient} from "../../hooks";
import store from "../index";

export async function fetchRooms(_) {
    let rooms = await request.get('/api/v1/rooms');
    let client = useWsClient();
    rooms.forEach(room => client.subscribe(room.id));
    return {
        rooms: rooms.map(room => {
            room.typingUsers = [];
            return room;
        })
    };
}

export function setActiveRoom(_, room) {
    return {currentRoom: room};
}

export function addTypingUser(state, room, user) {
    let map = {...state.typingUsers};
    let users = [...(map[room] || [])];

    users = Array.from(new Set(users.concat(user)));
    map[room] = users;

    return {typingUsers: map};
}

export function removeTypingUser(state, room, user) {
    let map = {...state.typingUsers};
    let users = [...(map[room] || [])];

    users = users.filter(item => item.username !== user.username);
    map[room] = users;

    return {typingUsers: map};
}