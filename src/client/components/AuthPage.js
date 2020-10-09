import {h} from 'preact';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default () => {
  return (
      <div className="auth-wrapper">
          <div className="card w-75 justify-content-center flex-md-row">
              <LoginForm />
              <div className="divider-vert m-2" data-content='OR'/>
              <RegisterForm />
          </div>
      </div>
  );
};