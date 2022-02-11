import classes from './BudgetItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

const BudgetItem = ({ title, index, budgetedAmount, spentAmount, date }) => {
  // className={`${[classes.container, classes[`${snapshot.isDragging && "backgroundDrag"}`],].join(" ")}`}

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
                    <td className={classes.col1}>
                      <div className={classes.bold}>{title}</div>
                    </td>
                    <td className={classes.col2}>
                      <div>{`Bills on ${date}`}</div>
                    </td>
                    <td className={classes.col3}>
                      <div className={classes.flex}>
                        <div>
                          <span className={classes.bold}>Spent</span>{' '}
                          {spentAmount}
                        </div>
                        <div className={classes.slash}>/</div>
                        <div>{budgetedAmount}</div>
                      </div>
                    </td>
                    <td className={classes.col4}>
                      <div className={classes.under}>Balanced!</div>
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
                <div className={classes.date}>{`Bills on ${date}`}</div>
                <div className={classes.flex}>
                  <div className={classes.spent}>{spentAmount}</div>
                  <div className={classes.slash}>/</div>
                  <div className={classes.budgeted}>{budgetedAmount}</div>
                </div>
                <div className={classes.under}>Balanced!</div>
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
