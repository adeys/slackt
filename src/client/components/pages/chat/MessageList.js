import {createRef, h} from 'preact';
import {useEffect} from "preact/hooks";
import {connect} from 'unistore/preact';

import ChatMessage from "./ChatMessage";

const ChatEvent = ({content}) => (
    <div className="chat-event">
        <div className="chat-event-content">{content}</div>
    </div>
);

const TypingIndicator = ({user}) => (
    <div className="mx-2 d-inline-flex">
        <div className="font-weight-bold small font-italic mr-2 align-self-center">
            {user} is typing
        </div>
        <div className="typing-indicator">
            <span className="typing-dot"/>
            <span className="typing-dot"/>
            <span className="typing-dot"/>
        </div>
    </div>
);

const MessageList = ({messages, user, typings}) => {
    let ref = createRef();

    useEffect(() => {
        if (ref.current) {
            let box = ref.current;
            box.scrollTo({behavior: 'smooth', top: box.scrollHeight});
        }
    }, [ref]);

    return (
        <div className="card-body chat-list">
            <div ref={ref} className="scrollbar h-100">
                {(messages || []).map((msg, idx) => msg.type === 'event'
                    ? <ChatEvent content={msg.content} />
                    : <ChatMessage
                        key={idx}
                        author={msg.from}
                        content={msg.content}
                        isSent={user === msg.from.username} />
                )}
                {(typings || []).map(({username}) => (<TypingIndicator user={username} />))}
            </div>
        </div>
    );
};

export default connect((state) => ({
    user: state.user.username,
    typings: state.typingUsers[state.currentRoom]
}), {})(MessageList);
