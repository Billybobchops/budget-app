import classes from './PlannerAccordion.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BudgetItem from '../UI/BudgetItem';
import { Droppable } from 'react-beautiful-dnd';

const Table = (props) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

const PlannerAccordion = ({ title, nickname, expectedPay, items }) => {
  const [isActive, setIsActive] = useState(false);
  const totalPlannedBudget = useSelector(
    (state) => state.items.totalBudgetedPlanner
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
    balanceString = `$${expectedPay - budgeted} Under`;
  }

  if (expectedPay <= budgeted) {
    balanceClass = 'over';
    balanceString = `$${budgeted - expectedPay} Over`;
  }

  const activeHandler = () => {
    setIsActive(!isActive);
  };

  const chevron = isActive ? (
    <FontAwesomeIcon icon={faChevronDown} className={classes.chevron} />
  ) : (
    <FontAwesomeIcon icon={faChevronUp} className={classes.chevron} />
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
                      <td className={classes.head1}>{chevron}</td>
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
                            <span className={classes.bold}>Expected Pay</span> $
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

                {isActive && Object.values(items).length !== 0 && (
                  <ul className={classes.list}>
                    {Object.values(items).map((item, index) => {
                      if (title === item.paycheckSelect)
                        return (
                          <BudgetItem
                            key={item.id}
                            index={index}
                            title={item.id}
                            date={item.billDate}
                            spentAmount='$5'
                            budgetedAmount={item.budgetAmount}
                          />
                        );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </div>
            </div>
          );
        }}
      </Droppable>
    </>
  );
};

export default PlannerAccordion;
