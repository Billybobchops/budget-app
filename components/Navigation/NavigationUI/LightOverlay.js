import classes from "../NavigationUI/LightOverlay.module.css";
import { useCallback, useEffect } from "react";

const LightOverlay = (props) => {
  // here escFunction is memoized by useCallback so as long as the dependency doesn't change
  // this function object will not change in memory
  const escFunction = useCallback((e) => {
    if (e.keyCode === 27) {
      props.onKeyDown();
    }
  }, [props]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  return <div className={classes.lightOverlay}>{props.children}</div>
};

export default LightOverlay;

