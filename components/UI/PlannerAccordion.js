import classes from "./PlannerAccordion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BudgetItem from "../UI/BudgetItem";

const dummyBudgetItems = [
  {
    category: "Wants",
    title: "Date Night",
    billDate: "09.29.21",
    budgetAmount: 50,
    plannedPaycheck: "Paycheck 1",
  },
  {
    category: "Wants",
    title: "Spotify",
    billDate: "09.29.21",
    budgetAmount: 13,
    plannedPaycheck: "Paycheck 1",
  },
  {
    category: "Needs",
    title: "Groceries",
    billDate: "09.29.21",
    budgetAmount: 200,
    plannedPaycheck: "Paycheck 1",
  },
];

const Table = (props) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

const PlannerAccordion = (props) => {
  const [isActive, setIsActive] = useState(false);

  const activeHandler = () => {
    setIsActive(!isActive);
  };

  const chevron = isActive ? (
    <FontAwesomeIcon icon={faChevronDown} className={classes.chevron} />
  ) : (
    <FontAwesomeIcon icon={faChevronUp} className={classes.chevron} />
  );

  return (
    <>
      <div onClick={activeHandler}>
        <Table>
          <tr>
            <td className={classes.head1}>{chevron}</td>
            <td className={classes.head2}>
              <div className={classes.title}>
                {props.title} -
                <span className={classes.percentage}> {props.nickname}</span>
              </div>
            </td>
            <td className={classes.head3}>
              <div className={classes.flex}>
                <div className={classes.budgeted}>
                  <span className={classes.bold}>Budgeted</span> $43.25
                </div>
                <div className={classes.slash}>/</div>
                <div className={classes.spent}>
                  <span className={classes.bold}>Expected Pay</span> $
                  {props.expectedPay}
                </div>
              </div>
            </td>
            <td className={classes.head4}>
              <div className={classes.under}>Under $567</div>
            </td>
            <td className={classes.head5}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </td>
          </tr>
        </Table>
      </div>
      {isActive &&
        dummyBudgetItems.map((item) => {
          return (
            <BudgetItem
              key={item.title}
              title={item.title}
              date={item.billDate}
              spentAmount="$5"
              budgetedAmount={item.budgetAmount}
            />
          );
        })}
    </>
  );
};

export default PlannerAccordion;
