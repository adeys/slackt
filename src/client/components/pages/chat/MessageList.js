import {createRef, h} from 'preact';
import {useEffect} from "preact/hooks";
import {connect} from 'unistore/preact';

import ChatMessage from "./ChatMessage";

const ChatEvent = ({content}) => (
    <div className="chat-event">
        <div className="chat-event-content">{content}</div>
    </div>
);

const MessageList = ({messages, user}) => {
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
            </div>
        </div>
    );
};

export default connect((state) => ({
    user: state.user.username,
}), {})(MessageList);
