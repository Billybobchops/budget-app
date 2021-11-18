import PlannerAccordion from "../../UI/PlannerAccordion";
import classes from "./PlannerContainer.module.css";

const PlannerWrapper = (props) => {
  return (
    <section>
      <div className={classes.actionBar}>
        <div className={classes.actionButton}>
          <button className={classes.button}>Add Expected Income</button>
        </div>
      </div>
      <div className={classes.container}>{props.children}</div>
      <div className={classes.total}>
        <p className={classes.totalTitle}>Total Expected Pay</p>
        <p className={classes.totalAmmount}>$3,100</p>
      </div>
    </section>
  );
};

const PlannerContainer = () => {
  return (
    <PlannerWrapper>
      <PlannerAccordion title="Paycheck 1" nickname="B1" />
      <PlannerAccordion title="Paycheck 2" nickname="K1" />
      <PlannerAccordion title="Paycheck 3" nickname="B2" />
      <PlannerAccordion title="Paycheck 4" nickname="K2" />
    </PlannerWrapper>
  );
};

export default PlannerContainer;
