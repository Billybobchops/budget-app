import classes from './BudgetCategory.module.css';
import { useState, useEffect } from 'react';
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
                      <span className={classes.percentage}> xx% of Income</span>
                    </div>
                  </td>
                  <td className={classes.head3}>
                    <div className={classes.flex}>
                      <div className={classes.spent}>
                        <span className={classes.bold}>Spent</span> $123.43
                      </div>
                      <div className={classes.slash}>/</div>
                      <div className={classes.budgeted}>$1,000.43</div>
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
                        key={item.title}
                        title={item.title}
                        date={item.billDate}
                        spentAmount='$5'
                        budgetedAmount={`$${item.budgetAmount}`}
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
