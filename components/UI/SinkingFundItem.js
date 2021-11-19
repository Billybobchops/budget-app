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
              <div>{`Bills on ${props.date}`}</div>
            </td>
            <td className={classes.col3}>{`Total Cost $${props.ammount}`}</td>
            <td className={classes.col4}>
              <div
                className={classes.cost}
              >{`$${props.payment}/${props.timeType} for ${props.timeLength} ${props.timeType}s`}</div>
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
        <div>{`Total Cost $${props.ammount}`}</div>
        <div
          className={classes.cost}
        >{`$${props.payment}/${props.timeType} for ${props.timeLength} ${props.timeType}s`}</div>
        <div className={classes.options}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
      </div>
    </div>
  );
};

export default SinkingFundsItem;

// 24 months = total amount / 24
// 2 years = total amount / (2 * 12)
