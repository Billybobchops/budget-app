import classes from './CategoryPie.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { selectPaycheckEntities } from '../../../store/planner-slice';
import { selectCategoryIds } from '../../../store/category-slice';
import { selectItemEntities } from '../../../store/items-slice';
import CategoryPieCards from './CategoryPieCards';
import { useAuth } from '../../../hooks/useAuth';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ErrorMessage = () => {
  return (
    <div className={classes.errorBackground}>
      <div>
        <h3>Oops!</h3>
        <p>Your total budget exceeds your total expected pay.</p>
        <p>Either correct your expected pay or reduce your budget.</p>
      </div>
    </div>
  );
};

const CategoryPie = () => {
  const { user: isLoggedIn } = useAuth();
  const [data, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  const categories = useSelector(selectCategoryIds);
  const items = useSelector(selectItemEntities);
  const income = useSelector(selectPaycheckEntities);

  const colors = [
    '#A0D8EE',
    '#51b587',
    '#FCC0C4',
    '#ede15b',
    '#DCABFC',
    '#F977E1',
    '#FFBE4D',
    '#b3d4ff',
    '#00bfa0',
  ];

  const getPercent = (categories, income, items) => {
    let tempArr = [];
    let tempTotal = 0;

    categories.map((category) => {
      tempArr.push({
        id: category,
        budgetedItemsTotal: 0,
        value: 0,
      });
    });

    let totalPay = 0;

    Object.values(income).map((check) => {
      totalPay += check.expectedPay;
    });
    setTotalIncome(totalPay);

    Object.values(items).map((item) => {
      tempArr.map((category, i) => {
        if (category.id === item.category) {
          tempArr[i].budgetedItemsTotal += item.budgetAmount;

          tempArr[i].value = +(
            tempArr[i].budgetedItemsTotal / totalPay
          ).toFixed(2);
        }
      });

      tempTotal += item.budgetAmount;
    });

    let categorized = 0;

    tempArr.map((category) => {
      categorized = categorized + category.value;
    });

    tempArr.push({
      id: 'Unbudgeted',
      value: (100 - categorized * 100) / 100,
    });

    tempArr.sort((a, b) => (a.value > b.value ? -1 : 1));

    setData(tempArr);
    setTotalBudget(tempTotal);
  };

  useEffect(() => {
    getPercent(categories, income, items);
  }, [categories, income, items]);

  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Monthly Breakdown</h2>
      </div>

      <div className={classes.chartBackground}>
        {categories &&
        isLoggedIn &&
        data.length > 0 &&
        income &&
        totalIncome > totalBudget ? (
          <ResponsivePie
            data={data}
            height={300}
            width={300}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.5}
            padAngle={2}
            cornerRadius={3}
            activeOuterRadiusOffset={6}
            colors={colors}
            enableArcLinkLabels={false}
            valueFormat=' >-~%'
          />
        ) : (
          <Skeleton
            borderRadius={0}
            containerClassName={classes.skeleton}
            height={300}
          />
        )}
      </div>

      {totalIncome < totalBudget && <ErrorMessage />}

      {income && totalIncome > totalBudget && (
        <CategoryPieCards categories={data} colors={colors} />
      )}
    </div>
  );
};

export default CategoryPie;
