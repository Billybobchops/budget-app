import classes from './CategoryPie.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { selectPaycheckEntities } from '../../../store/planner-slice';
import { selectCategoryIds } from '../../../store/category-slice';
import { selectItemEntities } from '../../../store/items-slice';

const CategoryPie = () => {
  const [data, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const categories = useSelector(selectCategoryIds);
  const items = useSelector(selectItemEntities);
  const income = useSelector(selectPaycheckEntities);

  const getPercent = (categories, income, items) => {
    let tempArr = [];

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
    });

    let categorized = 0;

    tempArr.map((category) => {
      categorized = categorized + category.value;
    });

    tempArr.push({
      id: 'Uncategorized',
      value: (100 - categorized * 100) / 100,
    });

		tempArr.sort((a, b) => (a.value > b.value ? -1 : 1));

    setData(tempArr);
  };

	console.log('data', data);

  useEffect(() => {
    getPercent(categories, income, items);
  }, [categories, income, items]);

  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Monthly Breakdown</h2>
      </div>
      {income && (
        <div className={classes.background}>
          {data.length !== 0 && totalIncome !== 0 && (
            <ResponsivePie
              data={data}
              height={300}
              width={300}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              padAngle={2}
              cornerRadius={3}
              activeOuterRadiusOffset={6}
              // colors={{ scheme: 'blue_green' }}
              // colors={['#75EEB5', '#2DEB92', '#23B872', '#0f4e31']}
              colors={['#51b587', '#81d4ae', '#62d5b5', '#75EEB5']}
              enableArcLinkLabels={false}
              valueFormat=' >-~%'
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.37)',
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.1)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: data.length > 1 ? data[1].id : '',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: data.length > 0 ? data[0].id : '',
                  },
                  id: 'lines',
                },
              ]}
            />
          )}
        </div>
      )}

    </div>
  );
};

export default CategoryPie;
