import PlannerAccordion from '../../UI/PlannerAccordion';
import classes from './PlannerContainer.module.css';
import Button from '../../UI/Buttons/Button';
import { useSelector } from 'react-redux';
import { selectPaycheckEntities } from '../../../store/planner-slice';

const PlannerContainer = ({ plannerHandler }) => {
  const checks = useSelector(selectPaycheckEntities);
  // const totalPay = useSelector();

  return (
    <section className={classes.gridArea}>
      <h3>Get Started</h3>
      <p className={classes.intro}>
        Sort out which check should handle each expense!
      </p>
      <div className={classes.actionBar}>
        <div className={classes.actionButton}>
          <Button
            text='Add Planned Income'
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
