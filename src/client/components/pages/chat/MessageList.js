import {h} from 'preact';
import {connect} from 'unistore/preact';

import ChatMessage from "./ChatMessage";

const List = ({messages, user}) => {
    return (
        <div className="card-body chat-list">
            <div className="scrollbar h-100">
                {messages.map((msg, idx) =>
                    <ChatMessage
                        key={idx}
                        author={msg.from}
                        content={msg.content}
                        isMine={user === msg.from.username} />
                        )
                }
            </div>
        </div>
    );
};

export default connect((state) => ({messages: state.messages, user: state.user.username}))(List);
