import classes from './TotalsBar.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { selectExpenseEntities } from '../../../store/expenses-slice';
import { useAuth } from '../../../hooks/useAuth';

const TotalsBar = () => {
  const { user: isLoggedIn } = useAuth();
  const expenses = useSelector(selectExpenseEntities);
  let totalIn = 0;
  let totalOut = 0;

  if (Object.values(expenses).length !== 0) {
    Object.values(expenses).map((expense) => {
      if (expense.expense) totalOut += expense.amount;
      if (!expense.expense) totalIn += expense.amount;
    });
  }

	// console.log('TotalsBar isLoggedIn:', !!isLoggedIn);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h2>Totals</h2>
      </div>

      <SkeletonTheme baseColor={'#d4f3da'} highlightColor={'#E1FFE7'}>
        {expenses && isLoggedIn ? (
          <div className={classes.incomeBar}>
            <div className={classes.barTitle}>Income</div>
            <div className={classes.barAmount}>
              {`$${totalIn.toLocaleString()}`}
            </div>
          </div>
        ) : (
          <div className={classes.barSkeleton}>
            <Skeleton borderRadius={0} height={48} />
          </div>
        )}
      </SkeletonTheme>

      <SkeletonTheme baseColor={'#FFDDDD'} highlightColor={'#FFEAEA'}>
        {expenses && isLoggedIn ? (
          <div className={classes.expensesBar}>
            <div className={classes.barTitle}>Expenses</div>
            <div className={classes.barAmount}>
              {`$${totalOut.toLocaleString()}`}
            </div>
          </div>
        ) : (
          <div className={classes.barSkeleton}>
            <Skeleton borderRadius={0} height={48} />
          </div>
        )}
      </SkeletonTheme>
    </div>
  );
};

export default TotalsBar;