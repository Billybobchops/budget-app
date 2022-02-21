import classes from './UpcomingBill.module.css';

const UpcomingBill = ({ title, date, budgetedAmount }) => {
  const formattedDate = `${date === 'Today' ? 'Bills' : 'Bills on'} ${date}`;

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.date}>{formattedDate}</div>
      <div className={classes.budgeted}>{`$${budgetedAmount}`}</div>
    </div>
  );
};

export default UpcomingBill;
