import classes from './CategoryAccordionContainer.module.css';
import CategoryAccordion from '../../UI/accordions/CategoryAccordion';
import HighLowToggle from '../../UI/HighLowToggle';
import Tabs from '../../UI/Tabs';
import { useAuth } from '../../../hooks/useAuth';
import Skeleton from 'react-loading-skeleton';
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

	const listBackgroundClass =
		Object.values(categoryEntities).length !== 0 && isLoggedIn
			? classes.budgetItemsList
			: classes.budgetItemsListLoading;

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

			{Object.values(categoryEntities).length !== 0 && isLoggedIn ? (
				<Tabs labels={['Monthly', 'Annual']} activeTabFn={toggleTab} />
			) : (
				''
			)}

			<div className={listBackgroundClass}>
				{Object.values(categoryEntities).length !== 0 && isLoggedIn ? (
					categoryOrder.map((category) => {
						return (
							<CategoryAccordion
								budgetedTotal={category.budgetedItemsTotal}
								categoryTitle={category.id}
								items={category.itemIds}
								key={category.id}
								percent={category.percentOfIncome}
								spent={category.spent}
								tabID={activeTab}
								totalIncome={totalIncome}
							/>
						);
					})
				) : (
					<Skeleton
						borderRadius={0}
						count={5}
						height={66}
						style={{
							marginBottom: '14px',
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default CategoryAccordionContainer;
