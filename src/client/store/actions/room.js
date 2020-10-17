import store from "../index";

export function setRooms(_, rooms) {
    store.setState({rooms});
}

export function addRoom(state, room) {
    store.setState({rooms: [...state.rooms, room]});
}