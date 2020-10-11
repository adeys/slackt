import {h} from 'preact';
import {useState} from "preact/hooks";

import Sidebar from '../pages/widgets/sidebar/Sidebar';
import Header from '../pages/widgets/Header';
import PageContent from './PageContent';

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