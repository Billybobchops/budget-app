import classes from './FormUI/FormStyles.module.css';
import FormBackground from './FormUI/FormBackground';
import SubmitButton from './FormUI/SubmitButton';
import useForm from '../../hooks/useForm';
import { passwordResetConfig } from './formUtils/passwordResetConfig';
import { useAuth } from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PasswordResetForm = ({ onCloseOut }) => {
	const { renderFormInputs, isFormValid, form } = useForm(passwordResetConfig);
	const { passwordResetEmail } = useAuth();

	const { email: { value: e } } = form;

	const passwordResetHandler = (event) => {
		event.preventDefault();
		passwordResetEmail(e);
	};

	return (
		<form onSubmit={passwordResetHandler}>
			<FormBackground>
				<div className={classes.iconWrapper}>
					<button className={classes.iconButton} onClick={onCloseOut}>
						<FontAwesomeIcon
							icon={faTimes}
							className={classes.iconClose}
						/>
					</button>
				</div>
				<h1 className={classes.header}>Forgot Your Password?</h1>
				{renderFormInputs()}
				<SubmitButton
					value='Reset Password'
					disabled={!isFormValid()}
				/>
			</FormBackground>
		</form>
	);
};

export default PasswordResetForm;
