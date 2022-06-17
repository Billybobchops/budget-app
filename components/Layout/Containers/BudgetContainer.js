import classes from './BudgetContainer.module.css';
import { useSelector } from 'react-redux';
import BudgetCategory from '../../UI/BudgetCategory';
import HighLowToggle from '../../UI/HighLowToggle';
import Tabs from '../../UI/Tabs';
import { useState } from 'react';

const BudgetContainer = () => {
  const titles = useSelector((state) => state.categories.entities);
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (tab) => {
    const newTab = tab;
    setActiveTab(newTab);
  };

  return (
    <div className={classes.budgetContainer}>
      <div className={classes.budgetTitle}>
        <h2>Budget</h2>
        <div>
          <p>Percentage of Planned Net Income:</p>
          <HighLowToggle />
        </div>
      </div>
      <Tabs labels={['Monthly', 'Annual']} activeTabFn={toggleTab} />
      <div className={classes.budgetItemsList}>
        {Object.values(titles).length !== 0 &&
          Object.values(titles).map((category) => {
            return (
              <BudgetCategory key={category.id} categoryTitle={category.id} tabID={activeTab} />
            );
          })}
      </div>
    </div>
  );
};

export default BudgetContainer;
