import {h} from 'preact';
import {useContext, useState} from "preact/hooks";

import {WebSocketContext} from "../../context/ws-context";

const onSubmit = (e, input, wsClient) => {
    e.preventDefault();
    input = input.trim();
    e.target.reset();

    if (input.length === 0) {
        return;
    }

    wsClient.sendMessage(input);
    console.log(input);
};

export default () => {
    const [msg, setMsg] = useState('');
    const client = useContext(WebSocketContext);

    return (
        <form method="POST" onSubmit={event => onSubmit(event, msg, client)}>
            <div className="input-group input-group-sm">
                <input type="text" className="form-control" onChange={event => setMsg(event.target.value)}/>
                <div className="input-group-append">
                    <button className="btn btn-success">
                        <i className="feather icon-navigation" />
                    </button>
                </div>
            </div>
        </form>
    )
};