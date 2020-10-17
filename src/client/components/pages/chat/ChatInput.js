import {h} from 'preact';
import {useState} from "preact/hooks";

import {useWsClient} from "../../../hooks";
import store from "../../../store";

const onSubmit = (e, input, wsClient) => {
    e.preventDefault();
    input = input.trim();
    e.target.reset();

    if (input.length === 0) {
        return;
    }

    wsClient.sendTo(store.getState().currentRoom, input);
};

export default () => {
    const [msg, setMsg] = useState('');
    const client = useWsClient();

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