import classes from './ButtonBar.module.css';

const ButtonBar = ({ children, title }) => {
	return (
		<div className={`${classes.buttonBar}`}>
			<h2 className={classes.buttonBarTitle}>{title}</h2>
			{children}
		</div>
	);
};

export default ButtonBar;
