import classes from './CategoryPie.module.css';
import { useSelector } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';
import { selectPaycheckEntities } from '../../../store/planner-slice';

const CategoryPie = () => {
  // const totalBudgeted = useSelector();

  // let totalExpectedPay = useSelector();

  const checks = useSelector(selectPaycheckEntities);

  let dataArr = [];

  const getData = () => {
    Object.values(totalBudgeted).map((category) => {
      let budgeted =
        totalBudgeted[category.id] !== undefined
          ? +totalBudgeted[category.id].budgeted.toFixed(2)
          : 0;

      const percent = (budgeted / totalExpectedPay).toFixed(2);

      dataArr.push({ id: category.id, value: +percent });
    });
  };
  getData();

  const calcUncategorizedPercentage = () => {
    let categorized = 0;

    dataArr.map((category) => {
      categorized = categorized + category.value;
    });

    dataArr.push({
      id: 'Uncategorized',
      value: (100 - categorized * 100) / 100,
    });
  };
  calcUncategorizedPercentage();

  console.log(dataArr);

  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Monthly Breakdown</h2>
      </div>
      {checks && (
        <div className={classes.background}>
          {Object.values(totalBudgeted).length !== 0 && totalExpectedPay && (
            <ResponsivePie
              data={dataArr}
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
                    id: dataArr.length > 2 ? dataArr[2].id : '',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: dataArr.length > 5 ? dataArr[5].id : '',
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
