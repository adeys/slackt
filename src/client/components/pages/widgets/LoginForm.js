import {h} from 'preact';
import Form from '../../elements/Form';

export default ({className}) => {
  return (
      <div className={`mx-auto text-center py-4 align-self-center ${className || ''}`}>
          <div className="mb-4 d-none d-md-block">
              <i className="feather icon-x2 text-info icon-unlock"/>
          </div>
          <h2 className="text-center">Login</h2>
          <Form className="mt-4">
              <div className="form-group form">
                <input className="form-control" placeholder="Username" type="text" name="username" id="si-username" />
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Password" type="password" name="password" id="si-password" />
              </div>
              <div className="form-group text-center">
                <button className="btn btn-success mb-4" type="submit">Login</button>
                <p className="mb-2 text-muted">Forgot password? <a href="#">Reset</a></p>
              </div>
        </Form>
      </div>
  );
};