import classes from './IncomeExpensesContainer.module.css';
import IncomeExpenseItem from '../../UI/IncomeExpenseItem';
import { useSelector } from 'react-redux';

const IncomeExpensesContainer = () => {
  const expenses = useSelector((state) => state.expenses.entities);

  return (
    <section>
      <div className={classes.title}>
        <h2>Income and Expense Items</h2>
      </div>
      <div className={classes.container}>
        {Object.values(expenses) !== 0 &&
          Object.values(expenses).map((item) => {
            return (
              <IncomeExpenseItem
                key={item.id}
                title={item.id}
                nickname={item.nickname}
                date={item.billDate}
                amount={item.amount}
                expense={item.expense}
              />
            );
          })}
      </div>
    </section>
  );
};

export default IncomeExpensesContainer;
