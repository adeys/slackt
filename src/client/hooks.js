import {useContext} from "preact/hooks";
import {WebSocketContext} from "./context/ws-context";

export function useWsClient() {
    return useContext(WebSocketContext);
}