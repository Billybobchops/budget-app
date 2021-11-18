import classes from "./IncomeExpensesContainer.module.css";
import IncomeExpenseItem from "../../UI/IncomeExpenseItem";

const dummyIncomeExpenseItems = [
  {
    title: "Test Item with Long Name",
    nickname: "Test Nickname",
    date: "09.02.21",
    ammount: 50.85,
    expense: true,
  },
  {
    title: "Paycheck 1",
    nickname: "Nickname",
    date: "09.02.21",
    ammount: 1005.85,
    expense: false,
  },
];

const IncomeExpensesContainer = () => {
  return (
    <section>
      <div className={classes.title}>
        <h2>Income and Expense Items</h2>
      </div>
      <div className={classes.container}>
        {dummyIncomeExpenseItems.map((item) => {
          return (
            <IncomeExpenseItem
              key={item.title}
              title={item.title}
              nickname={item.nickname}
              date={item.date}
              ammount={item.ammount}
              expense={item.expense}
            />
          );
        })}
      </div>
    </section>
  );
};

export default IncomeExpensesContainer;
