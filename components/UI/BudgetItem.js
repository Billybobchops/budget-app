import classes from "./BudgetItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

const BudgetItem = (props) => {
  return (
    <>
      <Draggable
        key={props.title}
        draggableId={props.title}
        index={props.index}
      >
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classes.container}
          >
            <table className={classes.table}>
              <tbody>
                <tr className={classes.initialRow}>
                  <td className={classes.emptyCell}></td>
                  <td className={classes.col1}>
                    <div className={classes.bold}>{props.title}</div>
                  </td>
                  <td className={classes.col2}>
                    <div>{`Bills on ${props.date}`}</div>
                  </td>
                  <td className={classes.col3}>
                    <div className={classes.flex}>
                      <div>
                        <span className={classes.bold}>Spent</span>{" "}
                        {props.spentAmount}
                      </div>
                      <div className={classes.slash}>/</div>
                      <div>{props.budgetedAmount}</div>
                    </div>
                  </td>
                  <td className={classes.col4}>
                    <div className={classes.under}>Balanced!</div>
                  </td>
                  <td className={classes.col5}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={classes.secondaryRow}>
              <div className={classes.bold}>{props.title}</div>
              <div className={classes.date}>{`Bills on ${props.date}`}</div>
              <div className={classes.flex}>
                <div className={classes.spent}>{props.spentAmount}</div>
                <div className={classes.slash}>/</div>
                <div className={classes.budgeted}>{props.budgetedAmount}</div>
              </div>
              <div className={classes.under}>Balanced!</div>
              <div className={classes.options}>
                <FontAwesomeIcon icon={faEllipsisH} />
              </div>
            </div>
          </li>
        )}
      </Draggable>
      {/* {provided.placeholder} */}
    </>
  );
};

export default BudgetItem;
