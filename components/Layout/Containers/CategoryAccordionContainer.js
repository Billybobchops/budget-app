import classes from './CategoryAccordionContainer.module.css';
import CategoryAccordion from '../../UI/CategoryAccordion';
import HighLowToggle from '../../UI/HighLowToggle';
import Tabs from '../../UI/Tabs';
import { useAuth } from '../../../hooks/useAuth';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectCategoryEntities } from '../../../store/category-slice';

const CategoryAccordionContainer = ({
  categoryOrder,
  reverseOrderFn,
  totalIncome,
}) => {
  const [activeTab, setActiveTab] = useState(null);
  const { user: isLoggedIn } = useAuth();
  const categoryEntities = useSelector(selectCategoryEntities);

  const toggleTab = (tab) => {
    const newTab = tab;
    setActiveTab(newTab);
  };

  return (
    <div className={classes.budgetContainer}>
      <div className={classes.budgetTitle}>
        <h2>Budget Categories</h2>
        <div>
          <HighLowToggle
            toggleOptions={['High to Low', 'Low to High']}
            toggleTitle={'Percentage of Planned Net Income:'}
            toggleSortFn={reverseOrderFn}
          />
        </div>
      </div>
      <Tabs labels={['Monthly', 'Annual']} activeTabFn={toggleTab} />
      <div className={classes.budgetItemsList}>
        {/* <SkeletonTheme baseColor={'#62d5b5'} highlightColor={'#7CEFCF'}> */}
        <SkeletonTheme baseColor={'#E1FFE7'} highlightColor={'#EEFFF4'}>
          {Object.values(categoryEntities).length !== 0 && isLoggedIn ? (
            categoryOrder.map((category) => {
              return (
                <CategoryAccordion
                  key={category.id}
                  categoryTitle={category.id}
                  percent={category.percentOfIncome}
                  budgetedTotal={category.budgetedItemsTotal}
                  totalIncome={totalIncome}
                  spent={category.spent}
                  items={category.itemIds}
                  tabID={activeTab}
                />
              );
            })
          ) : (
            <Skeleton
              borderRadius={0}
              count={5}
              containerClassName={classes.barSkeleton}
              height={66}
              style={{
                borderTop: '4px solid #2d8058',
                marginBottom: '14px',
              }}
            />
          )}
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default CategoryAccordionContainer;
