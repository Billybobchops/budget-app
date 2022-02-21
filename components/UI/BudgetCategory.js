import classes from './BudgetCategory.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
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

const BudgetCategory = ({ categoryTitle }) => {
  const [isActive, setIsActive] = useState(false);
  const items = useSelector((state) => state.items.entities);
  const spentCategories = useSelector(
    (state) => state.expenses.spentCategories
  );
  const totalExpectedPay = useSelector(
    (state) => state.planner.totalExpectedPay
  );
  const totalBudgeted = useSelector((state) => state.items.totalBudgeted);
  const spent =
    spentCategories[categoryTitle] !== undefined
      ? spentCategories[categoryTitle].spent
      : 0;
  let budgeted =
    totalBudgeted[categoryTitle] !== undefined
      ? totalBudgeted[categoryTitle].budgeted
      : 0;
  const percent = ((budgeted / totalExpectedPay) * 100).toFixed(2);
  let balanceClass = null;
  let balanceString = null;

  if (spent === budgeted) {
    balanceClass = 'balanced';
    balanceString = `Balanced!`;
  }
  if (spent > budgeted) {
    balanceClass = 'over';
    balanceString = `$${spent - budgeted} Over`;
  }
  if (spent < budgeted) {
    balanceClass = 'under';
    balanceString = `$${budgeted - spent} Under`;
  }

  if (spent === 0 && budgeted === 0) {
    balanceClass = '';
    balanceString = '';
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
      <Droppable droppableId={categoryTitle}>
        {(provided) => (
          <>
            <div
              onClick={activeHandler}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Table>
                <tr>
                  <td className={classes.head1}>{chevron}</td>
                  <td className={classes.head2}>
                    <div className={classes.title}>
                      {categoryTitle} -
                      <span className={classes.percentage}>
                        {' '}
                        {percent}% of Income
                      </span>
                    </div>
                  </td>
                  <td className={classes.head3}>
                    <div className={classes.flex}>
                      <div className={classes.spent}>
                        <span className={classes.bold}>Spent</span> ${spent}
                      </div>
                      <div className={classes.slash}>/</div>
                      <div className={classes.budgeted}>${budgeted}</div>
                    </div>
                  </td>
                  <td className={classes.head4}>
                    <div className={classes[balanceClass]}>{balanceString}</div>
                  </td>
                  <td className={classes.head5}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </td>
                </tr>
              </Table>
            </div>
            <ul className={classes.list}>
              {isActive &&
                Object.values(items).map((item, index) => {
                  if (categoryTitle === item.category)
                    return (
                      <BudgetItem
                        key={item.id}
                        title={item.id}
                        date={item.billDate}
                        budgetedAmount={item.budgetAmount}
                        index={index}
                      />
                    );
                })}
              {provided.placeholder}
            </ul>
          </>
        )}
      </Droppable>
    </>
  );
};

export default BudgetCategory;
