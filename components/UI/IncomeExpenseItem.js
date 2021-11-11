import classes from "./IncomeExpenseItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const IncomeExpenseItem = (props) => {
  let containerClass = `container`;
  if (props.expense) containerClass = `expense`;

  return (
    <div className={`${classes[containerClass]}`}>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td className={classes.emptyCell}></td>
            <td className={classes.col1}>
              <div className={classes.bold}>{props.title}</div>
            </td>
            <td className={classes.col3}>
              <div>{props.nickname}</div>
            </td>
            <td className={classes.col3}>
              <div>{props.date}</div>
            </td>
            <td className={classes.col4}>
              <div className={classes.bold}>{props.amount}</div>
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

export default IncomeExpenseItem;
