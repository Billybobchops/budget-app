import classes from './PlannerAccordion.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BudgetItem from '../UI/BudgetItem';
import { selectItemEntities } from '../../store/items-slice';

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
  const [itemsOrder, setItemsOrder] = useState([]);

  const itemEntities = useSelector(selectItemEntities);

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

  const sortItemIds = useCallback(() => {
    let orderArr = [];

    itemIds.map((item) => {
      orderArr.push({
        title: itemEntities[item].id,
        budgetedAmount: itemEntities[item].budgetAmount,
      });
    });

    orderArr.sort((a, b) => (a.budgetedAmount > b.budgetedAmount ? -1 : 1));
    setItemsOrder(orderArr);
  }, [itemEntities, itemIds]);

  useEffect(() => {
    sortItemIds();
  }, [sortItemIds]);

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
                    itemsOrder.map((item, index) => {
                      return (
                        <BudgetItem
                          key={itemEntities[item.title].id}
                          index={index}
                          title={itemEntities[item.title].id}
                          date={itemEntities[item.title].billDate}
                          budgetedAmount={itemEntities[item.title].budgetAmount}
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
