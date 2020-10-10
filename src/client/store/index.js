import createStore from 'unistore';

let initialState = {
    user: {
        token: null
    }
};

export default createStore(initialState);
