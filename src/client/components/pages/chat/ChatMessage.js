import {h} from 'preact';
import {useEffect, useState} from "preact/hooks";

const Img = ({src, alt}) => {
    let [isMounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return isMounted
        ? <img src={src} alt={alt} />
        : <div className="spinner-grow spinner-grow-sm text-secondary"/>;
};

export default ({author, content, isMine: isSent}) => {
    return (
        <div className="chat-item">
            <div className="avatar rounded-circle">
                <Img src={author.avatar} alt={"@" + author.username} />
            </div>
            <div className={"chat-message" + (isSent ? ' sent' : '')}>
                <div className="msg-author small">
                    <span className="font-weight-bold mr-2">{author.username}</span>
                    <span className="text-muted">3 minutes ago</span>
                </div>
                <div className="msg-content">
                    {content}
                </div>
            </div>
        </div>
    );
};