import classes from './SinkingFundsContainer.module.css';
import HighLowToggle from '../../UI/HighLowToggle';
import SinkingFundsItem from '../../UI/SinkingFundItem';
import Button from '../../UI/Buttons/Button';

const dummySinkingFunds = [
  {
    title: 'Ring Insurance',
    billDate: '09.12.21',
    timeType: 'month',
    timeLength: 12,
    ammount: 52,
  },
  {
    title: 'New Surfboard',
    billDate: '',
    timeType: 'year',
    timeLength: 2,
    ammount: 1500,
  },
  {
    title: 'Dashlane Password Service',
    billDate: '09.12.21',
    timeType: 'month',
    timeLength: 12,
    ammount: 89.88,
  },
  {
    title: 'Car Repairs',
    billDate: '',
    timeType: 'month',
    timeLength: 12,
    ammount: 400,
  },
];

const SinkingFundsWrapper = (props) => {
  return (
    <section>
      <h3>Get Started</h3>
      <p>
        Calculate how much you need to set aside each month for larger expenses
        and annual purchases.
      </p>
      <div className={classes.actionBar}>
        <div className={classes.actionButton}>
          <Button
            text='Add a Sinking Fund'
            evenMargin={true}
            clickHandler={props.clickHandler}
          />
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

const SinkingFundsContainer = (props) => {
  return (
    <SinkingFundsWrapper clickHandler={props.fundHandler}>
      {dummySinkingFunds.map((fund) => {
        return (
          <SinkingFundsItem
            key={fund.title}
            title={fund.title}
            date={fund.billDate}
            ammount={fund.ammount}
            payment={
              fund.timeLength % 12 === 0 && fund.timeType === 'month'
                ? fund.ammount / fund.timeLength
                : fund.ammount / (fund.timeLength * 12)
            }
            timeLength={
              fund.timeLength % 12 === 0 && fund.timeType === 'month'
                ? fund.timeLength / 12
                : fund.timeLength
            }
            timeType={
              fund.timeLength % 12 === 0 && fund.timeType === 'month'
                ? 'year'
                : fund.timeType
            }
          />
        );
      })}
    </SinkingFundsWrapper>
  );
};

export default SinkingFundsContainer;
