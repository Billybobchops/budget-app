import classes from './UpcomingBills.module.css';
import { useSelector } from 'react-redux';
import UpcomingBill from '../../UI/UpcomingBill';

const UpcomingBills = () => {
  const items = useSelector((state) => state.items.entities);
  const currentMonthYear = useSelector(
    (state) => state.date.formattedMonthYear
  );

  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Upcoming Bills</h2>
      </div>
      <div className={classes.background}>
        {/* NEED NON DRAGGABLE BUDGET ITEMS HERE & DRAGGABLE ITEMS IN ITEMSDRAGLIST */}
        {Object.values(items).length !== 0 &&
          Object.values(items).map((item) => {
            if (item.createdOnMonthYear === currentMonthYear)
              return (
                <UpcomingBill
                  key={item.id}
                  title={item.id}
                  date={item.billDate}
                  budgetedAmount={item.budgetAmount}
                />
              );
          })}
      </div>
    </div>
  );
};

export default UpcomingBills;
