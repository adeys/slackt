import request from "../../utils/request";

export async function createChannel(state, data) {
    let res = await request.post('/api/v1/channels', data);
    return {rooms: [...state.rooms, res.data]};
}