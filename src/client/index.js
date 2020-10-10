import 'preact/devtools';
import {h, hydrate} from 'preact';
import App from './App';

import './scss/index.scss';

hydrate(<App url={document.location.pathname} />, document.querySelector('#app'));