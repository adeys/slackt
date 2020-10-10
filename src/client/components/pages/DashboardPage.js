import {h} from 'preact';
import {useState} from "preact/hooks";

import Sidebar from './widgets/sidebar/Sidebar';
import Header from './widgets/Header';
import PageContent from './widgets/PageContent';

export default () => {
    let [navToggled, setNavToggled] = useState(false);

    return (
        <div className={"sb-nav-fixed" + (navToggled ? ' sb-sidenav-toggled' : '')}>
            <Header onToggleNav={() => setNavToggled(!navToggled)} />
            <div id="layout-sidenav">
                <Sidebar />
                <PageContent />
            </div>
        </div>
    );
}