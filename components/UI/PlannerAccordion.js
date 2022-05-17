import classes from './PlannerAccordion.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BudgetItem from '../UI/BudgetItem';

const Table = (props) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

const PlannerAccordion = ({ title, nickname, expectedPay }) => {
  const [isActive, setIsActive] = useState(false);
  const itemIds = useSelector(
    (state) => state.itemsAndPlanner.totalBudgetedPlanner[title]?.itemIds
  );
  const itemEntities = useSelector(
    (state) => state.itemsAndPlanner.items.entities
  );
  const totalPlannedBudget = useSelector(
    (state) => state.itemsAndPlanner.totalBudgetedPlanner
  );
  let budgeted =
    totalPlannedBudget[title] !== undefined
      ? totalPlannedBudget[title].budgeted
      : 0;
  let balanceClass = null;
  let balanceString = null;

  if (expectedPay === budgeted) {
    balanceClass = 'balanced';
    balanceString = `Balanced!`;
  }

  if (expectedPay >= budgeted) {
    balanceClass = 'under';
    let num =
      (expectedPay - budgeted) % 1 === 0
        ? expectedPay - budgeted
        : (expectedPay - budgeted).toFixed(2);
    balanceString = `$${num} Under`;
  }

  if (expectedPay <= budgeted) {
    balanceClass = 'over';
    let num =
      (budgeted - expectedPay) % 1 === 0
        ? budgeted - expectedPay
        : (budgeted - expectedPay).toFixed(2);
    balanceString = `$${num} Over`;
  }

  const activeHandler = () => {
    setIsActive(!isActive);
  };

  const toggle = isActive ? (
    <FontAwesomeIcon icon={faMinus} className={classes.toggle} />
  ) : (
    <FontAwesomeIcon icon={faPlus} className={classes.toggle} />
  );

  return (
    <>
      <Droppable droppableId={title} key={title}>
        {(provided, snapshot) => {
          return (
            <div
              className={`${snapshot.isDraggingOver && classes.backgroundDrag}`}
            >
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div onClick={activeHandler}>
                  <Table>
                    <tr>
                      <td className={classes.head1}>{toggle}</td>
                      <td className={classes.head2}>
                        <div className={classes.title}>
                          {title} -
                          <span className={classes.percentage}>
                            {' '}
                            {nickname}
                          </span>
                        </div>
                      </td>
                      <td className={classes.head3}>
                        <div className={classes.flex}>
                          <div className={classes.spent}>
                            <span className={classes.bold}>Expected</span> $
                            {expectedPay}
                          </div>
                          <div className={classes.slash}>/</div>
                          <div className={classes.budgeted}>
                            <span className={classes.bold}>Budgeted</span> $
                            {budgeted}
                          </div>
                        </div>
                      </td>
                      <td className={classes.head4}>
                        <div className={classes[balanceClass]}>
                          {balanceString}
                        </div>
                      </td>
                      <td className={classes.head5}>
                        <FontAwesomeIcon icon={faEllipsisH} />
                      </td>
                    </tr>
                  </Table>
                </div>

                <ul className={classes.list}>
                  {isActive && (
                    <div className={classes.activeBar}>
                      <div className={classes.activeFraction}>
                        <div className={classes.flex}>
                          <div className={classes.spent}>
                            <span className={classes.bold}>Expected</span> $
                            {expectedPay}
                          </div>
                          <div className={classes.slash}>/</div>
                          <div className={classes.budgeted}>
                            <span className={classes.bold}>Budgeted</span> $
                            {budgeted}
                          </div>
                        </div>
                      </div>

                      <div className={classes.activeBalanceChip}>
                        <div className={classes[balanceClass]}>
                          {balanceString}
                        </div>
                      </div>
                    </div>
                  )}
                  {isActive &&
                    itemIds !== undefined &&
                    itemIds.map((item, index) => {
                      return (
                        <BudgetItem
                          key={itemEntities[item].id}
                          index={index}
                          title={itemEntities[item].id}
                          date={itemEntities[item].billDate}
                          budgetedAmount={itemEntities[item].budgetAmount}
                          // spentAmount='$5'
                        />
                      );
                    })}
                  {provided.placeholder}
                </ul>
              </div>
            </div>
          );
        }}
      </Droppable>
    </>
  );
};

export default PlannerAccordion;
