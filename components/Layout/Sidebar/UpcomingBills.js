import classes from "./UpcomingBills.module.css";
import UpcomingBill from "../../UI/UpcomingBill";

const UpcomingBills = () => {
  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Upcoming Bills</h2>
      </div>
      <div className={classes.background}>
        <UpcomingBill
          title="Groceries"
          date="09.02.21"
          spentAmount="$50"
          budgetedAmount="$200"
        />
        <UpcomingBill
          title="Ring Insurance"
          date="09.02.21"
          spentAmount="$52"
          budgetedAmount="$52"
        />
        <UpcomingBill
          title="Date Night"
          date="09.02.21"
          spentAmount="$50"
          budgetedAmount="$50"
        />
        <UpcomingBill
          title="Date Night"
          date="09.02.21"
          spentAmount="$50"
          budgetedAmount="$50"
        />
        <UpcomingBill
          title="Date Night"
          date="09.02.21"
          spentAmount="$50"
          budgetedAmount="$50"
        />
      </div>
    </div>
  );
};

export default UpcomingBills;
