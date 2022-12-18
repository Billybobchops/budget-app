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
  const [order, setOrder] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);

  const categories = useSelector(selectCategoryIds);
  const items = useSelector(selectItemEntities);
  const income = useSelector(selectPaycheckEntities);
  const expenses = useSelector(selectExpenseEntities);

  // we don't separate big fn into smaller functions out b/c setState isn't synchronous
  // and we synchronously build the shape of the data we're passing to each accordion
  // also... you cannot call hooks from within loops!
  const calcBudgetAccordionProps = (categories, items, income, expenses) => {
    let orderArr = [];

    // // 1. init setup of orderArr
    categories.map((category) =>
      orderArr.push({
        id: category,
        budgetedItemsTotal: 0,
        percentOfIncome: 0,
        spent: 0,
        itemIds: [],
      })
    );

    // 2. calc total planned income
    let totalPay = 0;
    Object.values(income).map((check) => {
      totalPay += check.expectedPay;
    });
    setTotalIncome(totalPay);

    // 3. calc total budgetItems amount per category and gather array of items that belong to each category
    Object.values(items).map((item) => {
      orderArr.map((category, i) => {
        if (category.id === item.category) {
          orderArr[i].budgetedItemsTotal += item.budgetAmount;
          orderArr[i].itemIds.push(item.id);

          // 4. calc what percentage of budgetedItems in a category make up the total planned income
          orderArr[i].percentOfIncome = +(
            orderArr[i].budgetedItemsTotal / totalPay
          ).toFixed(2);
        }
      });
    });

    // 5. calc spent amount per category
    Object.values(expenses).map((expense) => {
      orderArr.map((category, i) => {
        if (category.id === expense.category) {
          orderArr[i].spent += expense.amount;
        }
      });
    });

    // 6. Sort by DESC percentOfIncome by default
    orderArr.sort((a, b) => (a.percentOfIncome > b.percentOfIncome ? -1 : 1));

    // 7. Finally, update state
    setOrder(orderArr);
  };

  useEffect(() => {
    console.log('useEffect running...');
    calcBudgetAccordionProps(categories, items, income, expenses);
  }, [categories, items, income, expenses]);

  const toggleTab = (tab) => {
    const newTab = tab;
    setActiveTab(newTab);
  };

  const toggleSort = () => {
    const orderClone = [...order];
    const reverseOrder = orderClone.reverse();
    setOrder(reverseOrder);
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
          order.map((category) => {
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
