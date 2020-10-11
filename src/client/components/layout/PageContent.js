import {h} from 'preact';
import ChatPage from '../pages/ChatPage';

export default () => {
    return (
        <div className="content bg-gray">
            <main className="page-content">
                <div className="container-fluid flex-fill">
                    <ChatPage />
                </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; Slackt 2020</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};