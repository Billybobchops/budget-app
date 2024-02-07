import classes from './ProfileBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import profilePicture from '../../../public/Profile-picture.png';
import Button from '../../UI/buttons/Button';
import { useAuth } from '../../../hooks/useAuth';

const ProfileBar = () => {
	const { logout } = useAuth();

	const logoutHandler = () => { logout(); };

	return (
		<div className={classes.container}>
			<div className={classes.profilePicture}>
				<Image
					src={profilePicture}
					alt='Profile picture'
					className={classes.profilePicture}
				/>
			</div>
			<Link className={classes.link} href={'/my-account'}>
				My Account
			</Link>
			<Button
				clickHandler={logoutHandler}
				color='#2d8058'
				evenMargin={true}
				text='Logout'
			/>
		</div>
	);
};

export default ProfileBar;
