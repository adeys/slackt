import {h} from 'preact';

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
                            <a href="#" className="sb-sidenav-menu-item">
                                # React
                                <div className="badge badge-success ml-auto text-center">2</div>
                            </a>
                            <a href="#" className="sb-sidenav-menu-item">
                                # React
                                <div className="badge badge-success ml-auto text-center">2</div>
                            </a>
                            <a href="#" className="sb-sidenav-menu-item active">
                                # React
                                <div className="badge badge-success ml-auto text-center">2</div>
                            </a>
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