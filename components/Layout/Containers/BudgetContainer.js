import classes from './BudgetContainer.module.css';
import BudgetCategory from '../../UI/BudgetCategory';
import HighLowToggle from '../../UI/HighLowToggle';
import Tabs from '../../UI/Tabs';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectCategoryIds } from '../../../store/category-slice';
import { selectItemEntities } from '../../../store/items-slice';
import { selectPaycheckEntities } from '../../../store/planner-slice';
import { selectExpenseEntities } from '../../../store/expenses-slice';

const BudgetContainer = () => {
  const [order, setOrder] = useState({});
  const [activeTab, setActiveTab] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);

  const categories = useSelector(selectCategoryIds);
  const items = useSelector(selectItemEntities);
  const income = useSelector(selectPaycheckEntities);
  const expenses = useSelector(selectExpenseEntities);

  // we don't separate this out into smaller functions out b/c setState isn't synchronous
	// and we synchronously build the shape of the data we're passing to each accordion
	// also you can't call hooks from within loops!
  const calcBudgetAccordionProps = (categories, items, income, expenses) => {
    let orderObj = {};

    // // 1. init setup of orderObj
    categories.map(
      (category) =>
        (orderObj[category] = {
          id: '',
          budgetedItemsTotal: 0,
          percentOfIncome: 0,
          spent: 0,
          itemIds: [],
        })
    );

    // 2. calc total budgetItems amount per category and gather array of items that belong to each category
    Object.values(items).map((item) => {
      orderObj[item.category].id = item.category;
      orderObj[item.category].budgetedItemsTotal += item.budgetAmount;
      orderObj[item.category].itemIds.push(item.id);
    });

    // 3. calc total planned income
    let totalPay = 0;
    Object.values(income).map((check) => {
      totalPay += check.expectedPay;
    });
    setTotalIncome(totalPay);

    // 4. calc what percentage of budgetedItems in a category make up the total planned income
    Object.values(orderObj).map((category) => {
      category.percentOfIncome = +(
        category.budgetedItemsTotal / totalPay
      ).toFixed(2);
    });

    // 5. calc spent amount per category
    Object.values(expenses).map((expense) => {
      if (orderObj[expense.category])
        orderObj[expense.category].spent += expense.amount;
    });

    // 6. Finally, update state, only after orderObj is fully complete
    setOrder(orderObj);
    // 7. then .sort below in the return statement by ASC percentOfIncome!
  };

  useEffect(() => {
    console.log('useEffect running...');
    calcBudgetAccordionProps(categories, items, income, expenses);
  }, [categories, items, income, expenses]);

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
        {Object.values(categories).length !== 0 &&
          Object.values(order).map((category) => {
            return (
              <BudgetCategory
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

export default BudgetContainer;
