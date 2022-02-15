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
      {hasDatePicker && (
        <>
          <p className={classes.date}>{headerDate}</p>
          <div className={classes.timeSelector}>
            <DatePicker />
          </div>
        </>
      )}
      {!hasDatePicker && (
        <>
          <div></div>
          <p className={classes.dateEnd}>{headerDate}</p>
        </>
      )}
    </div>
  );
};

export default Header;
