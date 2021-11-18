import classes from "./IncomeExpensesContainer.module.css";
import IncomeExpenseItem from "../../UI/IncomeExpenseItem";

const IncomeExpensesContainer = () => {
  return (
    <section>
      <div className={classes.title}>
        <h2>Income and Expense Items</h2>
      </div>
      <div className={classes.container}>
        <IncomeExpenseItem
          title="Test Item with Long Name"
          nickname="Test Nickname"
          date="09.02.21"
          amount="$50.85"
          expense={true}
        />
        <IncomeExpenseItem
          title="Paycheck 1"
          nickname="Nickname"
          date="09.02.21"
          amount="$1005.85"
          expense={false}
        />
      </div>
    </section>
  );
};

export default IncomeExpensesContainer;
