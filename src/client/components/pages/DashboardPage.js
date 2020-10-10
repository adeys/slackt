import {h} from 'preact';

import Sidebar from './widgets/sidebar/Sidebar';
import Header from './widgets/Header';
import PageContent from './widgets/PageContent';

export default () => {
    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layout-sidenav">
                <Sidebar />
                <PageContent />
            </div>
        </div>
    );
}