import classes from './CategoryAccordion.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faX } from '@fortawesome/free-solid-svg-icons';
import BudgetItem from '../items/BudgetItem';
import KebabMenu from '../KebabMenu';
import { Droppable } from 'react-beautiful-dnd';
import store from '../../../store';
import { batchUpdateCategoryDoc, batchDeleteCategoryDoc } from '../../../store/category-slice';
import { useAuth } from '../../../hooks/useAuth';
import { deleteClientItems } from '../../../store/items-slice';
import { deleteClientExpenses } from '../../../store/expenses-slice';

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
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [prevTitle, setPrevTitle] = useState(categoryTitle);
	const [localTitle, setLocalTitle] = useState(categoryTitle);
	const { user: { uid } } = useAuth();
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

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsEditing(false);
		const prevID = prevTitle;
		const newID = localTitle;
		store.dispatch(batchUpdateCategoryDoc({ uid, prevID, newID })); 
		setPrevTitle(newID);
	};

	const kebabMenuActions = [
		{
			title: 'Edit',
			actionFn: () => {
				setIsEditing(true);
			},
		},
		{
			title: 'Delete',
			actionFn: () => {
				setIsDeleting(true);
			},
		},
	];

	const editCategory = (
		<form className={classes.formContainer} onSubmit={handleSubmit}>
			<label>
				Title:
				<input
					className={classes.input}
					name='Title'
					onChange={(e) => setLocalTitle(e.target.value)}
					required
					type='text'
					value={localTitle}
				/>
			</label>
			<div className={classes.buttonsContainer}>
				<button className={`${classes.button}`}>Save</button>
				<button
					className={`${classes.cancelButton}`}
					onClick={(e) => {
						e.preventDefault();
						setIsEditing(false);
						setLocalTitle(prevTitle);
					}}
					aria-label='Cancel'>
					<FontAwesomeIcon icon={faX} />
					<span className={classes.mobileCancelText}>Cancel</span>
				</button>
			</div>
		</form>
	);

	const deleteCategory = (
		<div className={classes.deleteContainer}>
			<p>Are you sure you want to delete: <strong>{localTitle}</strong>? This will delete all associated budget items and expenses.</p>
			<div>
				<button
					className={`${classes.confirmDelete}`}
					onClick={() => {
						const categoryID = localTitle;
						store.dispatch(batchDeleteCategoryDoc({ uid, categoryID })); // batch FB update
						// dispatch front end only (non-thunk) actions that update the FE for budgetItems & expenseItems
						store.dispatch(deleteClientItems(categoryID));
						store.dispatch(deleteClientExpenses(categoryID));
						setIsDeleting(false);
					}}
				>
					Yes
				</button>
				<button
					className={`${classes.cancelDelete}`}
					onClick={() => {setIsDeleting(false)}}
				>
					No
				</button>
			</div>
		</div>
	);

	const staticCategory = (
		<>
			<div onClick={activeHandler} className={classes.childContainer}>
				<FontAwesomeIcon
					icon={isActive ? faMinus : faPlus}
					className={classes.toggle}
				/>
				<h2 className={classes.title}>
					{localTitle}{totalIncome && percentDisplay}{!totalIncome && ''}
				</h2>
				<div className={`${classes.budgetGridItem} ${classes.flex}`}>
					<p className={classes.spent}><span className={classes.bold}>Spent</span> ${spent}</p>
					<span className={classes.slash}>/</span>
					<p className={classes.budgeted}>${budgeted.toLocaleString()}</p>
				</div>
				<p className={classes[balanceClass]}>{balanceString}</p>
			</div>
			<KebabMenu
				kebabMenuActions={kebabMenuActions}
				baseColor='#3fb896'
			/>
		</>
	);

	let categoryContent;
	if (isEditing) {
		categoryContent = editCategory;
	} else if (isDeleting) {
		categoryContent = deleteCategory;
	} else {
		categoryContent = staticCategory;
	}

	return (
		<Droppable droppableId={categoryTitle} key={categoryTitle}>
			{(provided, snapshot) => (
				<div
					className={`${snapshot.isDraggingOver && classes.backgroundDrag}`}
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					<div className={`${classes.primaryContainer} ${isDeleting ? classes.deleteBackground : ''}`}>{categoryContent}</div>

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
