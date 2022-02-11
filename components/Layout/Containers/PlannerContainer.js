import PlannerAccordion from '../../UI/PlannerAccordion';
import classes from './PlannerContainer.module.css';
import Button from '../../UI/Buttons/Button';
import { useSelector } from 'react-redux';

import store from '../../../store';
import { calcTotalPay } from '../../../store/planner-slice';

const PlannerContainer = ({ plannerHandler, items }) => {
  store.dispatch(calcTotalPay());
  const checks = useSelector((state) => state.planner.entities);
  const totalPay = useSelector((state) => state.planner.totalExpectedPay);

  return (
    <section>
      <h3>Get Started</h3>
      <p className={classes.intro}>
        The planner view is helpful if you or your family get paid more than
        once per month. Sort which check should handle each expense!
      </p>
      <div className={classes.actionBar}>
        <div className={classes.actionButton}>
          <Button
            text='Add Expected Income'
            evenMargin={true}
            clickHandler={plannerHandler}
          />
        </div>
      </div>
      <div className={classes.container}>
        {Object.values(checks).length !== 0 &&
          Object.values(checks).map((check) => {
            return (
              <PlannerAccordion
                key={check.id}
                title={check.id}
                nickname={check.nickname}
                expectedPay={check.expectedPay}
                // items={items}
                // checks={checks}
              />
            );
          })}
      </div>
      <div className={classes.total}>
        <p className={classes.totalTitle}>Total Expected Pay</p>
        <p className={classes.totalAmmount}>${totalPay}</p>
      </div>
    </section>
  );
};

export default PlannerContainer;
