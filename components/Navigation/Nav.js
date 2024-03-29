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
import logo from '../../public/Budgie-Logo.png';
import classes from './Nav.module.css';

const NavLink = ({ href, icon, linkText }) => {
	const router = useRouter();

	return (
		<li className={classes.listItem}>
			<FontAwesomeIcon icon={icon} className={classes.icon} />
			<Link className={`${classes.navLink} ${router.pathname === href ? classes.active : ''}`} href={href}>
				{linkText}
			</Link>
		</li>
	);
};

const Nav = () => {
	return (
		<nav className={classes.navigation}>
			<div className={classes.logo}>
				<Image
					src={logo}
					alt='Logo'
					height={41}
					width={125}
					priority={true}
					as="image"
				/>
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
