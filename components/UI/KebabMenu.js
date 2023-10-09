import classes from './KebabMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const KebabMenu = ({ kebabMenuActions }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <button className={classes.kebabToggleButton} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faEllipsisH} />
            </button>

            {kebabMenuActions && isActive && (
                <ul className={classes.kebabMenu}>
                    {kebabMenuActions.map((action) => {
                        return (
                            <li
                                className={classes.kebabMenuItem}
                                key={action.title}
                                onClick={action.actionFn}
							>
                                {action.title}
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default KebabMenu;