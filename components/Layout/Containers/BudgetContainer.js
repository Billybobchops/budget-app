import classes from './BudgetContainer.module.css';
import { useSelector } from 'react-redux';
import BudgetCategory from '../../UI/BudgetCategory';
import HighLowToggle from '../../UI/HighLowToggle';
import Tabs from '../../UI/Tabs';
import { useState } from 'react';
import { selectCategoryOrder } from '../../../store/categoryOrder-slice';
import { selectCategoryEntities } from '../../../store/category-slice';

const BudgetContainer = () => {
  const titles = useSelector(selectCategoryEntities);
  const categoryOrder = useSelector(selectCategoryOrder);
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
          <HighLowToggle
            toggleOptions={['High to Low', 'Low to High']}
            toggleTitle={'Percentage of Planned Net Income:'}
          />
        </div>
      </div>
      <Tabs labels={['Monthly', 'Annual']} activeTabFn={toggleTab} />
      <div className={classes.budgetItemsList}>
        {Object.values(titles).length !== 0 &&
          categoryOrder.map((category) => {
            return (
              <BudgetCategory
                key={titles[category].id}
                categoryTitle={titles[category].id}
                tabID={activeTab}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BudgetContainer;
