import classes from "./IncomeExpensesContainer.module.css";
import IncomeExpenseItem from "../../UI/IncomeExpenseItem";

const IncomeExpensesContainer = () => {
  return (
    <div className={classes.container}>
      <IncomeExpenseItem
        title="Date Night"
        nickname="Nickname"
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
  );
};

export default IncomeExpensesContainer;
