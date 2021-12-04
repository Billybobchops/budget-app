import classes from "./AuthForms.module.css";
import FormBackground from "./FormUI/FormBackground";
import SubmitButton from "./FormUI/SubmitButton";
import useForm from "../../hooks/useForm";
import { authConfig } from "./formUtils/authConfig";

const LoginForm = (props) => {
  const { renderFormInputs, isFormValid } = useForm(authConfig);
  const { onLoginClick, onSignUpClick } = props;

  return (
    <form onSubmit={onLoginClick}>
      <FormBackground>
        <h1 className={classes.header}>Welcome Back!</h1>
        {renderFormInputs()}
        <p className={classes.paragraph}>Forgot your password?</p>
        <SubmitButton value="Login" disabled={!isFormValid()} />
        <p className={classes.paragraph}>
          New User?{" "}
          <button onClick={onSignUpClick} className={classes.buttonLink}>
            Sign up here.
          </button>
        </p>
      </FormBackground>
    </form>
  );
};

export default LoginForm;
