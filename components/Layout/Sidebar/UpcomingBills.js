import classes from "./UpcomingBills.module.css";

const UpcomingBills = () => {
  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Upcoming Bills</h2>
      </div>
      <div className={classes.background}>
        <p>Upcoming Bills will go here!</p>
        <p>Upcoming Bills will go here!</p>
        <p>Upcoming Bills will go here!</p>
      </div>
    </div>
  );
};

export default UpcomingBills;
