import classes from "./BudgetItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const BudgetItem = (props) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td className={classes.emptyCell}></td>
            <td className={classes.col1}>
              <div className={classes.bold}>{props.title}</div>
            </td>
            <td className={classes.col2}>
              <div>{`Bills on ${props.date}`}</div>
            </td>
            <td className={classes.col3}>
              <div className={classes.flex}>
                <div className={classes.budgeted}>
                  <span className={classes.bold}>Budgeted</span>{" "}
                  {props.budgetedAmount}
                </div>
                <div className={classes.slash}>/</div>
                <div className={classes.spent}>
                  <span className={classes.bold}>Spent</span>{" "}
                  {props.spentAmount}
                </div>
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
    </div>
  );
};

export default BudgetItem;
