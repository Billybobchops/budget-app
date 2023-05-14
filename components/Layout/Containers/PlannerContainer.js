import PlannerAccordion from '../../UI/PlannerAccordion';
import classes from './PlannerContainer.module.css';
import Button from '../../UI/Buttons/Button';
import { useAuth } from '../../../hooks/useAuth';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { selectPaycheckEntities } from '../../../store/planner-slice';

const PlannerContainer = ({
  plannerHandler,
  plannerOrder,
  totalIncome,
  userSortPaycheckOrderFn,
}) => {
  const income = useSelector(selectPaycheckEntities);
  const { user: isLoggedIn } = useAuth();

  const containerBackgroundClass =
    Object.values(income).length !== 0 && isLoggedIn
      ? classes.container
      : classes.containerLoading;

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
      <div className={containerBackgroundClass}>
        {Object.values(income).length !== 0 && isLoggedIn ? (
          plannerOrder.map((check) => {
            if (check.id === 'ItemsDragList') return;

            return (
              <PlannerAccordion
                key={check.id}
                title={check.id}
                nickname={check.nickname}
                expectedPay={check.expectedPay}
                totalPlannedBudget={check.totalPlannedBudget}
                itemIds={check.itemIds}
                userSortPaycheckOrderFn={userSortPaycheckOrderFn}
              />
            );
          })
        ) : (
          <Skeleton
            borderRadius={0}
            count={4}
            height={66}
            style={{
              marginBottom: '10px',
            }}
          />
        )}
      </div>

      {Object.values(income).length !== 0 && isLoggedIn ? (
        <div className={classes.total}>
          <p className={classes.totalTitle}>Total Expected Pay</p>
          <p className={classes.totalAmmount}>
            ${totalIncome.toLocaleString()}
          </p>
        </div>
      ) : (
        <Skeleton borderRadius={0} height={64} />
      )}
    </section>
  );
};

export default PlannerContainer;
