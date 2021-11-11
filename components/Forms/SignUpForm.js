import classes from "./AuthForms.module.css";
import FormBackground from "./FormUI/FormBackground";
import BasicInput from "./FormUI/BasicInput";
import SubmitButton from "./FormUI/SubmitButton";

const SignUpForm = (props) => {
  return (
    <form>
      <FormBackground>
        <h1 className={classes.header}>Create an Account!</h1>
        <BasicInput
          type="email"
          id="email"
          label="Email"
          name="email"
          placeholder="Enter your email address"
        />
        <BasicInput
          type="password"
          id="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
        />
        <SubmitButton value="Create Account" />
        <p className={classes.paragraph}>
          Already have an account?{" "}
          <button onClick={props.onLoginClick} className={classes.buttonLink}>
            Sign in here.
          </button>
        </p>
      </FormBackground>
    </form>
  );
};

export default SignUpForm;
