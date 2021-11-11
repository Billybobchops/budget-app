import { useState } from "react";
import Image from "next/image";
import logo from "../public/LogoPlaceholder.png";
import LoginForm from "../components/Forms/LoginForm";
import SignUpForm from "../components/Forms/SignUpForm";
import classes from "../styles/HomeAuth.module.css";

const Video = () => {
  return (
    <video loop autoPlay={true} muted className={classes.video}>
      <source
        src={"/pexels-tima-miroshnichenko-5561496.mp4"}
        type="video/mp4"
      />
    </video>
  );
};

export default function HomeAuth() {
  let [isNewUser, setIsNewUser] = useState(true);

  const setIsNewUserTrue = () => {
    setIsNewUser(true);
  };

  const setIsNewUserFalse = () => {
    setIsNewUser(false);
  };

  const authForm = (
    <>
      {!isNewUser && <LoginForm onSignUpClick={setIsNewUserTrue} />}
      {isNewUser && <SignUpForm onLoginClick={setIsNewUserFalse} />}
    </>
  );

  return (
    <div className={classes.gridContainer}>
      <div className={classes.gradient}></div>
      <Video />
      <main className={classes.contentColumn}>
        <div className={classes.logo}>
          <Image src={logo} alt="Logo" />
        </div>
        {authForm}
      </main>
    </div>
  );
}
