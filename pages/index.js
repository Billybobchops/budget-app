import { useState } from "react";
import Image from "next/image";
import Video from "../components/UI/Video";
import logo from "../public/LogoPlaceholder.png";
import LoginForm from "../components/Forms/LoginForm";
import SignUpForm from "../components/Forms/SignUpForm";
import classes from "../styles/HomeAuth.module.css";

export default function HomeAuth() {
  let [isNewUser, setIsNewUser] = useState(true);
  
  const toggleUserStatus = (e) => {
    e.preventDefault();
    setIsNewUser(!isNewUser);
  };

  const authForm = (
    <>
      {isNewUser && <SignUpForm onSignInClick={toggleUserStatus} />}
      {!isNewUser && <LoginForm onSignUpClick={toggleUserStatus} />}
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
