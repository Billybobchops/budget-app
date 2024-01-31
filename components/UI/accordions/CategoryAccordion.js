import classes from './CategoryAccordion.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import BudgetItem from '../items/BudgetItem';
import KebabMenu from '../KebabMenu';
import { Droppable } from 'react-beautiful-dnd';

const CategoryAccordion = ({
	budgetedTotal,
	categoryTitle,
	items,
	percent,
	spent,
	tabID,
	totalIncome,
}) => {
	const [isActive, setIsActive] = useState(false);
	const activeHandler = () => { setIsActive(!isActive) };
	
	const percentDisplay =
		percent * 100 <= 1 ? (
			<span className={classes.percentage}>{'< 1%'}</span>
		) : (
			<span className={classes.percentage}>
				{(percent * 100).toFixed(0)}% of Income
			</span>
	);

	let budgeted = budgetedTotal !== undefined ? +budgetedTotal.toFixed(2) : 0;

	if (tabID === 'Annual') {
		budgeted = +(budgeted * 12).toFixed(2);
		totalIncome = totalIncome * 12;
	}

	let balanceClass = null;
	let balanceString = null;

	if (spent === budgeted) {
		balanceClass = 'balanced';
		balanceString = `Balanced!`;
	}

	if (spent > budgeted) {
		balanceClass = 'over';
		let num =
			(spent - budgeted) % 1 === 0
				? spent - budgeted
				: (spent - budgeted).toFixed(2);
		balanceString = `$${num.toLocaleString()} Over`;
	}

	if (spent < budgeted) {
		balanceClass = 'under';
		let num =
			(budgeted - spent) % 1 === 0
				? budgeted - spent
				: +(budgeted - spent).toFixed(2);
		balanceString = `$${num.toLocaleString()} Under`;
	}

	if (spent === 0 && budgeted === 0) {
		balanceClass = '';
		balanceString = '';
	}

	const activeBar = (
		<div className={classes.activeBar}>
			<div className={`${classes.activeBalanceChip} ${classes[balanceClass]}`}>{balanceString}</div>

			<div className={classes.activeFraction}>
				<div className={classes.flex}>
					<div className={classes.spent}><span className={classes.bold}>Spent</span> ${spent}</div>
					<div className={classes.slash}>/ </div>
					<div className={classes.budgeted}><span className={classes.bold}>Budgeted</span> ${budgeted}</div>
				</div>
			</div>
		</div>
	);

	const kebabMenuActions = [
		{
			title: 'Edit',
			actionFn: () => {
				// setIsEditing(true);
			},
		},
		{
			title: 'Move',
			actionFn: () => {
				// setIsMoving(true);
				// To-Do: display form of sorts for choosing which category to move the item to
			},
		},
		{
			title: 'Delete',
			actionFn: () => {
				// setIsDeleting(true);
			},
		},
	];

	return (
		<Droppable droppableId={categoryTitle} key={categoryTitle}>
			{(provided, snapshot) => (
				<div
					className={`${snapshot.isDraggingOver && classes.backgroundDrag}`}
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					<div className={classes.primaryContainer}>
						<div onClick={activeHandler} className={classes.childContainer}>
							<FontAwesomeIcon icon={isActive ? faMinus : faPlus} className={classes.toggle}/>

							<h2 className={classes.title}>
								{categoryTitle}
								{totalIncome && percentDisplay}
								{!totalIncome && ''}
							</h2>

							<div className={`${classes.budgetGridItem} ${classes.flex}`}>
								<p className={classes.spent}><span className={classes.bold}>Spent</span>{' '}${spent}</p>
								<span className={classes.slash}>/</span>
								<p className={classes.budgeted}>${budgeted.toLocaleString()}</p>
							</div>

							<p className={classes[balanceClass]}>{balanceString}</p>
						</div>
						<KebabMenu kebabMenuActions={kebabMenuActions} baseColor='#3fb896'/>
					</div>

					<ul className={classes.list}>
						{isActive && activeBar}

						{isActive &&
							items &&
							items.map((item, index) => {
								return (
									<BudgetItem
										accordionType={'category'}
										budgetedAmount={item.budgetAmount}
										date={item.billDate}
										index={index}
										key={item.id}
										tabID={tabID}
										title={item.id}
									/>
								);
						})}
						{provided.placeholder}
					</ul>
				</div>
			)}
		</Droppable>
	);
};

export default CategoryAccordion;
