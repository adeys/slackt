import {h} from 'preact';
import {connect} from 'unistore/preact';
import {MessageList, ChatInput} from './chat';
import {useEffect} from "preact/hooks";
import {markAsRead} from "../../store/actions/message";

const ChatPage = ({channel, rooms, messages, markAsRead}) => {
    useEffect(() => {
        markAsRead(channel.id);
    }, [channel, rooms.length]); // Run only when the channel or the rooms length changes

    channel = rooms.find(room => room.id === channel) || {id: null, attributes: {}};
    return (
        <div className="d-flex flex-column h-100">
            <div className="my-3 d-flex flex-column flex-sm-row h-100">
                {/* Chat Data */}
                <div className="col-12 col-sm-9">
                    {/* Header */}
                    <div className="card">
                        <div className="card-header d-flex flex-column flex-sm-row py-2 px-3">
                            <div>
                                <h4 className="card-title font-weight-bold mb-1">#{channel.name}</h4>
                                <div className="text-muted card-subtitle">{channel.attributes.members_count} users</div>
                            </div>
                            <div className="form-inline mt-1 ml-sm-auto mt-sm-0">
                                <div className="input-group">
                                    <div className="input-group input-group-sm">
                                        <input
                                            className="form-control"
                                            placeholder="Search messages"
                                            type="search" name="search"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-dark">
                                                <i className="feather icon-search" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Messages List */}
                    <MessageList messages={messages} />

                    {/* Message Input */}
                    <div className="mt-3 p-2 col-12 bg-light">
                        <ChatInput />
                    </div>
                </div>
                {/* Chat Details */}
                <div className="col-12 col-sm-3 d-none d-sm-block">
                    <div className="card">
                        <div className="card-header">
                            About {channel.name}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="font-weight-bold small">
                                    <i className="feather icon-info mr-2" />
                                    Channel Details
                                </span>
                            </li>
                            <li className="list-group-item">
                                <span className="font-weight-bold small">
                                    <i className="feather icon-users mr-2" />
                                    Top Posters
                                </span>
                            </li>
                            <li className="list-group-item">
                                <span className="font-weight-bold small">
                                    <i className="feather icon-edit-1 mr-2" />
                                    Created by
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default connect(state => ({
    channel: state.currentRoom,
    rooms: state.rooms,
    messages: state.currentRoom ? state.messages[state.currentRoom] : []
}), {markAsRead})(ChatPage);