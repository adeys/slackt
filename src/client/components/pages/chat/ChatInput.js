import {h} from 'preact';
import {connect} from 'unistore/preact';

import {useWsClient} from "../../../hooks";

let timeout, isTyping = false;

const endTyping = (client, room) => {
    isTyping = false;
    client.isTypingIn(room, false);
};

const sendMsg = (e, room) => {
    e.preventDefault();
    let input = (new FormData(e.target)).get('message').trim();
    e.target.reset();

    if (input.length === 0) {
        return;
    }

    let client = useWsClient();

    clearTimeout(timeout);
    endTyping(client, room);
    client.sendTo(room, input);
};

function notifyTypingStatus(evt, room) {
    let client = useWsClient();

    if (!isTyping) {
        isTyping = true;
        client.isTypingIn(room, true);
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => endTyping(client, room), 1000);
}

const ChatInput = ({room}) => {
    return (
        <form method="POST" onSubmit={event => sendMsg(event, room)}>
            <div className="input-group input-group-sm">
                <input
                    type="text"
                    className="form-control"
                    name="message"
                    onKeyPress={evt => notifyTypingStatus(evt, room)} />
                <div className="input-group-append">
                    <button className="btn btn-success">
                        <i className="feather icon-navigation" />
                    </button>
                </div>
            </div>
        </form>
    )
};

export default connect((state) => ({room: state.currentRoom}), {})(ChatInput);