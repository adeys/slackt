import createStore from 'unistore';

let initialState = {
    auth: {
        isLoggedIn: false,
    },
    user: {},
    messages: [],
};

const store = createStore(initialState);

export default store;
