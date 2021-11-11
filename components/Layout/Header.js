import classes from "./Header.module.css";
import DatePicker from "../UI/DatePicker";

const Header = (props) => {
  return (
    <div className={classes.headerGrid}>
      <div className={classes.welcome}>
        <p>Welcome Bob Chaldo!</p>
      </div>
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.date}>September 24th, 2021</p>
      {props.hasDatePicker && (
        <div className={classes.timeSelector}>
          <DatePicker />
        </div>
      )}
    </div>
  );
};

export default Header;
