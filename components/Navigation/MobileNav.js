import classes from './MobileNav.module.css';
import LightOverlay from '../UI/LightOverlay';
import Portal from '../UI/Portal';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faChartPie,
  faCreditCard,
  faList,
  faCalculator,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../public/LogoPlaceholder.png';
import { useAuth } from '../../hooks/useAuth';

const MobileNav = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
  };

  const keyDownHandler = () => {
    setIsClicked(false);
  };

  const icon = !isClicked ? (
    <FontAwesomeIcon icon={faBars} className={classes.icon} />
  ) : (
    <FontAwesomeIcon icon={faTimes} className={classes.icon} />
  );

  const clickHandler = () => {
    setIsClicked(!isClicked);
  };

  const NavBar = () => {
    return (
      <nav className={classes.mobileNav}>
        <div className={classes.logo}>
          <Image src={logo} alt='Logo' />
        </div>
        <button className={classes.iconBtn} onClick={clickHandler}>
          {icon}
        </button>
      </nav>
    );
  };

  const NavLinks = () => {
    return isClicked ? (
      <LightOverlay onKeyDown={keyDownHandler}>
        <NavBar />
        <div className={classes.navigation}>
          <ul classes={classes.list}>
            <li className={classes.listItem}>
              <Link href='/overview' passHref>
                <a className={classes.mobileNavLink}>
                  <FontAwesomeIcon
                    icon={faChartPie}
                    className={classes.mobileIcon}
                  />
                  Overview
                </a>
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link href='/income-and-expenses' passHref>
                <a className={classes.mobileNavLink}>
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className={classes.mobileIcon}
                  />
                  Income and Expenses
                </a>
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link href='/monthly-planner' passHref>
                <a className={classes.mobileNavLink}>
                  <FontAwesomeIcon
                    icon={faList}
                    className={classes.mobileIcon}
                  />
                  Monthly Planner
                </a>
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link href='/sinking-funds-calculator' passHref>
                <a className={classes.mobileNavLink}>
                  <FontAwesomeIcon
                    icon={faCalculator}
                    className={classes.mobileIcon}
                  />
                  Sinking Funds Calculator
                </a>
              </Link>
            </li>
            <li className={classes.listItem}>
              <Link href='/my-account' passHref>
                <a className={classes.mobileNavLink}>My Account</a>
              </Link>
            </li>
            <li className={classes.listItem}>
              <a className={classes.mobileNavLink} onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </LightOverlay>
    ) : (
      ''
    );
  };

  return (
    <>
      <NavBar />
      <Portal selector='#portal'>
        <NavLinks />
      </Portal>
    </>
  );
};

export default MobileNav;
