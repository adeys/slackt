import { h } from 'preact';
import Router, {route} from 'preact-router';

import AuthPage from './components/pages/AuthPage';
import DashboardPage from './components/pages/DashboardPage';

import store from './store';

const isLoggedIn = () => store.getState().user.token !== null;

const onRouteChange = (e) => {
    if (e.url === '/login' && isLoggedIn()) {
        route('/dashboard', true);
        return;
    }

    if (e.url !== '/login' && !isLoggedIn()) {
        route('/login', true);
    }
};

const Redirect = ({path, to}) => {
    route(to, true);
    return null;
};

const App = ({url}) => {
    return (
        <Router url={url} onChange={onRouteChange}>
            <Redirect path="/" to="/dashboard" />
            <AuthPage path="/login" />
            <DashboardPage path="/dashboard" />
        </Router>
    );
};

export default App;