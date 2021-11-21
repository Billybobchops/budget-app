import classes from "./SinkingFundItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const SinkingFundsItem = (props) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.initialRow}>
            <td className={classes.emptyCell}></td>
            <td className={classes.col1}>
              <div className={classes.bold}>{props.title}</div>
            </td>
            <td className={classes.col2}>
              <div>{`${props.date !== "" ? "Bills on " : "--"}${
                props.date
              }`}</div>
            </td>
            <td className={classes.col3}>{`Total $${props.ammount}`}</td>
            <td className={classes.col4}>
              <div className={classes.cost}>{`$${props.payment.toFixed(
                2
              )}/month for ${props.timeLength} ${props.timeType}${
                props.timeLength > 1 ? "s" : ""
              }`}</div>
            </td>
            <td className={classes.col5}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </td>
          </tr>
        </tbody>
      </table>

      <div className={classes.secondaryRow}>
        <div className={classes.bold}>{props.title}</div>
        <div className={classes.date}>{`${
          props.date !== "" ? "Bills on " : "--"
        }${props.date}`}</div>
        <div className={classes.total}>{`Total $${props.ammount}`}</div>
        <div className={classes.cost}>{`$${props.payment.toFixed(
          2
        )}/month for ${props.timeLength} ${props.timeType}${
          props.timeLength > 1 ? "s" : ""
        }`}</div>
        <div className={classes.options}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
      </div>
    </div>
  );
};

export default SinkingFundsItem;
