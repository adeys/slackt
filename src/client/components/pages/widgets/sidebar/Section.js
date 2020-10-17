import {Fragment, h} from 'preact';
import {Link} from "preact-router/match";

export default ({section, data, isChannel}) => {
    return (
        <Fragment>
            <div className="sb-sidenav-menu-heading">
                <div className="sb-nav-menu-icon"><i className="feather icon-shuffle"/></div>
                {section.title} ({section.count})
                <div className="sb-nav-menu-icon nav-action" onClick={() => alert('Clicked')}>
                    <i className="feather font-weight-bold icon-plus"/>
                </div>
            </div>
            <div className="sb-sidenav-menu-content">
                {data.map(item => (
                    <Link activeClassName="active" href={`/room/${item.id}`} className="sb-sidenav-menu-item">
                        {isChannel ? '#' : '@'} {item.name}
                        <div className="badge badge-success ml-auto text-center">{item.unread_messages}</div>
                    </Link>
                ))}
            </div>
        </Fragment>
    );
}