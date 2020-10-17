import request from "../../utils/request";
import {useWsClient} from "../../hooks";

export async function createChannel(state, data) {
    let res = await request.post('/api/v1/channels', data);
    let client = useWsClient();
    client.subscribe(res.data.id);
    return {rooms: [...state.rooms, res.data]};
}