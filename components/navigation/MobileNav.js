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
import logo from '../../public/Budgie-Logo.png';
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
				<Image
					src={logo}
					alt='Logo'
					height={25}
					width={75}
					priority={true}
				/>
				<button className={classes.iconBtn} onClick={clickHandler}>
					{icon}
				</button>
			</nav>
		);
	};

	const NavLink = ({ href, icon, linkText }) => {
		const router = useRouter();

		return (
			<li className={classes.listItem}>
				<FontAwesomeIcon icon={icon} className={classes.mobileIcon} />
				<Link
					className={`${classes.mobileNavLink} ${
						router.pathname === href ? classes.active : ''
					}`}
					href={href}>
					{linkText}
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
							<Link href={'/my-account'}>
								<a className={classes.mobileNavLink}>
									My Account
								</a>
							</Link>
						</li>
						<li className={classes.listItem}>
							<a
								className={classes.mobileNavLink}
								onClick={logoutHandler}>
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
