import {WebSocketClient} from './service/ws/client.service';

// Initialize ws client
const WS_BASE = `${location.protocol}//${location.host}`;
export default new WebSocketClient(WS_BASE);