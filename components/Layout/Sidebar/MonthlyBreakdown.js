import classes from './MonthlyBreakdown.module.css';
import { useSelector } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';

const MonthlyBreakdown = () => {
  const totalBudgeted = useSelector(
    (state) => state.itemsAndPlanner.totalBudgetedCategory
  );

  let totalExpectedPay = useSelector(
    (state) => state.itemsAndPlanner.totalExpectedPay
  );

  // let dataArr = [{ name: `Uncategorized`, value: 55 }];
  let dataArr = [];

  const getData = () => {
    Object.values(totalBudgeted).map((category) => {
      let budgeted =
        totalBudgeted[category.id] !== undefined
          ? +totalBudgeted[category.id].budgeted.toFixed(2)
          : 0;

      const percent = ((budgeted / totalExpectedPay) * 100).toFixed(2);

      dataArr.push({ id: category.id, value: +percent });
    });
  };
  getData();
  console.log(dataArr);

  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.title}>Monthly Breakdown</h2>
      </div>
      <div className={classes.background}>
        {Object.values(totalBudgeted).length !== 0 && totalExpectedPay && (
          <ResponsivePie
            data={dataArr}
            margin={{ top: 50, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={2}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor='#000000'
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
            }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: dataArr[0].id,
                },
                id: 'dots',
              },
              // {
              //   match: {
              //     id: dataArr[5].id,
              //   },
              //   id: 'lines',
              // },
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
    </div>
  );
};

export default MonthlyBreakdown;
