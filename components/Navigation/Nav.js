import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartPie,
    faCreditCard,
    faList,
    faCalculator,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../public/LogoPlaceholder.png';
import classes from './Nav.module.css';

const NavLink = ({ href, icon, linkText }) => {
    const router = useRouter();

    const linkStateClass =
        router.pathname === href
            ? `${[classes.navLink, classes.active].join(' ')}`
            : `${classes.navLink}`;

    return (
        <li className={classes.listItem}>
            <Link className={linkStateClass} href={href}>
                <FontAwesomeIcon icon={icon} className={classes.icon} />
                {linkText}
            </Link>
        </li>
    );
};

const Nav = () => {
    return (
        <nav className={classes.navigation}>
            <div className={classes.logo}>
                <Image height={75} src={logo} alt='Logo' priority />
            </div>
            <ul className={classes.list}>
                <NavLink
                    href='/overview'
                    icon={faChartPie}
                    linkText='Overview'
                />
                <NavLink
                    href='/income-and-expenses'
                    icon={faCreditCard}
                    linkText='Income and Expenses'
                />
                <NavLink
                    href='/monthly-planner'
                    icon={faList}
                    linkText='Monthly Planner'
                />
                <NavLink
                    href='/sinking-funds-calculator'
                    icon={faCalculator}
                    linkText='Sinking Funds Calculator'
                />
            </ul>
        </nav>
    );
};

export default Nav;

{
    /* <a className={classes.navLink}></a> */
}
