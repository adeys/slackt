import request from "../../utils/request";
import {useWsClient} from "../../hooks";

function addChannel(state, channel) {
    let client = useWsClient();
    client.subscribe(channel.id);
    return {rooms: [...state.rooms, channel]};
}

export async function createChannel(state, data) {
    let res = await request.post('/api/v1/channels', data);
    return addChannel(state, res.data);
}

export async function joinChannel(state, channel) {
    let res = await request.get(`/api/v1/channels/${channel.id}/join`);
    channel.members_count++;
    return addChannel(state, res.data);
}

export async function leaveChannel(state, channel) {
    await request.get(`/api/v1/channels/${channel.id}/leave`);
    channel.members_count--;

    let client = useWsClient();
    client.unsubscribe(channel.id);
    return {rooms: state.rooms.filter(room => room.id !== channel.id)};
}