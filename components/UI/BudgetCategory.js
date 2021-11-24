import classes from "./BudgetCategory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BudgetItem from "../UI/BudgetItem";
import { Droppable } from "react-beautiful-dnd";

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

const BudgetCategory = (props) => {
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
      <Droppable droppableId={props.categoryTitle}>
        {(provided) => (
          <>
            <div
              onClick={activeHandler}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Table>
                <tr>
                  <td className={classes.head1}>{chevron}</td>
                  <td className={classes.head2}>
                    <div className={classes.title}>
                      {props.categoryTitle} -
                      <span className={classes.percentage}> xx% of Income</span>
                    </div>
                  </td>
                  <td className={classes.head3}>
                    <div className={classes.flex}>
                      <div className={classes.spent}>
                        <span className={classes.bold}>Spent</span> $123.43
                      </div>
                      <div className={classes.slash}>/</div>
                      <div className={classes.budgeted}>$1,000.43</div>
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

            <ul className={classes.list}>
              {isActive &&
                dummyBudgetItems.map((item, index) => {
                  return (
                    <BudgetItem
                      key={item.title}
                      title={item.title}
                      date={item.billDate}
                      spentAmount="$5"
                      budgetedAmount={`$${item.budgetAmount}`}
                      index={index}
                    />
                  );
                })}
              {provided.placeholder}
            </ul>
          </>
        )}
      </Droppable>
    </>
  );
};

export default BudgetCategory;
