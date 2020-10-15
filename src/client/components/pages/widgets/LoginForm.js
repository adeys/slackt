import {Component, h} from 'preact';

import Form from '../../elements/Form';
import request from '../../../utils/request';
import emitter from "../../../utils/emitter";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            isSyncing: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render({className}, {error, isSyncing}, context) {
        let errored = Object.keys(error).length !== 0;

        return (
            <div className={`mx-auto py-4 align-self-center ${className || ''}`}>
                <div className="mb-4 d-none d-md-block text-center">
                    <i className="feather icon-x2 text-info icon-unlock"/>
                </div>
                <h2 className="text-center">Login</h2>
                {errored ? (<div className="alert alert-danger small my-2">{error.message}</div>) : null}
                <Form className="mt-4" onSubmit={this.handleSubmit}>
                    <div className="form-group form">
                        <input
                            className={`form-control${errored ? ' is-invalid' : ''}`}
                            placeholder="Username"
                            type="text"
                            name="username"
                            id="si-username"
                            required={true}/>
                        {errored ? null : (<div className="invalid-feedback">Username cannot be empty</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            className={`form-control${errored ? ' is-invalid' : ''}`}
                            placeholder="Password"
                            type="password"
                            name="password"
                            id="si-password"
                            required={true} />
                        {errored ? null : (<div className="invalid-feedback">Password cannot be empty</div>)}
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-success mb-4" disabled={isSyncing} type="submit">
                            Login{isSyncing ? '...' : ''}
                        </button>
                        <p className="mb-2 text-muted">Forgot password? <a href="#">Reset password</a></p>
                    </div>
                </Form>
            </div>
        );
    }

    handleSubmit(event) {
        this.setState({isSyncing: true});
        let data = new FormData(event.target);

        request.post('/auth/login', {
            username: data.get('username'),
            password: data.get('password'),
        })
            .then(json => {
                if (json.error) {
                    this.setState({isSyncing: false, error: json.error});
                    return;
                }

                emitter.emit('login.success', {user: json.user});
                this.setState({isSyncing: false, error: {}});
                event.target.reset();
            });
    }
};