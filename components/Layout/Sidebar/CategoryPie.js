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

    setData(tempArr);
  };

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
              margin={{ top: 50, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={2}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              // colors={{ scheme: 'nivo' }}
              colors={['lightblue', '#75EEB5', '#2DEB92', '#23B872']}
              // colors={['#75EEB5', '#2DEB92', '#23B872', '#0f4e31']}
              // borderWidth={0}
              // borderColor={{
              //   from: 'color',
              //   modifiers: [['darker', 0.2]],
              // }}
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
                  color: 'rgba(255, 255, 255, 0.98)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: data.length > 2 ? data[2].id : '',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: data.length > 5 ? data[5].id : '',
                  },
                  id: 'lines',
                },
              ]}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#000',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 20,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
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
