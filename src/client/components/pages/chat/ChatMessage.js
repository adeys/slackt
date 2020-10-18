import {h} from 'preact';
import {useEffect, useState} from "preact/hooks";
import TimeAgo from "react-timeago";

const Img = ({src, alt}) => {
    let [isMounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return isMounted
        ? <img src={src} alt={alt} />
        : <div className="spinner-grow spinner-grow-sm text-secondary"/>;
};

const timeFormatter = (_, unit, suffix, __, next) => unit === 'second'
    ? `a few seconds ${suffix}`
    : next();

export default ({author, content, isSent}) => {
    return (
        <div className="chat-item">
            <div className="avatar rounded-circle">
                <Img src={author.avatar} alt={"@" + author.username} />
            </div>
            <div className={"chat-message" + (isSent ? ' sent' : '')}>
                <div className="msg-author small">
                    <span className="font-weight-bold mr-2">{author.username}</span>
                    <TimeAgo className="text-muted" formatter={timeFormatter} minPeriod={60} date={Date.now()} />
                    {/*<span className="text-muted">3 minutes ago</span>*/}
                </div>
                <div className="msg-content">
                    {content}
                </div>
            </div>
        </div>
    );
};