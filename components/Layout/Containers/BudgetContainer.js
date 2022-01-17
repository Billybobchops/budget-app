import classes from './BudgetContainer.module.css';
import BudgetCategory from '../../UI/BudgetCategory';
import HighLowToggle from '../../UI/HighLowToggle';
import Tabs from '../../UI/Tabs';

const BudgetWrapper = ({ children }) => {
  return (
    <div className={classes.budgetContainer}>
      <div className={classes.budgetTitle}>
        <h2>Budget</h2>
        <div>
          <p>Percentage of Planned Net Income:</p>
          <HighLowToggle />
        </div>
      </div>
      <Tabs labels={['Monthly', 'Annual']} />
      <div className={classes.budgetItemsList}>{children}</div>
    </div>
  );
};

const BudgetContainer = ({ titles }) => {
  return (
    <BudgetWrapper>
      {titles &&
        titles.map((category) => {
          return <BudgetCategory key={category} categoryTitle={category} />;
        })}
    </BudgetWrapper>
  );
};

export default BudgetContainer;
