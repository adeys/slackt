import 'preact/devtools';
import {h, hydrate} from 'preact';
import {Provider} from 'unistore/preact';

import AppRoot from './App';
import WebSocketProvider from './context/ws-context';
import client from './ws'; // Ensure correct events listening trigger
import store from './store/initStore';

import './scss/index.scss';

const App = ({url}) => {
    return (
        <Provider store={store}>
            <WebSocketProvider client={client}>
                <AppRoot url={url} />
            </WebSocketProvider>
        </Provider>
    );
};

hydrate(<App url={document.location.pathname} />, document.querySelector('#app'));