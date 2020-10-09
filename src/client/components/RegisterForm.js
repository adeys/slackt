import {h} from 'preact';

export default () => {
    return (
        <div className="mx-auto text-center py-4 align-self-center">
            <div className="mb-4 d-none d-md-block">
                <i className="feather icon-x2 text-info icon-user-plus"/>
            </div>
            <h2 className="text-center">Sign Up</h2>
            <form className="mt-4" action="#">
                <div className="form-group form">
                    <input className="form-control" placeholder="Username" type="text" name="username" id="su-username" />
                </div>
                <div className="form-group form">
                    <input className="form-control" placeholder="Email" type="email" name="email" id="email" />
                </div>
                <div className="form-group">
                    <input className="form-control" placeholder="Password" type="password" name="password" id="su-password" />
                </div>
                <div className="form-group">
                    <input className="form-control" placeholder="Confirm Password" type="password" name="confirm" id="confirm" />
                </div>
                <div className="form-group text-center">
                    <button className="btn btn-success mb-4" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};