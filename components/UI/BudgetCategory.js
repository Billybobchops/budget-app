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
  const totalExpectedPay = useSelector(
    (state) => state.planner.totalExpectedPay
  );
  let budgeted = 0;

  if (Object.values(items).length !== 0) {
    Object.values(items).map((item) => {
      if (categoryTitle === item.category) budgeted += item.budgetAmount;
      // push budgeted variable to the category slice as a key/val of an obj
    });
  }

  const percent = ((budgeted / totalExpectedPay) * 100).toFixed(2);

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
                        <span className={classes.bold}>Spent</span> $0
                      </div>
                      <div className={classes.slash}>/</div>
                      <div className={classes.budgeted}>${budgeted}</div>
                    </div>
                  </td>
                  <td className={classes.head4}>
                    <div className={classes.under}>Under $567</div>
                  </td>
                  <td className={classes.head5}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </td>
                </tr>
              </Table>
            </div>
            <ul className={classes.list}>
              {isActive &&
                Object.values(items).length !== 0 &&
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
