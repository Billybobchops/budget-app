import classes from './PlannerAccordion.module.css';
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
                            <span className={classes.bold}>Budgeted</span>{' '}
                            $43.25
                          </div>
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

                {isActive && (
                  <ul className={classes.list}>
                    {items.map((item, index) => {
                      if (title === item.plannedPaycheck)
                        return (
                          <BudgetItem
                            key={item.title}
                            index={index}
                            title={item.title}
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
