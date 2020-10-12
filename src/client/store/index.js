import createStore from 'unistore';

let initialState = {
    auth: { isLoggedIn: false },
    user: {},
    currentRoom: 'default',
    rooms: ['default'],
    messages: {},
};

const store = createStore(initialState);

export default store;
