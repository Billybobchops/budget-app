import classes from "./BudgetMessage.module.css";

const BudgetMessage = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.messageTitle}>
        <h2>Congrats!</h2>
      </div>
      <div className={classes.background}>
        <p className={classes.message}>
          You are currently $xx.xx under budget!
        </p>
      </div>
    </div>
  );
};

export default BudgetMessage;
