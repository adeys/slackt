import request from "../../utils/request";

export async function fetchRooms(_) {
    let rooms = await request.get('/api/v1/rooms');
    return {rooms};
}

export function setActiveRoom(_, room) {
    return {currentRoom: room};
}