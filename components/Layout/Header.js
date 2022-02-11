import classes from './Header.module.css';
import DatePicker from '../UI/DatePicker';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';

const Header = ({ title, hasDatePicker }) => {
  const { user } = useAuth();
  const headerDate = useSelector((state) => state.date.headerDate);

  return (
    <div className={classes.headerGrid}>
      <div className={classes.welcome}>
        <p>{`Welcome ${user.displayName}!`}</p>
      </div>
      <h1 className={classes.title}>{title}</h1>
      {/* date must match with selected date from DatePicker component */}
      <p className={classes.date}>{headerDate}</p>
      {hasDatePicker && (
        <div className={classes.timeSelector}>
          <DatePicker />
        </div>
      )}
    </div>
  );
};

export default Header;
