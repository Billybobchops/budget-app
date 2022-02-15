import classes from './DatePicker.module.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRequireAuth } from '../../hooks/useRequireAuth';
import store from '../../store/index';
import {
  setHeaderMonth,
  incrementYear,
  decrementYear,
  setDateToToday,
} from '../../store/date-slice';
import { fetchItems } from '../../store/item-slice';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from './Buttons/Button';

const DatePicker = () => {
  const picker = useRef();
  const auth = useRequireAuth();
  const headerDate = useSelector((state) => state.date.headerDate);
  const isCurrentDate = useSelector((state) => state.date.isCurrentDate);
  const year = useSelector((state) => state.date.year);
  const month = useSelector((state) => state.date.monthNum);
  // const [selectedMonthNum, setSelectedMonthNum] = useState(+initialMonth);
  // const [selectedYear, setSelectedYear] = useState(initialYear);
  const [isClicked, setIsClicked] = useState(false);

  const months = {
    jan: { num: 1, short: 'Jan', long: 'January' },
    feb: { num: 2, short: 'Feb', long: 'February' },
    mar: { num: 3, short: 'Mar', long: 'March' },
    apr: { num: 4, short: 'Apr', long: 'April' },
    may: { num: 5, short: 'May', long: 'May' },
    jun: { num: 6, short: 'Jun', long: 'June' },
    jul: { num: 7, short: 'Jul', long: 'July' },
    aug: { num: 8, short: 'Aug', long: 'August' },
    sep: { num: 9, short: 'Sep', long: 'September' },
    oct: { num: 10, short: 'Oct', long: 'October' },
    nov: { num: 11, short: 'Nov', long: 'November' },
    dec: { num: 12, short: 'Dec', long: 'December' },
  };

  const fetchAllData = (selectedDate) => {
    const uid = auth.user.uid;
    // put all dispatches here and reuse this in all 4 funcs below...
    store.dispatch(fetchItems({ uid, selectedDate }));
  };

  const setMonth = (e) => {
    e.preventDefault();
    const monthNum = e.target.id;
    const monthLong = e.target.value;
    // setSelectedMonthNum(monthNum);

    const selectedDate = `${monthNum}/${year}`;
    store.dispatch(setHeaderMonth({ monthLong, monthNum }));
    fetchAllData(selectedDate);
    setIsClicked(false);
  };

  const increment = (e) => {
    e.preventDefault();
    // setSelectedYear(selectedYear++);

    const selectedDate = `${monthNum}/${year++}`;
    store.dispatch(incrementYear());
    fetchAllData(selectedDate);
  };
  
  const decrement = (e) => {
    e.preventDefault();
    // setSelectedYear(selectedYear--);

    const selectedDate = `${monthNum}/${year--}`;
    store.dispatch(decrementYear());
    fetchAllData(selectedDate);
  };

  const setDateToCurrent = (e) => {
    e.preventDefault();
    store.dispatch(setDateToToday());
    setIsClicked(false);
  };

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

    document.addEventListener('mousedown', checkIfClickedOutside);
    document.addEventListener('keydown', escFunction);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
      document.removeEventListener('keydown', escFunction);
    };
  }, [isClicked, escFunction]);

  const dropDownHandler = () => {
    setIsClicked(true);
  };

  return (
    <div ref={picker} className={classes.ddWrapper}>
      <button className={classes.ddButton} onClick={dropDownHandler}>
        <span className={classes.ddButtonText}>Select Month and Year</span>{' '}
        <span className={classes.ddArrow}>▼</span>
      </button>
      {isClicked && (
        <div className={classes.ddCalendar}>
          <div className={classes.ddCalendarYear}>
            <div className={classes.ddCalendarHeader}>
              <button className={classes.yearBtn} onClick={decrement}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <p className={classes.year}>{headerDate.slice(-4)}</p>
              <button className={classes.yearBtn} onClick={increment}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <div className={classes.ddCalendarMonths}>
            {Object.values(months).map((month) => {
              let activeMonth =
                month.short === headerDate.slice(0, 3)
                  ? classes.activeMonth
                  : '';
              let monthClass = `${classes.month} ${activeMonth}`;

              return (
                <button
                  key={month.short}
                  value={month.long}
                  className={monthClass}
                  onClick={setMonth}
                  id={month.num}
                >
                  {month.short}
                </button>
              );
            })}
          </div>
          {!isCurrentDate && (
            <div className={classes.todayBtnContainer}>
              <Button
                text='Today'
                clickHandler={setDateToCurrent}
                evenMargin={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
