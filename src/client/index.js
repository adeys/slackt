import 'preact/devtools';
import {h, hydrate} from 'preact';
import App from './App';

import './scss/index.scss';

hydrate(<App />, document.querySelector('#app'));