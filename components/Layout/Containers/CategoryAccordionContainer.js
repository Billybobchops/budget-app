import classes from './CategoryAccordionContainer.module.css';
import CategoryAccordion from '../../UI/CategoryAccordion';
import HighLowToggle from '../../UI/HighLowToggle';
import Tabs from '../../UI/Tabs';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectCategoryIds } from '../../../store/category-slice';

const CategoryAccordionContainer = ({ categoryOrder, totalIncome }) => {
  const [activeTab, setActiveTab] = useState(null);

  const categories = useSelector(selectCategoryIds);

  const toggleTab = (tab) => {
    const newTab = tab;
    setActiveTab(newTab);
  };

  const toggleSort = () => {
    const orderClone = [...categoryOrder];
    const reverseOrder = orderClone.reverse();
    setCategoryOrder(reverseOrder);
  };

  return (
    <div className={classes.budgetContainer}>
      <div className={classes.budgetTitle}>
        <h2>Budget</h2>
        <div>
          <HighLowToggle
            toggleOptions={['High to Low', 'Low to High']}
            toggleTitle={'Percentage of Planned Net Income:'}
            toggleSortFn={toggleSort}
          />
        </div>
      </div>
      <Tabs labels={['Monthly', 'Annual']} activeTabFn={toggleTab} />
      <div className={classes.budgetItemsList}>
        {Object.values(categories).length !== 0 &&
          categoryOrder.map((category) => {
            return (
              <CategoryAccordion
                key={category.id}
                categoryTitle={category.id}
                percent={category.percentOfIncome}
                budgetedTotal={category.budgetedItemsTotal}
                totalIncome={totalIncome}
                spent={category.spent}
                itemIds={category.itemIds}
                tabID={activeTab}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CategoryAccordionContainer;
