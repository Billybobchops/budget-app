import classes from '../Forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import useForm from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { loginConfig } from './formUtils/loginConfig';

const LoginForm = (props) => {
  const { renderFormInputs, isFormValid, form } = useForm(loginConfig);
  const { signin } = useAuth();
  const {
    email: { value: e },
    password: { value: p },
  } = form;

  const loginHandler = (event) => {
    event.preventDefault();
    signin(e, p);
  };

  return (
    <form onSubmit={loginHandler}>
      <FormBackground>
        <h1 className={classes.header}>Welcome Back!</h1>
        {renderFormInputs()}
        <p className={classes.paragraph}>Forgot your password?</p>
        <SubmitButton value='Login' disabled={!isFormValid()} />
        <p className={classes.paragraph}>
          New User?{' '}
          <button onClick={props.onSignUpClick} className={classes.buttonLink}>
            Sign up here.
          </button>
        </p>
      </FormBackground>
    </form>
  );
};

export default LoginForm;
