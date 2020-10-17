import createStore from 'unistore';

let initialState = {
    auth: { isLoggedIn: false },
    user: {},
    currentRoom: null,
    rooms: [],
    messages: {},
};

const store = createStore(initialState);

export default store;
