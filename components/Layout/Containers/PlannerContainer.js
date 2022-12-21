import PlannerAccordion from '../../UI/PlannerAccordion';
import classes from './PlannerContainer.module.css';
import Button from '../../UI/Buttons/Button';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectPaycheckEntities } from '../../../store/planner-slice';

const PlannerContainer = ({ plannerHandler }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const income = useSelector(selectPaycheckEntities);

  const calcTotalPay = useCallback(() => {
    let totalPay = 0;
    Object.values(income).map((check) => {
      totalPay += check.expectedPay;
    });
    setTotalIncome(totalPay);
  }, [income]);

  useEffect(() => {
    calcTotalPay();
  }, [calcTotalPay]);

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
        {Object.values(income).length !== 0 &&
          Object.values(income).map((check) => {
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
        <p className={classes.totalAmmount}>${totalIncome.toLocaleString()}</p>
      </div>
    </section>
  );
};

export default PlannerContainer;
