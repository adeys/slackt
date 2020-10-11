import createStore from 'unistore';

let initialState = {
    auth: {
        isLoggedIn: false,
    },
    user: {}
};

const store = createStore(initialState);

export default store;
