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

  // let orderObj = {};

  // const initOrderObj = (categories) => {
  //   let orderObj = {};

  //   categories.map(
  //     (category) =>
  //       (orderObj[category] = {
  //         id: '',
  //         budgetedItemsTotal: 0,
  //         percentOfIncome: 0,
  //       })
  //   );
  //   setOrder(orderObj);
  // };

  // const calcTotalPlannedIncome = (income) => {
  //   let total = 0;
  //   Object.values(income).map((check) => {
  //     total += check.expectedPay;
  //   });
  //   setTotalIncome(total);
  // };

  // const calcTotalItemsAmountPerCategory = (items) => {
  //   Object.values(items).map((item) => {
  //     setOrder((current) => {
  //       return {
  //         ...current,
  //         [item.category]: {
  //           id: item.category,
  //           budgetedItemsTotal: (budgetedItemsTotal += item.budgetAmount),
  //         },
  //       };
  //     });
  //   });
  // };

  // const calcPercentageOfIncome = (order, totalIncome) => {
  //   Object.values(order).map((category) => {
  //     category.percentOfIncome = (
  //       category.budgetedItemsTotal / totalIncome
  //     ).toFixed(2);
  //   });
  // };

  // we don't separate these functions out b/c setState isn't synchronous
  // would have to use an intermediate variable for order...
  const calcBudgetAccordionProps = (categories, items, income, expenses) => {
    let orderObj = {};

    // 1. init setup of orderObj
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

    // 6. Finally, update state
    setOrder(orderObj);

    // 7. then .sort below in the return statement by ASC percentOfIncome!
  };

  useEffect(() => {
    console.log('useEffect running...');
    calcBudgetAccordionProps(categories, items, income, expenses);
    // initOrderObj(categories);
    // calcTotalItemsAmountPerCategory(items);
    // calcTotalPlannedIncome(income);
    // calcPercentageOfIncome(order, totalIncome);
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
