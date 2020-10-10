import {h} from 'preact';

import Dropdown from '../../elements/Dropdown';

export default ({onToggleNav}) => {
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <button className="btn btn-sm text-white mx-2" onClick={onToggleNav} id="sidebarToggle">
                <i className="feather icon-x2 icon-menu"/>
            </button>
            <a className="navbar-brand" href="/">Slackt</a>
            <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search"
                           aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <i className="feather icon-search"/>
                        </button>
                    </div>
                </div>
            </form>
            <ul className="navbar-nav ml-auto ml-md-0">
                <Dropdown className="nav-item">
                    <Dropdown.Toggle id="drop" className="btn btn-link nav-link">
                        <i className="feather icon-user" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu tag="li">
                        <Dropdown.Item href="#">Settings</Dropdown.Item>
                        <Dropdown.Item href="#">Activity Log</Dropdown.Item>
                        <Dropdown.Item divider={true} />
                        <Dropdown.Item href="#">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ul>
        </nav>
    )
};