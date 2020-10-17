import {h} from 'preact';
import {useEffect, useState} from "preact/hooks";
import {connect} from 'unistore/preact';
import Spinner from "../elements/Spinner";
import request from "../../utils/request";
import {joinChannel, leaveChannel} from "../../store/actions/channel";

export function fetchChannels() {
    return request.get('/api/v1/channels');
}

const Component = ({data: channel, isMember, joinChannel, leaveChannel}) => {
    let [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        (isMember ? leaveChannel : joinChannel)(channel)
            .then(() => setLoading(false));
    };

    return (
        <div className="result-item">
            <div className="mr-auto">
                <h5 className="title mb-1">{channel.name}</h5>
                <span className="text-muted card-subtitle">Members : {channel.members_count}</span>
            </div>
            <div className="ml-2 p-1">
                {isMember
                    ? (
                        <button onClick={handleClick} disabled={loading} className="btn btn-sm btn-danger align-self-center">
                            Leave {loading ? <span className="ml-1 spinner-border-sm"/> : null}
                        </button>
                    )
                    : (
                        <button onClick={handleClick} disabled={loading} className="btn btn-sm btn-success align-self-center">
                            Join {loading ? <span className="ml-1 spinner-border-sm" /> : null}
                        </button>
                    )
                }
            </div>
        </div>
    );
};

const ListItem = connect([], {joinChannel, leaveChannel})(Component);

const Page = ({rooms}) => {
    let [channels, setChannels] = useState([]);
    let [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (!fetched) {
            fetchChannels()
                .then(res => {
                    setFetched(true);
                    setChannels(res);
                });
        }
    }, []);

    return (
        <div className="d-flex flex-column py-3">
            <div className="card">
                <div className="card-header d-flex flex-column flex-sm-row py-2 px-3">
                    <h4 className="card-title font-weight-bold mb-1">Browse channels</h4>
                </div>
            </div>
            <div className="card-body search-result">
                <div className="scrollbar h-100">
                    {fetched
                        ? channels.map(channel => (
                            <ListItem data={channel} isMember={rooms.includes(channel.id)} key={channel.id} />
                            ))
                        : <Spinner/>
                    }
                </div>
            </div>
        </div>
    )
};

export default connect((state) => ({rooms: state.rooms.map(room => room.id)}), {})(Page);