import classes from './BudgetItem.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

const BudgetItem = ({ title, index, budgetedAmount, date }) => {
  // className={`${[classes.container, classes[`${snapshot.isDragging && "backgroundDrag"}`],].join(" ")}`}
  const daySlice = date.slice(-2);
  const today = new Date().getDate();
  const dateString = +daySlice === today ? 'Today' : date;
  // const displayDate = `${
  //   dateString === 'Today' ? `Bills` : 'Bills on'
  // } ${dateString}`;

  const displayDate = `${dateString === 'Today' ? `Today` : date}`;

  const expenses = useSelector((state) => state.expenses.entities);
  let balanceClass = null;
  let balanceString = null;
  let spent = 0;

  // would it be better to do this via item-slice once on fetch?
  // instead of every time the accordion opens/closes...
  if (Object.values(expenses).length !== 0) {
    Object.values(expenses).map((expense) => {
      if (title === expense.title) spent += expense.amount;
      // console.log('func running'); // 20 freaking times for 5 items! Must fix.
      // runs for each item for EVERY SINGLE EXPENSE that's in state....
    });
  }

  if (spent === budgetedAmount) {
    balanceClass = 'balanced';
    balanceString = '✅ Balanced';
  }
  if (spent > budgetedAmount) {
    balanceClass = 'over';
    balanceString = '🔺 Over';
  }
  if (spent < budgetedAmount) {
    balanceClass = 'under';
    balanceString = '🎉 Under';
  }

  return (
    <>
      <Draggable key={title} draggableId={title} index={index}>
        {(provided, snapshot) => {
          const style = `${[
            classes.container,
            classes[`${snapshot.isDragging && 'backgroundDrag'}`],
          ].join(' ')}`;

          return (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={style}
            >
              <table className={classes.table}>
                <tbody>
                  <tr className={classes.initialRow}>
                    <td className={classes.emptyCell}></td>
                    <td className={classes.col1}>{title}</td>
                    <td className={classes.col2}>
                      <div>{displayDate}</div>
                    </td>
                    <td className={classes.col3}>
                      <div className={classes.flex}>
                        <div>
                          <span className={classes.bold}>Spent</span> ${spent}
                        </div>
                        <div className={classes.slash}>/</div>
                        <div>${budgetedAmount}</div>
                      </div>
                    </td>
                    <td className={classes.col4}>
                      <div className={classes[balanceClass]}>
                        {balanceString}!
                      </div>
                    </td>
                    <td className={classes.col5}>
                      {/* this ellipsis needs to be wrapped by <button> to be interactive */}
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className={classes.secondaryRow}>
                <div className={classes.bold}>{title}</div>
                <div className={classes.date}>{displayDate}</div>
                <div className={classes.flex}>
                  <div className={classes.spent}>${spent}</div>
                  <div className={classes.slash}>/</div>
                  <div className={classes.budgeted}>${budgetedAmount}</div>
                </div>
                <div className={classes[balanceClass]}>{balanceString}!</div>
                <div className={classes.options}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
              </div>
            </li>
          );
        }}
      </Draggable>
    </>
  );
};

export default BudgetItem;
