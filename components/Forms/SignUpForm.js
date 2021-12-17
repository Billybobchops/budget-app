import classes from "../Forms/FormUI/FormStyles.module.css";
import FormBackground from "./FormUI/FormBackground";
import SubmitButton from "./FormUI/SubmitButton";
import useForm from "../../hooks/useForm";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase/firebaseClient";
import { authConfig } from "./formUtils/authConfig";

const SignUpForm = (props) => {
  const router = useRouter();
  
  const { renderFormInputs, isFormValid, form } = useForm(authConfig);
  const auth = getAuth(app);

  const { email, password } = form;
  const emailValue = email.value;
  const passwordValue = password.value;

  const createAccountHandler = () => {
    // Create a password-based account
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/overview");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };

  return (
    <form onSubmit={createAccountHandler}>
      <FormBackground>
        <h1 className={classes.header}>Create an Account!</h1>
        {renderFormInputs()}
        <SubmitButton value="Create Account" disabled={!isFormValid()} />
        <p className={classes.paragraph}>
          Already have an account?{" "}
          <button onClick={props.onSignInClick} className={classes.buttonLink}>
            Sign in here.
          </button>
        </p>
      </FormBackground>
    </form>
  );
};

export default SignUpForm;
