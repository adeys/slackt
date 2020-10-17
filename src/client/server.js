import {h} from 'preact';
import {Provider} from 'unistore/preact';

import App from './App';
import store from './store';
import WebSocketProvider from "./context/ws-context";
import {WebSocketClient} from "./service/ws/client.service";

export default ({url}) => (
    <Provider store={store}>
        <WebSocketProvider client={new WebSocketClient(null)}>
            <App url={url} />
        </WebSocketProvider>
    </Provider>
);