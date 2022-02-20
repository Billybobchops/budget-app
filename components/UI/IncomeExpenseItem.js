import classes from './IncomeExpenseItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/helpers';

const IncomeExpenseItem = ({ title, date, amount, expense }) => {
  let backgroundColor = `${expense && 'expense'}`;
  const dateFormat = formatDate(date);

  return (
    <div
      className={`${[classes.container, classes[backgroundColor]].join(' ')}`}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.date}>{dateFormat}</div>
      <div className={classes.amount}>${amount}</div>
      <div className={classes.options}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
    </div>
  );
};

export default IncomeExpenseItem;
