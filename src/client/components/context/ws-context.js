import {createContext, h} from 'preact';

export const WebSocketContext = createContext(null);

export default ({children, client}) => {
    return (
        <WebSocketContext.Provider value={client}>
            {children}
        </WebSocketContext.Provider>
    )
}