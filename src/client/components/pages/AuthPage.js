import {h} from 'preact';
import LoginForm from './widgets/LoginForm';
import RegisterForm from './widgets/RegisterForm';

export default () => {
  return (
      <div className="auth-wrapper">
          <div className="card w-75 justify-content-center flex-md-row px-4">
              <LoginForm className="col-md-6" />
              <div className="divider-vert m-2" data-content='OR'/>
              <RegisterForm className="col-md-6" />
          </div>
      </div>
  );
};