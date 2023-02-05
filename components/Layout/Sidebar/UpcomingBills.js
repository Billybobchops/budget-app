import classes from './UpcomingBills.module.css';
import { useSelector } from 'react-redux';
import UpcomingBill from '../../UI/UpcomingBill';
import { selectItemEntities } from '../../../store/items-slice';

const UpcomingBills = () => {
  const items = useSelector(selectItemEntities);
  const currentMonthYear = useSelector(
    (state) => state.date.formattedMonthYear
  );
  const today = new Date().getDate();

  const isWithinRange = (billDate, range) => {
    const billDay = billDate.slice(-2);

    if (+billDay >= today && +billDay <= today + range) return true;
    return false;
  };

  return (
    <div className={classes.container}>
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
    </div>
  );
};

export default UpcomingBills;
