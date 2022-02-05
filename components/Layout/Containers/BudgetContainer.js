import classes from './BudgetContainer.module.css';
import { useSelector } from 'react-redux';
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

const BudgetContainer = () => {
  const titles = useSelector((state) => state.categories.entities);

  return (
    <BudgetWrapper>
      {Object.values(titles).length !== 0 &&
        Object.values(titles).map((category) => {
          return (
            <BudgetCategory key={category.id} categoryTitle={category.id} />
          );
        })}
    </BudgetWrapper>
  );
};

export default BudgetContainer;
