import classes from './SinkingFundsContainer.module.css';
import HighLowToggle from '../../UI/HighLowToggle';
import SinkingFundsItem from '../../UI/SinkingFundItem';
import Button from '../../UI/Buttons/Button';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFundEntities } from '../../../store/fund-slice';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../../hooks/useAuth';

const SinkingFundsContainer = ({ fundHandler }) => {
  const funds = useSelector(selectFundEntities);
  const [fundsOrder, setFundsOrder] = useState([]);
  const { user: isLoggedIn } = useAuth();

  const containerBackgroundClass =
    Object.values(funds).length !== 0 && isLoggedIn
      ? classes.container
      : classes.containerLoading;

  const calcTotalFundAmount = (funds) => {
    let arr = [];
    console.log('calcTotalFundAmount is running...a bunch');
    Object.values(funds).map((fund) => {
      let months;
      if (fund.timeType === 'Year') months = fund.timePeriod * 12;
      if (fund.timeType === 'Month') months = fund.timePeriod;
      arr.push(+(fund.totalAmount / months).toFixed(2));
    });

    const total = arr.reduce((acc, current) => {
      return acc + current;
    }, 0);
    return total;
  };
  const totalFundAmount = calcTotalFundAmount(funds);

  const initFundsOrder = (funds) => {
    let orderArr = [];

    Object.values(funds).map((fund) => {
      orderArr.push({
        billDate: fund.billDate,
        totalAmount: fund.totalAmount,
        id: fund.id,
        timePeriod: fund.timePeriod,
        timeType: fund.timeType,
      });
    });

    orderArr.sort((a, b) => (a.totalAmount > b.totalAmount ? -1 : 1));
    setFundsOrder(orderArr);
  };

  useEffect(() => {
    initFundsOrder(funds);
  }, [funds]);

  const toggleSort = () => {
    const orderClone = [...fundsOrder];
    const reverseOrder = orderClone.reverse();
    setFundsOrder(reverseOrder);
  };

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
      <div className={containerBackgroundClass}>
        {Object.values(funds) !== 0 && isLoggedIn ? (
          <div className={classes.toggleAlign}>
            <HighLowToggle
              toggleOptions={['High to Low', 'Low to High']}
              toggleSortFn={toggleSort}
            />
          </div>
        ) : (
          ''
        )}

        {Object.values(funds) !== 0 && isLoggedIn ? (
          fundsOrder.map((fund) => {
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
          })
        ) : (
          <Skeleton
            borderRadius={0}
            count={4}
            height={64}
            style={{
              marginBottom: '14px',
            }}
          />
        )}
      </div>
      <div className={classes.total}>
        <p className={classes.totalTitle}>Total Monthly</p>
        <p className={classes.totalAmount}>
          ${totalFundAmount.toLocaleString()}
        </p>
      </div>
    </section>
  );
};

export default SinkingFundsContainer;
