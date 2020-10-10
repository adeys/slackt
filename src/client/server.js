import {h} from 'preact';
import {Provider} from 'unistore/preact';

import App from './App';
import store from './store';

export default ({url}) => (
    <Provider store={store}>
        <App url={url} />
    </Provider>
);