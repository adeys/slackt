import { h } from 'preact';
import Router, {route} from 'preact-router';

import AuthPage from './components/pages/AuthPage';
import DashboardPage from './components/pages/DashboardPage';

let isAuthed = false;

const onRouteChange = (e) => {
    if (e.url === '/login' && isAuthed) {
        route('/', true);
        return;
    }

    if (e.url !== '/login' && !isAuthed) {
        route('/login', true);
    }
};

const App = ({url}) => {
    return (
        <Router url={url} onChange={onRouteChange}>
            <DashboardPage path="/" />
            <AuthPage path="/login" />
        </Router>
    );
};

export default App;