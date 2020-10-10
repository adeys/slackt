import {h} from 'preact';
import {Link} from 'preact-router/match';

export default () => {
    return (
        <div className="sb-nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">
                            <div className="sb-nav-menu-icon"><i className="feather icon-shuffle"/></div>
                            Channels (2)
                            <div className="sb-nav-menu-icon nav-action" onClick={() => alert('Clicked')}>
                                <i className="feather font-weight-bold icon-plus"/>
                            </div>
                        </div>
                        <div className="sb-sidenav-menu-content">
                            <Link activeClassName="active" href="/dashboard" className="sb-sidenav-menu-item">
                                # React
                                <div className="badge badge-success ml-auto text-center">2</div>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>
    );
};