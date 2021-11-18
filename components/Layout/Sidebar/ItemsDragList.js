import classes from "./ItemsDragList.module.css";
import UpcomingBill from "../../UI/UpcomingBill";

const dummyBudgetItems = [
  {
    category: "Wants",
    title: "Date Night",
    billDate: "2021-09-29",
    budgetAmount: 50,
    plannedPaycheck: "Paycheck 1",
  },
  {
    category: "Wants",
    title: "Spotify",
    billDate: "2021-09-29",
    budgetAmount: 13,
    plannedPaycheck: "Paycheck 1",
  },
  {
    category: "Needs",
    title: "Groceries",
    billDate: "2021-09-29",
    budgetAmount: 200,
    plannedPaycheck: "Paycheck 1",
  },
];

const ItemsDragList = () => {
  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Drag Budget Items to a Paycheck</h2>
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

export default ItemsDragList;
