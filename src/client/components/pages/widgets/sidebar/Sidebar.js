import {h} from 'preact';
import {useEffect} from "preact/hooks";
import {connect} from 'unistore/preact';
import store from "../../../../store";
import {fetchRooms} from "../../../../store/actions/room";
import Section from "./Section";

const Sidebar = ({rooms, fetchRooms}) => {
    useEffect(() => {
        fetchRooms();
    }, []);

    let channels = rooms.filter(room => room.scope === 'public');
    let chats = rooms.filter(room => room.scope === 'private');

    return (
        <div className="sb-nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <Section
                            section={{title: 'Channels', count: channels.length}}
                            data={channels}
                            isChannel={true} />
                        {chats.length !== 0
                            ? (<Section
                                section={{title: 'Chats', count: chats.length}}
                                data={chats}
                                isChannel={false} />)
                            : null
                        }
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    {store.getState().user.username}
                </div>
            </nav>
        </div>
    );
};

export default connect((state) => ({rooms: state.rooms}), {fetchRooms})(Sidebar);