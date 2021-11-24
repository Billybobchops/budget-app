import classes from "./PlannerAccordion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BudgetItem from "../UI/BudgetItem";
import { Droppable } from "react-beautiful-dnd";

// import { resetServerContext } from "react-beautiful-dnd";
// import { GetServerSideProps } from "next";

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
      <Droppable droppableId={props.title} key={props.title}>
        {(provided) => (
          <>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              onClick={activeHandler}
            >
              <Table>
                <tr>
                  <td className={classes.head1}>{chevron}</td>
                  <td className={classes.head2}>
                    <div className={classes.title}>
                      {props.title} -
                      <span className={classes.percentage}>
                        {" "}
                        {props.nickname}
                      </span>
                    </div>
                  </td>
                  <td className={classes.head3}>
                    <div className={classes.flex}>
                      <div className={classes.spent}>
                        <span className={classes.bold}>Expected Pay</span> $
                        {props.expectedPay}
                      </div>
                      <div className={classes.slash}>/</div>
                      <div className={classes.budgeted}>
                        <span className={classes.bold}>Budgeted</span> $43.25
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

            <ul className={classes.list}>
              {isActive &&
                props.items.map((item, index) => {
                  if (props.title === item.plannedPaycheck)
                    return (
                      <BudgetItem
                        key={item.title}
                        index={index}
                        title={item.title}
                        date={item.billDate}
                        spentAmount="$5"
                        budgetedAmount={item.budgetAmount}
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

export default PlannerAccordion;

// export async function GetServerSideProps() {
//   resetServerContext();
//   return {
//     props: {},
//   };
// }

// if (props.title === item.title) return
