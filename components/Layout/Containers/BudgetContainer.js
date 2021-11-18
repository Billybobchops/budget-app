import classes from "./BudgetContainer.module.css";
import BudgetCategory from "../../UI/BudgetCategory";
import HighLowToggle from "../../UI/HighLowToggle";
import Tabs from "../../UI/Tabs";

const dummyCategories = [
  { title: "Needs" },
  { title: "Saving" },
  { title: "Giving" },
  { title: "Wants" },
];

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
const BudgetContainer = () => {
  return (
    <BudgetWrapper>
      {dummyCategories.map((category) => {
        return <BudgetCategory key={category.title} categoryTitle={category.title} />;
      })}
    </BudgetWrapper>
  );
};

export default BudgetContainer;