import classes from './UpcomingBill.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const UpcomingBill = ({ title, date, spentAmount, budgetedAmount }) => {
  return (
    <div className={classes.container}>
      <div className={classes.bold}>{title}</div>
      <div className={classes.date}>{`Bills on ${date}`}</div>
      <div className={classes.flex}>
        <div className={classes.spent}>{spentAmount}</div>
        <div className={classes.slash}>/</div>
        <div className={classes.budgeted}>{`$${budgetedAmount}`}</div>
      </div>
      <div className={classes.under}>Balanced!</div>
      <div className={classes.options}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
    </div>
  );
};

export default UpcomingBill;
