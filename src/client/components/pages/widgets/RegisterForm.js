import {Component, h} from 'preact';
import Form from '../../elements/Form';
import request from '../../../utils/request';
import {route} from "preact-router";

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isSyncing: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(props, {errors, isSyncing}, context) {
        return (
            <div className={`mx-auto py-4 align-self-center ${props.className || ''}`}>
                <div className="mb-4 d-none d-md-block text-center">
                    <i className="feather icon-x2 text-info icon-user-plus"/>
                </div>
                <h2 className="text-center">Sign Up</h2>
                <Form className="mt-4" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            className={`form-control${errors.username ? ' is-invalid' : ''}`}
                            placeholder="Username"
                            type="text"
                            name="username"
                            id="su-username"
                            required={true} />
                        <div className="invalid-feedback">{errors.username || 'Username cannot be empty'}</div>
                    </div>
                    <div className="form-group">
                        <input className={`form-control${errors.email ? ' is-invalid' : ''}`}
                               placeholder="Email"
                               type="email"
                               name="email"
                               id="email"
                               required={true} />
                        <div className="invalid-feedback">{errors.email || 'Email cannot be empty'}</div>
                    </div>
                    <div className="form-group">
                        <input className={`form-control${errors.password ? ' is-invalid' : ''}`}
                               placeholder="Password"
                               type="password"
                               name="password"
                               id="su-password"
                               required={true}/>
                        <div className="invalid-feedback">{errors.password || 'Password cannot be empty'}</div>
                        <div className="text-muted small mt-2 text-wrap">
                            Passwords must contain at least height characters with at least one non-empty
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-success mb-4" disabled={isSyncing} type="submit">
                            Sign Up{isSyncing ? '...' : ''}
                        </button>
                    </div>
                </Form>
            </div>
        );
    }

    handleInput(field, event) {
        let data = {...this.state.data};
        data[field] = event.target.value;
        this.setState({data});
    }

    handleSubmit(event) {
        this.setState({isSyncing: true});
        let data = new FormData(event.target);

        request.post('/auth/register', {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        })
            .then(json => {
                if (json.errors) {
                    this.setState({isSyncing: false, errors: json.errors});
                    return;
                }

                route('/');
                // this.setState({isSyncing: false, errors: {}});
                // event.target.reset();
            });
    }
};