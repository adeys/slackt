import {Component, Fragment, h} from 'preact';
import {Link} from "preact-router/match";
import {Modal, ModalBody} from "reactstrap";
import {connect} from 'unistore/preact';
import Form from "../../../elements/Form";
import {createChannel} from "../../../../store/actions/channel";

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedModal: false,
            isLoading: false,
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }

    renderModal() {
        let {openedModal, isLoading, errors} = this.state;

        return (
            <Modal fade={true} isOpen={openedModal} centered={true} size='lg' contentClassName="bg-transparent border-0">
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-text">
                                    <span>Name of Channel</span>
                                </div>
                                <input
                                    type="text"
                                    className={`form-control${errors.name ? ' is-invalid' : ''}`}
                                    name="name" id="name" required={true}/>
                                {errors.name && (<div className="invalid-tooltip">{errors.name}</div>)}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-text">
                                    <span>About the Channel</span>
                                </div>
                                <input
                                    type="text"
                                    className={`form-control${errors.about ? ' is-invalid' : ''}`}
                                    name="about" id="about"/>
                                {errors.about && (
                                    <div className="invalid-tooltip">
                                        {errors.about.replace('The about', 'This')}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-group text-right mt-4">
                            <button className="btn btn-success mr-2" disabled={isLoading}>
                                <i className="feather icon-check mr-1" /> Add {isLoading && <span className="spinner-grow-sm ml-1" />}
                            </button>
                            <button className="btn btn-danger" onClick={() => this.setState({openedModal: false})} disabled={isLoading}>
                                <i className="feather icon-x mr-1" /> Cancel
                            </button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }

    render({section, data, isChannel}, {openedModal, isLoading}, context) {
        return (
            <Fragment>
                <div className="sb-sidenav-menu-heading">
                    <div className="sb-nav-menu-icon"><i className="feather icon-shuffle"/></div>
                    {section.title} ({section.count})
                    <div className="sb-nav-menu-icon nav-action" onClick={() => this.setState({openedModal: true})}>
                        <i className="feather font-weight-bold icon-plus"/>
                    </div>
                </div>
                <div className="sb-sidenav-menu-content">
                    {data.map(item => (
                        <Link
                            activeClassName="active"
                            href={`/room/${item.id}`}
                            className="sb-sidenav-menu-item">
                            {isChannel ? '#' : '@'} {item.name}
                            {item.unread_messages === 0
                                ? null
                                : (
                                    <div className="badge badge-success ml-auto text-center">
                                        {item.unread_messages}
                                    </div>
                                )
                            }
                        </Link>
                    ))}
                </div>
                {!isChannel ? null : this.renderModal()}
            </Fragment>
        );
    }

    handleSubmit(event) {
        this.setState({isLoading: true});

        let data = new FormData(event.target);
        if (data.get('name').trim() === '') {
            event.target.querySelector('#name').setCustomValidity('invalid');
            return;
        }

        this.props.createChannel({name: data.get('name'), about: data.get('about') || ''})
            .then(() => this.setState({openedModal: false, isLoading: false, errors: {}}))
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false, errors: err.data || {}});
            });
    }
}

export default connect([], {createChannel})(Section);