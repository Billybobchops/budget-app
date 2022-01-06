import classes from './Header.module.css';
import DatePicker from '../UI/DatePicker';
import { useAuth } from '../../hooks/useAuth';

const Header = (props) => {
  const { user } = useAuth();

  return (
    <div className={classes.headerGrid}>
      <div className={classes.welcome}>
        <p>{`Welcome ${user.displayName}!`}</p>
      </div>
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.date}>September 24th, 2021</p> 
      {/* date must match with selected date from DatePicker component */}
      {props.hasDatePicker && (
        <div className={classes.timeSelector}>
          <DatePicker />
        </div>
      )}
    </div>
  );
};

export default Header;
