import classes from './KebabMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faX } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback, useEffect, useRef } from 'react';

const KebabMenu = ({ kebabMenuActions, baseColor }) => {
	const [isActive, setIsActive] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const kebabMenuRef = useRef();
	const buttonRef = useRef();

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	const buttonStyle = {
		backgroundColor: baseColor,
		filter: isHovered ? 'brightness(90%)' : 'none'
	};

	const toggleMenu = () => {
		// Check if the clicked button is the "X" button
		const isXButton =
			buttonRef.current &&
			buttonRef.current.contains(document.activeElement);

		// If the clicked button is the "X" button, only close the menu
		if (isActive && isXButton) {
			closeMenu();
		} else {
			// Otherwise, toggle the menu
			setIsActive((prevIsActive) => !prevIsActive);
		}
	};

	const closeMenu = useCallback(() => { setIsActive(false) }, []);

	const escFunction = useCallback(
		(e) => {
			if (e.keyCode === 27 && isActive) {
				closeMenu();
			}
		},
		[isActive, closeMenu]
	);

	const checkIfClickedOutside = useCallback(
		(e) => {
			if (
				isActive &&
				kebabMenuRef.current &&
				!kebabMenuRef.current.contains(e.target) &&
				!buttonRef.current.contains(e.target)
			) {
				closeMenu();
			}
		},
		[isActive, closeMenu]
	);

	useEffect(() => {
		document.addEventListener('keydown', escFunction);
		document.addEventListener('mousedown', checkIfClickedOutside);

		return () => {
			document.removeEventListener('keydown', escFunction);
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, [escFunction, checkIfClickedOutside]);

	return (
		<div className={classes.container}>
			<button
				aria-label={isActive ? 'Cancel' : undefined}
				className={classes.kebabToggleButton}
				onClick={isActive ? closeMenu : toggleMenu}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				ref={buttonRef}
				style={buttonStyle}
			>
				<FontAwesomeIcon icon={isActive ? faX : faEllipsisH} />
			</button>

			{kebabMenuActions && isActive && (
				<ul ref={kebabMenuRef} className={classes.kebabMenu}>
					{kebabMenuActions.map((action) => (
						<li key={action.title}>
							<button
								className={classes.kebabMenuItem}
								onClick={() => {
									action.actionFn();
									closeMenu();
								}}
							>
								{action.title}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default KebabMenu;
