import classes from './BudgetCategory.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import BudgetItem from '../UI/BudgetItem';
import { Droppable } from 'react-beautiful-dnd';

const Table = ({ children }) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

const BudgetCategory = ({ categoryTitle, tabID }) => {
  const [isActive, setIsActive] = useState(false);

  const spentCategories = useSelector(
    (state) => state.expenses.spentCategories
  );
  let totalExpectedPay = useSelector(
    (state) => state.itemsAndPlanner.totalExpectedPay
  );
  const totalBudgeted = useSelector(
    (state) => state.itemsAndPlanner.totalBudgetedCategory
  );
  const itemIds = useSelector(
    (state) =>
      state.itemsAndPlanner.totalBudgetedCategory[categoryTitle]?.itemIds
  );
  const itemEntities = useSelector(
    (state) => state.itemsAndPlanner.items.entities
  );

  const spent =
    spentCategories[categoryTitle] !== undefined
      ? spentCategories[categoryTitle].spent
      : 0;

  let budgeted =
    totalBudgeted[categoryTitle] !== undefined
      ? +totalBudgeted[categoryTitle].budgeted.toFixed(2)
      : 0;
  if (tabID === 'Annual') {
    budgeted = +(budgeted * 12).toFixed(2);
    totalExpectedPay = totalExpectedPay * 12;
  }

  const percent = totalExpectedPay ? (
    <span className={classes.percentage}>
      {((budgeted / totalExpectedPay) * 100).toFixed(2)}% of Income
    </span>
  ) : (
    ''
  );

  let balanceClass = null;
  let balanceString = null;

  if (spent === budgeted) {
    balanceClass = 'balanced';
    balanceString = `Balanced!`;
  }
  if (spent > budgeted) {
    balanceClass = 'over';
    let num =
      (spent - budgeted) % 1 === 0
        ? spent - budgeted
        : (spent - budgeted).toFixed(2);
    balanceString = `$${num.toLocaleString()} Over`;
  }

  if (spent < budgeted) {
    balanceClass = 'under';
    let num =
      (budgeted - spent) % 1 === 0
        ? budgeted - spent
        : +(budgeted - spent).toFixed(2);
    balanceString = `$${num.toLocaleString()} Under`;
  }

  if (spent === 0 && budgeted === 0) {
    balanceClass = '';
    balanceString = '';
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
      <Droppable droppableId={categoryTitle} key={categoryTitle}>
        {(provided, snapshot) => (
          <div
            className={`${snapshot.isDraggingOver && classes.backgroundDrag}`}
          >
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div onClick={activeHandler}>
                <Table>
                  <tr>
                    <td className={classes.head1}>{toggle}</td>
                    <td className={classes.head2}>
                      <div className={classes.title}>
                        {categoryTitle}
                        {percent}
                      </div>
                    </td>
                    <td className={classes.head3}>
                      <div className={classes.flex}>
                        <div className={classes.spent}>
                          <span className={classes.bold}>Spent</span> ${spent}
                        </div>
                        <div className={classes.slash}>/</div>
                        <div className={classes.budgeted}>
                          ${budgeted.toLocaleString()}
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
                          <span className={classes.bold}>Spent</span> ${spent}
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
                    if (categoryTitle === itemEntities[item].category)
                      return (
                        <BudgetItem
                          key={itemEntities[item].id}
                          index={index}
                          title={itemEntities[item].id}
                          date={itemEntities[item].billDate}
                          budgetedAmount={itemEntities[item].budgetAmount}
													tabID={tabID}
                        />
                      );
                  })}
                {provided.placeholder}
              </ul>
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default BudgetCategory;
