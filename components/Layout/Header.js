import classes from './Header.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import DatePicker from '../UI/DatePicker';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';

const Header = ({ title, hasDatePicker }) => {
  const { user: isLoggedIn } = useAuth();
  const headerDate = useSelector((state) => state.date.headerDate);

  return (
    <div className={classes.gridArea}>
      <div className={classes.headerGrid}>
        <div className={classes.welcome}>
          <p>
            {isLoggedIn ? (
              `Welcome ${isLoggedIn.displayName}!`
            ) : (
              <Skeleton borderRadius={0} width={100} />
            )}
          </p>
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
    </div>
  );
};

export default Header;
