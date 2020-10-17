import {h} from 'preact';
import {getCurrentUrl} from "preact-router";

export default ({children, ...props}) => {
    let url = props.href || props.path;

    return (
        <a {...props} href={url} className={[props.className || '', getCurrentUrl() === url ? 'active' : ''].join(' ')}>
            {children}
        </a>
    )
}