import HighLowToggle from "../../UI/HighLowToggle";
import SinkingFundsItem from "../../UI/SinkingFundItem";
import classes from "./SinkingFundsContainer.module.css";

const dummySinkingFunds = [
  {
    title: "Ring Insurance",
    billDate: "09.12.21",
    timeType: "month",
    timeLength: 12,
    ammount: 100,
  },
  {
    title: "New Surfboard",
    billDate: "09.12.21",
    timeType: "year",
    timeLength: 2,
    ammount: 1500,
  },
];

const SinkingFundsWrapper = (props) => {
  return (
    <section>
      <h3>Get Started</h3>
      <p>
        Calculate how much you need to set aside each month for larger expenses
        and purchases.
      </p>
      <div className={classes.actionBar}>
        <div className={classes.actionButton}>
          <button className={classes.button}>Add a Sinking Fund</button>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.toggleAlign}>
          <HighLowToggle />
        </div>
        {props.children}
      </div>
      <div className={classes.total}>
        <p className={classes.totalTitle}>Total Monthly</p>
        <p className={classes.totalAmmount}>$207.75</p>
      </div>
    </section>
  );
};

const SinkingFundsContainer = () => {
  return (
    <SinkingFundsWrapper>
      {dummySinkingFunds.map((fund) => {
        console.log(fund.timeType === "year" ? fund.timeLength * 12 : fund.timeLength);
        return (
          <SinkingFundsItem
            key={fund.title}
            title={fund.title}
            date={fund.billDate}
            ammount={fund.ammount}
            timeLength={fund.timeType === "year" ? fund.timeLength * 12 : fund.timeLength}
            payment={fund.ammount / fund.timeLength.toFixed(2)}
            timeType={fund.timeType}
          />
        );
      })}
    </SinkingFundsWrapper>
  );
};

export default SinkingFundsContainer;

// BUG 24 years....ugh