import classes from "./BudgetContainer.module.css";
import { useState } from "react";
import BudgetCategory from "../../UI/BudgetCategory";
import BudgetItem from "../../UI/BudgetItem";

const Tab = (props) => {
  let tabClass = `${classes.tabBtn} ${
    props.activeTab ? classes.tabBtnActive : ""
  }`;
  return (
    <button className={tabClass} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

const BudgetWrapper = (props) => {
  const tabLables = ["Monthly", "Annual"];
  const [activeTab, setActiveTab] = useState(tabLables[0]);

  return (
    <div className={classes.budgetContainer}>
      <div className={classes.budgetTitle}>
        <h2>Budget</h2>
        <div>
          <div className={classes.sorting}>
            <span className={classes.sortingTitle}>
              Percentage of Planned Net Income:
            </span>
            <span className={classes.break}>
              <br />
            </span>
            <button className={classes.sortingBtn}>High to Low</button>
            <span className={classes.slash}>|</span>
            <button className={classes.sortingBtn}>Low to High</button>
          </div>
        </div>
      </div>
      <div className={classes.budgetTabs}>
        {tabLables.map((tab) => {
          return (
            <Tab
              title={tab}
              key={tab}
              activeTab={activeTab === tab}
              onClick={() => {
                setActiveTab(tab);
              }}
            />
          );
        })}
      </div>
      <div className={classes.budgetItemsList}>{props.children}</div>
    </div>
  );
};
1;
// Eventually loop and render Categories inside of the BudgetWrapper component...
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
