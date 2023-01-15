import classes from './PlannerAccordion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faEllipsisH,
  faArrowUp,
  faArrowDown,
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

const PlannerAccordion = ({
  title,
  nickname,
  expectedPay,
  totalPlannedBudget,
  itemIds,
}) => {
  const [isActive, setIsActive] = useState(false);

  let budgeted =
    totalPlannedBudget !== undefined ? totalPlannedBudget.toFixed(2) : 0;
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
                <div className={classes.wrapper}>
                  <div className={classes.orderWrapper}>
                    <div className={classes.orderButton}>
                      <FontAwesomeIcon
                        className={classes.sortArrow}
                        icon={faArrowUp}
                      />
                    </div>
                    <div className={classes.orderButton}>
                      <FontAwesomeIcon
                        className={classes.sortArrow}
                        icon={faArrowDown}
                      />
                    </div>
                  </div>
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
                    itemIds !== [] &&
                    itemIds.map((item, index) => {
                      return (
                        <BudgetItem
                          key={item.id}
                          index={index}
                          title={item.id}
                          date={item.billDate}
                          budgetedAmount={item.budgetAmount}
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
