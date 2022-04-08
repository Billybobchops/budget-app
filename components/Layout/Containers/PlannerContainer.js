import PlannerAccordion from '../../UI/PlannerAccordion';
import classes from './PlannerContainer.module.css';
import Button from '../../UI/Buttons/Button';
import { useSelector } from 'react-redux';

const PlannerContainer = ({ plannerHandler }) => {
  const checks = useSelector((state) => state.itemsAndPlanner.planner.entities);
  const totalPay = useSelector(
    (state) => state.itemsAndPlanner.totalExpectedPay
  );

  return (
    <section className={classes.gridArea}>
      <h3>Get Started</h3>
      <p>
        The planner view is helpful if you or your family get paid more than
        once per month.
      </p>
      <p className={classes.intro}>
        Sort out which check should handle each expense!
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
              />
            );
          })}
      </div>
      <div className={classes.total}>
        <p className={classes.totalTitle}>Total Expected Pay</p>
        <p className={classes.totalAmmount}>${totalPay.toLocaleString()}</p>
      </div>
    </section>
  );
};

export default PlannerContainer;
