import classes from "./IncomeExpenseItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const IncomeExpenseItem = (props) => {
  let backgroundColor = `${props.expense && "expense"}`;

  return (
    <div
      className={`${[classes.container, classes[backgroundColor]].join(" ")}`}
    >
      <div className={classes.title}>{props.title}</div>
      <div className={classes.nickname}>{props.nickname}</div>
      <div className={classes.date}>{props.date}</div>
      <div className={classes.ammount}>{props.ammount}</div>
      <div className={classes.options}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
    </div>
  );
};

export default IncomeExpenseItem;
