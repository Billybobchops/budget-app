import PlannerAccordion from '../../UI/PlannerAccordion';
import classes from './PlannerContainer.module.css';
import Button from '../../UI/Buttons/Button';

const PlannerWrapper = (props) => {
  return (
    <section>
      <div className={classes.actionBar}>
        <div className={classes.actionButton}>
          <Button text='Add Expected Income' evenMargin={true} ç/>
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

const PlannerContainer = (props) => {
  return (
    <PlannerWrapper clickHandler={props.plannerHandler}>
      {props.checks.map((check) => {
        return (
          <PlannerAccordion
            key={check.title}
            title={check.title}
            nickname={check.nickname}
            expectedPay={check.expectedPay}
            items={props.items}
            checks={props.checks}
          />
        );
      })}
    </PlannerWrapper>
  );
};

export default PlannerContainer;
