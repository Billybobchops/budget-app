import classes from './MobileNav.module.css';
import LightOverlay from '../UI/LightOverlay';
import Portal from '../UI/Portal';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
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

  const clickHandler = () => {
    setIsClicked(!isClicked);
  };

  const icon = !isClicked ? (
    <FontAwesomeIcon icon={faBars} className={classes.icon} />
  ) : (
    <FontAwesomeIcon icon={faTimes} className={classes.icon} />
  );

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

  const NavLink = ({ href, icon, linkText }) => {
    const router = useRouter();

    const linkStateClass =
      router.pathname === href
        ? `${[classes.mobileNavLink, classes.active].join(' ')}`
        : `${classes.mobileNavLink}`;

    return (
      <li className={classes.listItem}>
        <Link href={href} passHref>
          <a className={linkStateClass}>
            <FontAwesomeIcon icon={icon} className={classes.mobileIcon} />
            {linkText}
          </a>
        </Link>
      </li>
    );
  };

  const NavLinks = () => {
    return isClicked ? (
      <LightOverlay onKeyDown={keyDownHandler}>
        <NavBar />
        <div className={classes.navigation}>
          <ul className={classes.list}>
            <NavLink
              href={'/overview'}
              icon={faChartPie}
              linkText={'Overview'}
            />
            <NavLink
              href={'/income-and-expenses'}
              icon={faCreditCard}
              linkText={'Income and Expenses'}
            />
            <NavLink
              href={'/monthly-planner'}
              icon={faList}
              linkText={'Monthly Planner'}
            />
            <NavLink
              href={'/sinking-funds-calculator'}
              icon={faCalculator}
              linkText={'Sinking Funds Calculator'}
            />
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
