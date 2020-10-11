import {h} from 'preact';

const ChatItem = () => {
    return (
        <div className="chat-item">
            <div className="avatar rounded-circle">
                <img src="#" alt="_alt"/>
            </div>
            <div className="chat-message">
                <div className="msg-author small">
                    <span className="font-weight-bold mr-2">adeys</span>
                    <span className="text-muted">3 minutes ago</span>
                </div>
                <div className="msg-content">
                    {'Hello there '.repeat(25)}
                </div>
            </div>
        </div>
    );
};

export default () => {
    return (
        <div className="d-flex flex-column h-100">
            <div className="my-3 d-flex flex-column flex-sm-row h-100">
                {/* Chat Data */}
                <div className="col-12 col-sm-9">
                    {/* Header */}
                    <div className="card">
                        <div className="card-header d-flex flex-column flex-sm-row py-2 px-3">
                            <div>
                                <h4 className="card-title font-weight-bold mb-1">#React</h4>
                                <div className="text-muted card-subtitle">3 users</div>
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
                    <div className="card-body chat-list">
                        {new Array(10).fill('name').map((i) => <ChatItem key={i} />)}
                    </div>

                    {/* Message Input */}
                    <div className="mt-3 p-2 col-12 bg-light">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control"/>
                            <div className="input-group-append">
                                <button className="btn btn-success">
                                    <i className="feather icon-navigation" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Chat Details */}
                <div className="col-12 col-sm-3 d-none d-sm-block">
                    <div className="card">
                        <div className="card-header">
                            About React
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