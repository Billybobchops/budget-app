import classes from "./DatePicker.module.css";
import { useState, useRef, useEffect, useCallback } from "react";

const Dropdown = () => {
  return (
    <div className={classes.ddCalendar}>
      <div className={classes.ddCalendarYear}>
        <div className={classes.ddCalendarHeader}>2021</div>
      </div>
      <div className={classes.ddCalendarMonths}>
        <div className={classes.month}>Jan</div>
        <div className={classes.month}>Feb</div>
        <div className={classes.month}>Mar</div>
        <div className={classes.month}>Apr</div>
        <div className={classes.month}>May</div>
        <div className={classes.month}>Jun</div>
        <div className={classes.month}>Jul</div>
        <div className={classes.month}>Aug</div>
        <div className={classes.month}>Sep</div>
        <div className={classes.month}>Oct</div>
        <div className={classes.month}>Nov</div>
        <div className={classes.month}>Dec</div>
      </div>
    </div>
  );
};

const DatePicker = () => {
  const picker = useRef();
  const [isClicked, setIsClicked] = useState(false);

  const escFunction = useCallback((e) => {
    if (e.keyCode === 27) {
      setIsClicked(false);
    }
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (isClicked && picker.current && !picker.current.contains(e.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    document.addEventListener("keydown", escFunction);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
      document.removeEventListener("keydown", escFunction);
    };
  }, [isClicked, escFunction]);

  const dropDownHandler = () => {
    setIsClicked(true);
  };

  return (
    <div ref={picker} className={classes.ddWrapper}>
      <button className={classes.ddButton} onClick={dropDownHandler}>
        <span className={classes.ddButtonText}>Select Month and Year</span>{" "}
        <span className={classes.ddArrow}>▼</span>
      </button>
      {isClicked && <Dropdown />}
    </div>
  );
};

export default DatePicker;
