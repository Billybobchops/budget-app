import classes from "./AuthForms.module.css";
import FormBackground from "./FormUI/FormBackground";
import SubmitButton from "./FormUI/SubmitButton";
import useForm from "../../hooks/useForm";
import { authConfig } from "./formUtils/authConfig";

const SignUpForm = (props) => {
  const { renderFormInputs, isFormValid } = useForm(authConfig);
  const { onCreateAccountClick, onSignInClick } = props;

  return (
    <form onSubmit={onCreateAccountClick}>
      <FormBackground>
        <h1 className={classes.header}>Create an Account!</h1>
        {renderFormInputs()}
        <SubmitButton value="Create Account" disabled={!isFormValid()} />
        <p className={classes.paragraph}>
          Already have an account?{" "}
          <button onClick={onSignInClick} className={classes.buttonLink}>
            Sign in here.
          </button>
        </p>
      </FormBackground>
    </form>
  );
};

export default SignUpForm;
