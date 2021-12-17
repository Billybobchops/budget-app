import classes from '../UI/DarkOverlay.module.css';
import { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DarkOverlay = (props) => {

  // here escFunction is memoized by useCallback so as long as the dependency doesn't change
  // this function object will not change in memory
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        props.onKeyDown();
      }
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);

  return (
    <div className={classes.darkOverlay}>
      {
        <FontAwesomeIcon
          icon={faTimes}
          className={classes.icon}
          onClick={props.onKeyDown}
        />
      }
      {props.children}
    </div>
  );
};

export default DarkOverlay;
