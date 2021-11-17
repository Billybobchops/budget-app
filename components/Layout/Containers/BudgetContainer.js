import classes from "./BudgetContainer.module.css";
import BudgetCategory from "../../UI/BudgetCategory";
import HighLowToggle from "../../UI/HighLowToggle";
import Tabs from "../../UI/Tabs";

const BudgetWrapper = (props) => {
  return (
    <div className={classes.budgetContainer}>
      <div className={classes.budgetTitle}>
        <h2>Budget</h2>
        <div>
          <HighLowToggle />
        </div>
      </div>
      <Tabs labels={["Monthly", "Annual"]} />
      <div className={classes.budgetItemsList}>{props.children}</div>
    </div>
  );
};

// Eventually loop and render Categories dynamically instead of static content...
const BudgetContainer = (props) => {
  return (
    <BudgetWrapper>
      <BudgetCategory categoryTitle="Needs" />
      <BudgetCategory categoryTitle="Saving" />
      <BudgetCategory categoryTitle="Giving" />
      <BudgetCategory categoryTitle="Wants" />
    </BudgetWrapper>
  );
};

export default BudgetContainer;
