import classes from './TotalsBar.module.css';
import { useSelector } from 'react-redux';

const TotalsBar = () => {
  const expenses = useSelector((state) => state.expenses.entities);
  let totalOut = 0;
  let totalIn = 0;

  if (Object.values(expenses).length !== 0) {
    Object.values(expenses).map((expense) => {
      if (expense.expense) totalOut += expense.amount;
      if (!expense.expense) totalIn += expense.amount;
    });
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h2>Totals</h2>
      </div>
      <div className={classes.incomeBar}>
        <div className={classes.barTitle}>Income</div>
        <div className={classes.barAmount}>${totalIn.toLocaleString()}</div>
      </div>
      <div className={classes.expensesBar}>
        <div className={classes.barTitle}>Expenses</div>
        <div className={classes.barAmount}>${totalOut.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default TotalsBar;
