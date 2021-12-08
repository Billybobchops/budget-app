import classes from "./ProfileBar.module.css";
import Image from "next/image";
import Link from "next/link";
import profilePicture from "../../../public/Profile-picture.png";
import SquareButton from "../../UI/Buttons/SquareButton";
import { useAuth } from "../../../hooks/useAuth";

const ProfileBar = () => {
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className={classes.container}>
      <div className={classes.profilePicture}>
        <Image
          src={profilePicture}
          alt="Profile picture"
          className={classes.profilePicture}
        />
      </div>
      <Link href="/my-account">
        <a className={classes.link}>My Account</a>
      </Link>
      <SquareButton text="Logout" onClick={logoutHandler} />
    </div>
  );
};

export default ProfileBar;
