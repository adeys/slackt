import {h} from 'preact';
import Router from "preact-router";
import Match from "preact-router/match";
import {connect} from 'unistore/preact';
import ChatPage from '../pages/ChatPage';
import {setActiveRoom} from '../../store/actions/room';


const EmptyChat = () => (
    <div className="d-flex h-100 justify-content-center text-center align-items-center">
        Let's chat
    </div>
);

const Content = ({currentRoom, setActiveRoom}) => {
    return (
        <div className="content bg-gray">
            <main className="page-content">
                <div className="container-fluid flex-fill">
                    <Match path="/room/:id">
                        {({matches, ...props}) => {
                            if (matches) {
                                let id = Router.exec(props.url, '/room/:id', {}).id;
                                if (currentRoom !== id) {
                                    setActiveRoom(id);
                                }
                            }
                        }}
                    </Match>
                    <Router>
                        <EmptyChat path="/dashboard" />
                        <ChatPage path="/room/:id" />
                    </Router>
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

export default connect(['currentRoom'], {setActiveRoom})(Content);