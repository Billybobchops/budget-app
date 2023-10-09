import classes from '../forms/FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import useForm from '../../hooks/useForm';
import { signupConfig } from './formUtils/signupConfig';
import { useAuth } from '../../hooks/useAuth';

const SignUpForm = (props) => {
  const { renderFormInputs, isFormValid, form } = useForm(signupConfig);
  const { signup } = useAuth();

  const {
    email: { value: e },
    password: { value: p },
    firstName: { value: fname },
    lastName: { value: lname },
  } = form;

  const signupHandler = (event) => {
    event.preventDefault();
    const displayName = `${fname} ${lname}`;
    signup(e, p, displayName);
  };

  return (
    <form onSubmit={signupHandler}>
      <FormBackground>
        <h1 className={classes.header}>Create an Account!</h1>
        {renderFormInputs()}
        <SubmitButton value='Create Account' disabled={!isFormValid()} />
        <p className={classes.paragraph}>
          Already have an account?{' '}
          <button onClick={props.onSignInClick} className={classes.buttonLink}>
            Sign in here.
          </button>
        </p>
      </FormBackground>
    </form>
  );
};

export default SignUpForm;
