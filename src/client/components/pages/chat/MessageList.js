import {createRef, h} from 'preact';
import {useEffect} from "preact/hooks";
import {connect} from 'unistore/preact';

import ChatMessage from "./ChatMessage";

const List = ({messages, user}) => {
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
