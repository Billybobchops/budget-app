import classes from "./UpcomingBills.module.css";
import UpcomingBill from "../../UI/UpcomingBill";

const dummyBudgetItems = [
  {
    category: "Wants",
    title: "Date Night",
    billDate: "09.29.21",
    budgetAmount: 50,
    plannedPaycheck: "Paycheck 1",
  },
  {
    category: "Wants",
    title: "Spotify",
    billDate: "09.29.21",
    budgetAmount: 13,
    plannedPaycheck: "Paycheck 1",
  },
  {
    category: "Needs",
    title: "Groceries",
    billDate: "09.29.21",
    budgetAmount: 200,
    plannedPaycheck: "Paycheck 1",
  },
];

// REPLACE UPCOMING BILLS WITH BUDGET ITEM AND DELETE ITS FILE
const UpcomingBills = () => {
  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Upcoming Bills</h2>
      </div>
      <div className={classes.background}>
        {dummyBudgetItems.map((item) => {
          return (
            <UpcomingBill
              key={item.title}
              title={item.title}
              date={item.billDate}
              spentAmount="$5"
              budgetedAmount={item.budgetAmount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingBills;
