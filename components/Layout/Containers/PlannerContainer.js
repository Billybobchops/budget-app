import PlannerAccordion from "../../UI/PlannerAccordion";
import classes from "./PlannerContainer.module.css";

const dummyPaychecks = [
  {
    title: "Paycheck 1",
    nickname: "Test Nickname B1",
    expectedPay: 700,
  },
  {
    title: "Paycheck 2",
    nickname: "Test Nickname K1",
    expectedPay: 850,
  },
  {
    title: "Paycheck 3",
    nickname: "Test Nickname B2",
    expectedPay: 700,
  },
  {
    title: "Paycheck 4",
    nickname: "Test Nickname K2",
    expectedPay: 850,
  },
];

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
      {dummyPaychecks.map((check) => {
        return (
          <PlannerAccordion
            key={check.title}
            title={check.title}
            nickname={check.nickname}
            expectedPay={check.expectedPay}
          />
        );
      })}
    </PlannerWrapper>
  );
};

export default PlannerContainer;
