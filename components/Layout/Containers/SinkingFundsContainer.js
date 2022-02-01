import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import classes from './SinkingFundsContainer.module.css';
import HighLowToggle from '../../UI/HighLowToggle';
import SinkingFundsItem from '../../UI/SinkingFundItem';
import Button from '../../UI/Buttons/Button';
import { getFunds } from '../../../firebase/sinkingFunds';

const SinkingFundsWrapper = ({ children, clickHandler }) => {
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
            clickHandler={clickHandler}
          />
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.toggleAlign}>
          <HighLowToggle />
        </div>
        {children}
      </div>
      <div className={classes.total}>
        <p className={classes.totalTitle}>Total Monthly</p>
        <p className={classes.totalAmount}>$207.75</p>
      </div>
    </section>
  );
};

const SinkingFundsContainer = ({ fundHandler }) => {
  const [funds, setFunds] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const data = await getFunds(uid);
        setFunds(data);
      }
    });
  }, []);

  return (
    <SinkingFundsWrapper clickHandler={fundHandler}>
      {funds &&
        funds.map((fund) => {
          return (
            <SinkingFundsItem
              key={fund.title}
              title={fund.title}
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
    </SinkingFundsWrapper>
  );
};

export default SinkingFundsContainer;
