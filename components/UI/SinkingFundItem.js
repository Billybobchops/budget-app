import classes from './SinkingFundItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/helpers';

const SinkingFundsItem = ({
  billDate,
  title,
  totalAmount,
  payment,
  timePeriod,
  timeType,
}) => {
  const date = formatDate(billDate);

  console.log(totalAmount);

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.initialRow}>
            <td className={classes.emptyCell}></td>
            <td className={classes.col1}>
              <div className={classes.title}>{title}</div>
            </td>
            <td className={classes.col2}>
              <div>{`${billDate ? `Bills on ${date}` : '--'}`}</div>
            </td>
            <td className={classes.col3}>
              <div className={classes.cost}>{`$${payment
                .toFixed(2)
                .toLocaleString()}/month for ${timePeriod} ${timeType}${
                timePeriod > 1 ? 's' : ''
              }`}</div>
            </td>
            <td
              className={classes.col4}
            >{`Total $${totalAmount.toLocaleString()}`}</td>
            <td className={classes.col5}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </td>
          </tr>
        </tbody>
      </table>

      <div className={classes.secondaryRow}>
        <div className={classes.title}>{title}</div>
        <div className={classes.date}>{`${
          billDate ? `Bills on ${date}` : '--'
        }`}</div>
        <div
          className={classes.total}
        >{`Total $${totalAmount.toLocaleString()}`}</div>
        <div className={classes.payment}>{`$${payment
          .toFixed(2)
          .toLocaleString()}/month for ${timePeriod} ${timeType}${
          timePeriod > 1 ? 's' : ''
        }`}</div>
        <div className={classes.options}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
      </div>
    </div>
  );
};

export default SinkingFundsItem;
