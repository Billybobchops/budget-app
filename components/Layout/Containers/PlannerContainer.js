import PlannerAccordion from '../../UI/PlannerAccordion';
import classes from './PlannerContainer.module.css';
import Button from '../../UI/Buttons/Button';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectPaycheckEntities } from '../../../store/planner-slice';
import { selectItemEntities } from '../../../store/items-slice';

const PlannerContainer = ({ plannerHandler }) => {
	const [plannerOrder, setPlannerOrder] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const income = useSelector(selectPaycheckEntities);
  const items = useSelector(selectItemEntities);

  const calcProps = (income, items) => {
    let orderArr = [];
		console.log('items are...', items);
    Object.values(income).map((check) => {
      orderArr.push({
        id: check.id,
        nickname: check.nickname,
        expectedPay: check.expectedPay,
        totalPlannedBudget: 0,
        itemIds: [],
      });
    });
		
    let totalPay = 0;
    Object.values(income).map((check) => {
      totalPay += check.expectedPay;
    });
    setTotalIncome(totalPay);

    Object.values(items).map((item) => {
      orderArr.map((check, i) => {
        if (item.paycheckSelect === check.id) {
          orderArr[i].totalPlannedBudget += item.budgetAmount;
          orderArr[i].itemIds.push(item.id);
        }
      });
    });

		// sort by user defined sort order stored in FB
    // orderArr.sort((a, b) => (a.userOrderIndex > b.userOrderIndex ? -1 : 1));

		setPlannerOrder(orderArr);
  };

  useEffect(() => {
    calcProps(income, items);
  }, [income, items]);

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
          plannerOrder.map((check) => {
            return (
              <PlannerAccordion
                key={check.id}
                title={check.id}
                nickname={check.nickname}
                expectedPay={check.expectedPay}
								totalPlannedBudget={check.totalPlannedBudget}
								itemIds={check.itemIds}
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
