import { useState } from 'react';
import classes from '../styles/HomeAuth.module.css';
import logo from '../public/Budgie-Logo.png';
import Video from '../components/UI/Video';
import Image from 'next/image';
import LoginForm from '../components/Forms/LoginForm';
import SignUpForm from '../components/Forms/SignUpForm';
import PasswordResetForm from '../components/Forms/PasswordResetForm';

export default function HomeAuth() {
	const [isNewUser, setIsNewUser] = useState(true);
	const [forgotPass, setForgotPass] = useState(false);

	const toggleUserStatus = (e) => {
		e.preventDefault();
		setIsNewUser(!isNewUser);
	};

	const toggleForgotForm = (e) => {
		e.preventDefault();
		setForgotPass(!forgotPass);
	};

	const authForm = (
		<>
			{isNewUser && <SignUpForm onSignInClick={toggleUserStatus} />}
			{!isNewUser && (
				<LoginForm
					onSignUpClick={toggleUserStatus}
					onResetClick={toggleForgotForm}
				/>
			)}
		</>
	);

	return (
		<div className={classes.gridContainer}>
			<div className={classes.gradient}></div>
			<Video />
			<main className={classes.contentColumn}>
				<div className={classes.logo}>
					<Image
						alt='Logo'
						src={logo}
						height={49}
						width={150}
						priority={true}
					/>
				</div>
				{!forgotPass && authForm}
				{forgotPass && (
					<PasswordResetForm onCloseOut={toggleForgotForm} />
				)}
			</main>
		</div>
	);
}
