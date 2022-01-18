import PlannerAccordion from '../../UI/PlannerAccordion';
import classes from './PlannerContainer.module.css';
import Button from '../../UI/Buttons/Button';

const PlannerWrapper = ({ clickHandler, children }) => {
  return (
    <section>
      <h3>Get Started</h3>
      <p className={classes.intro}>
        The planner view is helpful if you or your family get paid more than
        once per month.
      </p>
      <div className={classes.actionBar}>
        <div className={classes.actionButton}>
          <Button
            text='Add Expected Income'
            evenMargin={true}
            clickHandler={clickHandler}
          />
        </div>
      </div>
      <div className={classes.container}>{children}</div>
      <div className={classes.total}>
        <p className={classes.totalTitle}>Total Expected Pay</p>
        <p className={classes.totalAmmount}>$3,100</p>
      </div>
    </section>
  );
};

const PlannerContainer = ({ plannerHandler, checks, items }) => {
  return (
    <PlannerWrapper clickHandler={plannerHandler}>
      {checks && checks.map((check) => {
        return (
          <PlannerAccordion
            key={check.title}
            title={check.title}
            nickname={check.nickname}
            expectedPay={check.expectedPay}
            items={items}
            // checks={checks}
          />
        );
      })}
    </PlannerWrapper>
  );
};

export default PlannerContainer;
