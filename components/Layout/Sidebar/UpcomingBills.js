import classes from './UpcomingBills.module.css';
import { useSelector } from 'react-redux';
import UpcomingBill from '../../UI/UpcomingBill';
import { selectItemEntities } from '../../../store/items-slice';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../../hooks/useAuth';

const UpcomingBills = () => {
  const items = useSelector(selectItemEntities);
  const currentMonthYear = useSelector(
    (state) => state.date.formattedMonthYear
  );
  const today = new Date().getDate();
  const { user: isLoggedIn } = useAuth();

  const isWithinRange = (billDate, range) => {
    const billDay = billDate.slice(-2);

    if (+billDay >= today && +billDay <= today + range) return true;
    return false;
  };

  const containerClass = isLoggedIn
    ? classes.container
    : classes.containerLoading;

  return (
    <div className={containerClass}>
      {isLoggedIn ? (
        <>
          <div>
            <h2 className={classes.title}>Upcoming Bills</h2>
          </div>
          <div className={classes.background}>
            {Object.values(items).length !== 0 &&
              Object.values(items).map((item) => {
                const billDay = item.billDate.slice(-2);
                const displayDate = +billDay === today ? 'Today' : billDay;

                if (isWithinRange(item.billDate, 7))
                  return (
                    <UpcomingBill
                      key={item.id}
                      title={item.id}
                      date={displayDate}
                      budgetedAmount={item.budgetAmount}
                    />
                  );
              })}
          </div>
        </>
      ) : (
        <Skeleton borderRadius={0} height={100} />
      )}
    </div>
  );
};

export default UpcomingBills;
