import classes from './KebabMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback, useEffect, useRef } from 'react';

const KebabMenu = ({ kebabMenuActions }) => {
    const [isActive, setIsActive] = useState(false);
    const kebabMenuRef = useRef();
    const buttonRef = useRef();

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
            console.log('toggleMenu');
        }
    };

    const closeMenu = useCallback(() => {
        console.log('closeMenu');
        setIsActive(false);
    }, []);

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
        <>
            <button
                className={`${classes.kebabToggleButton} ${
                    isActive ? classes.buttonClose : ''
                }`}
                onClick={isActive ? closeMenu : toggleMenu}
                ref={buttonRef}>
                {isActive ? (
                    <FontAwesomeIcon icon={faSquareXmark} />
                ) : (
                    <FontAwesomeIcon icon={faEllipsisH} />
                )}
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
                                }}>
                                {action.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default KebabMenu;
