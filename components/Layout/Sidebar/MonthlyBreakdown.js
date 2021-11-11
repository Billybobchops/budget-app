import classes from "./MonthlyBreakdown.module.css";

const MonthlyBreakdown = () => {
  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Monthly Breakdown</h2>
      </div>
      <div className={classes.background}>
        <p>
          Pie chart will go here! Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Cras ac ante rutrum, feugiat nunc nec, suscipit quam.
          Aliquam facilisis tincidunt nulla, placerat pulvinar nibh dictum nec.
          Phasellus nulla felis, tristique non dictum ut, luctus tincidunt
          lorem. Vestibulum venenatis viverra lacinia. Curabitur eget porttitor
          massa. Sed a ligula at mi tincidunt egestas.
        </p>
      </div>
    </div>
  );
};

export default MonthlyBreakdown;
