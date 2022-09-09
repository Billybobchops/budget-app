import classes from './BudgetContainer.module.css';
import { useSelector } from 'react-redux';
import BudgetCategory from '../../UI/BudgetCategory';
import HighLowToggle from '../../UI/HighLowToggle';
import Tabs from '../../UI/Tabs';
import { useEffect, useState } from 'react';
import { selectCategoryIds } from '../../../store/category-slice';
import { selectExpenseEntities } from '../../../store/expenses-slice';

const BudgetContainer = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [order, setOrder] = useState([]);

  const categories = useSelector(selectCategoryIds);
  const expenses = useSelector(selectExpenseEntities);

  const calcPercentageOfIncome = (expenses, categories) => {
    let orderArr = [];

    categories.map((category) => orderArr.push({ [category]: {} }));

    setOrder(orderArr);
  };

  useEffect(() => {
    calcPercentageOfIncome(expenses, categories);
  }, [expenses, categories]);

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
        {/* {Object.values(categories).length !== 0 &&
          order.map(() => {
            return (
              <BudgetCategory
                key={order.id}
                categoryTitle={order}
                spent={order.spent}
                tabID={activeTab}
              />
            );
          })} */}
      </div>
    </div>
  );
};

export default BudgetContainer;
