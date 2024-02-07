import classes from './Button.module.css';
import { useState } from 'react';

const Button = ({ text, color = '#bd275c', clickHandler, evenMargin }) => {
	const [isHovered, setIsHovered] = useState(false);
	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	const darkenColor = (col, percent) => {
		const num = parseInt(col, 16);
		const amt = Math.round(2.55 * percent);
		const val = Math.min(255, Math.max(0, num - amt));
		return val.toString(16).padStart(2, '0');
	};

	const darkenedColor = (color) => {
		const r = darkenColor(color.slice(1, 3), 20);
		const g = darkenColor(color.slice(3, 5), 20);
		const b = darkenColor(color.slice(5, 7), 20);
		return `#${r}${g}${b}`;
	};

	const buttonStyle = {
		backgroundColor: isHovered ? darkenedColor(color) : color,
		transition: 'background-color 0.2s ease',
	};

	return (
		<button
			className={`${classes.button} ${evenMargin ? classes.buttonEvenMargin : ''}`}
			onClick={clickHandler}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={buttonStyle}
			type='button'
		>
			{text}
		</button>
	);
};

export default Button;
