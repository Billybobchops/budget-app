import classes from './IncomeExpensesContainer.module.css';
import IncomeExpenseItem from '../../UI/IncomeExpenseItem';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import Skeleton from 'react-loading-skeleton';

const IncomeExpensesContainer = () => {
  const expenses = useSelector((state) => state.expenses.entities);
  const { user: isLoggedIn } = useAuth();

  const containerClass =
    Object.values(expenses) && isLoggedIn
      ? classes.container
      : classes.containerLoading;

  return (
    <section>
      <div className={classes.title}>
        <h2>Income and Expense Items</h2>
      </div>
      <div className={containerClass}>
        {Object.values(expenses) && isLoggedIn ? (
          Object.values(expenses).map((item) => {
            return (
              <IncomeExpenseItem
                key={item.id}
                title={item.title}
                nickname={item.nickname}
                date={item.billDate}
                amount={item.amount}
                expense={item.expense}
              />
            );
          })
        ) : (
          <Skeleton
            borderRadius={0}
            count={5}
            height={46}
            style={{
              marginBottom: '14px',
            }}
          />
        )}
      </div>
    </section>
  );
};

export default IncomeExpensesContainer;
