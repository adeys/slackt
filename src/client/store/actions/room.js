import request from "../../utils/request";
import {useWsClient} from "../../hooks";

export async function fetchRooms(_) {
    let rooms = await request.get('/api/v1/rooms');
    let client = useWsClient();
    rooms.forEach(room => client.subscribe(room.id));
    return {rooms};
}

export function setActiveRoom(_, room) {
    return {currentRoom: room};
}