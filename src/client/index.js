import 'preact/devtools';
import devtools from "unistore/devtools";
import {h, hydrate} from 'preact';
import {Provider} from 'unistore/preact';

import AppRoot from './App';
import rootStore from './store';

import './scss/index.scss';

// Initialize store
let store = process.env.NODE_ENV !== 'production' ? devtools(rootStore) : rootStore;

let state = localStorage.getItem('slackt.state');

if (state) {
    store.setState(JSON.parse(state));
}

const App = ({url}) => {
    return (
        <Provider store={store}>
            <AppRoot url={url} />
        </Provider>
    );
};

hydrate(<App url={document.location.pathname} />, document.querySelector('#app'));