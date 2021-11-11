import classes from "./TotalsBar.module.css";

const TotalsBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h2>Totals</h2>
      </div>
      <div className={classes.incomeBar}>
        <div className={classes.barTitle}>Income</div>
        <div className={classes.barAmount}>$100.45</div>
      </div>
      <div className={classes.expensesBar}>
        <div className={classes.barTitle}>Expenses</div>
        <div className={classes.barAmount}>$20.35</div>
      </div>
    </div>
  );
};

export default TotalsBar;
