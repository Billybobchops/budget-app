import classes from "./AuthForms.module.css";
import FormBackground from "./FormUI/FormBackground";
import BasicInput from "./FormUI/BasicInput";
import SubmitButton from "./FormUI/SubmitButton";

const LoginForm = (props) => {
  const loginHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={loginHandler}>
      <FormBackground>
        <h1 className={classes.header}>Welcome Back!</h1>
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
        <p className={classes.paragraph}>Forgot your password?</p>
        <SubmitButton value="Login" />
        <p className={classes.paragraph}>
          New User?{" "}
          <button onClick={props.onSignUpClick} className={classes.buttonLink}>
            Sign up here.
          </button>
        </p>
      </FormBackground>
    </form>
  );
};

export default LoginForm;
