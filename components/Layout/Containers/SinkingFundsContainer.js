import classes from './SinkingFundsContainer.module.css';
import HighLowToggle from '../../UI/HighLowToggle';
import SinkingFundsItem from '../../UI/SinkingFundItem';
import Button from '../../UI/Buttons/Button';
import { useSelector } from 'react-redux';
import store from '../../../store';
import { calcTotalFund } from '../../../store/fund-slice';

const SinkingFundsContainer = ({ fundHandler }) => {
  store.dispatch(calcTotalFund());
  const funds = useSelector((state) => state.funds.entities);
  const totalFundAmount = useSelector((state) => state.funds.totalFundAmount);

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
            clickHandler={fundHandler}
          />
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.toggleAlign}>
          <HighLowToggle />
        </div>
        {Object.values(funds) !== 0 &&
          Object.values(funds).map((fund) => {
            return (
              <SinkingFundsItem
                key={fund.id}
                title={fund.id}
                billDate={fund.billDate}
                totalAmount={fund.totalAmount}
                payment={
                  fund.timePeriod % 12 === 0 && fund.timeType === 'Month'
                    ? fund.totalAmount / fund.timePeriod
                    : fund.totalAmount / (fund.timePeriod * 12)
                }
                timePeriod={
                  fund.timePeriod % 12 === 0 && fund.timeType === 'Month'
                    ? fund.timePeriod / 12
                    : fund.timePeriod
                }
                timeType={
                  fund.timePeriod % 12 === 0 && fund.timeType === 'Month'
                    ? 'Year'
                    : fund.timeType
                }
              />
            );
          })}
      </div>
      <div className={classes.total}>
        <p className={classes.totalTitle}>Total Monthly</p>
        <p className={classes.totalAmount}>${totalFundAmount.toLocaleString()}</p>
      </div>
    </section>
  );
};

export default SinkingFundsContainer;
