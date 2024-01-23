import classes from './Button.module.css';

const Button = ({ text, clickHandler, evenMargin }) => {
	const buttonClasses = `${classes.button} ${evenMargin ? classes.buttonEvenMargin : ''}`;

	return (
		<button type='button' className={buttonClasses} onClick={clickHandler}>
			{text}
		</button>
	);
};

export default Button;
