import classes from "./BudgetContainer.module.css";
import { useState } from "react";
import BudgetCategory from "../../UI/BudgetCategory";
import BudgetItem from "../../UI/BudgetItem";

const BudgetWrapper = (props) => {
  const [activeTab, setActiveTab] = useState(["Monthly"]);

  let tabClass = `tabBtn`;

  return (
    <div className={classes.budgetContainer}>
      <div className={classes.budgetTitle}>
        <h2>Budget</h2>
        <div>
          <div className={classes.sorting}>
            Percentage of Planned Net Income:{" "}
            <span className={classes.break}>
              <br />
            </span>
            <button className={classes.sortingBtn}>High to Low</button>|
            <button className={classes.sortingBtn}>Low to High</button>
          </div>
        </div>
      </div>
      <div className={classes.budgetTabs}>
        <button className={`${classes[tabClass]}`}>Daily</button>
        <button className={`${classes[tabClass]}`}>Monthly</button>
        <button className={`${classes[tabClass]}`}>Annually</button>
      </div>
      <div className={classes.budgetItemsList}>{props.children}</div>
    </div>
  );
};

const BudgetContainer = (props) => {
  return (
    <BudgetWrapper>
      <BudgetCategory categoryTitle="Needs" />
      <BudgetCategory categoryTitle="Saving" />
      <BudgetCategory categoryTitle="Giving" />
      <BudgetCategory categoryTitle="Wants" />
      <BudgetItem
        title="Date Night"
        date="09.03.21"
        budgetedAmount="$50"
        spentAmount="$50"
      />
    </BudgetWrapper>
  );
};

export default BudgetContainer;
