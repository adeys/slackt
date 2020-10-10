import 'preact/devtools';
import devtools from "unistore/devtools";
import {h, hydrate} from 'preact';
import {Provider} from 'unistore/preact';

import App from './App';
import store from './store';

import './scss/index.scss';

hydrate((
    <Provider store={process.env.NODE_ENV !== 'production' ? devtools(store) : store}>
        <App url={document.location.pathname} />
    </Provider>
), document.querySelector('#app'));