import classes from './BudgetItem.module.css';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import KebabMenu from '../KebabMenu';
import store from '../../../store';
import { deleteItemDoc, updateItemDoc } from '../../../store/items-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const BudgetItem = ({
	accordionType,
	budgetedAmount,
	date,
	index,
	tabID,
	title,
}) => {
	const expenses = useSelector((state) => state.expenses.entities);
	const { user: { uid } } = useAuth();
	const currentYear = new Date().getFullYear();
	const initialLocalItem = {
		title,
		billDate: `${currentYear}-${date.slice(0, 2)}-${date.slice(-2)}`,
		amount: budgetedAmount,
	};
	const [localItem, setLocalItem] = useState(initialLocalItem);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const idToUpdate = title;
	const daySlice = date.slice(-2);
	const staticDisplayDate = new Date().getDate() === +daySlice ? 'Today' : date;

	let balanceClass = null;
	let balanceString = null;
	let spent = 0;

	if (Object.values(expenses).length !== 0) {
		Object.values(expenses).map((expense) => {
			if (title === expense.title) spent += expense.amount;
		});
	}

	if (spent === budgetedAmount) {
		balanceClass = 'balanced';
		balanceString = '✅ Balanced';
	} else if (spent > budgetedAmount) {
		balanceClass = 'over';
		balanceString = '🔺 Over';
	} else if (spent < budgetedAmount) {
		balanceClass = 'under';
		balanceString = '🎉 Under';
	}

	if (tabID === 'Annual') budgetedAmount = budgetedAmount * 12;

	const handleDateChange = (e) => {
		const formattedDate = `${currentYear}-${e.target.value.slice(5, 7)}-${e.target.value.slice(-2)}`;
		setLocalItem({ ...localItem, billDate: formattedDate });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = {
			id: localItem.title,
			billDate: `${localItem.billDate.slice(5, 7)}/${localItem.billDate.slice(-2)}`,
			budgetAmount: +localItem.amount,
		};
		store.dispatch(updateItemDoc({ uid, idToUpdate, newData }));
		setIsEditing(false);
	};

	const kebabMenuActions = [
		{
			title: 'Edit',
			actionFn: () => {
				setIsEditing(true);
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
				setIsDeleting(true);
			},
		},
	];

	// EDIT FORM DEFINITELY NEEDS INPUT VALIDATION...
	const editItem = (
		<form className={classes.formContainer} onSubmit={handleSubmit}>
			<label>
				Title:
				<input
					className={classes.input}
					minLength='1'
					name='title'
					onChange={(e) => setLocalItem({ ...localItem, title: e.target.value })}
					required
					type='text'
					value={localItem.title}
				/>
			</label>
			<label>
				Bill Date:
				<input
					className={classes.input}
					name='date'
					onChange={(e) => {handleDateChange(e)}}
					required
					type='date'
					value={localItem.billDate}
				/>
			</label>
			<label>
				Amount:
				<input
					className={`${classes.input} ${classes.amountInput}`}
					name='amount'
					onChange={(e) => setLocalItem({ ...localItem, amount: e.target.value })}
					required
					type='number'
					value={localItem.amount}
				/>
			</label>
			<div className={classes.buttonsContainer}>
				<button className={`${classes.button}`}>Save</button>
				<button
					className={`${classes.cancelButton}`}
					onClick={(e) => {
						e.preventDefault();
						setIsEditing(false);
						setLocalItem({ ...initialLocalItem });
					}}
					aria-label='Cancel'>
					<FontAwesomeIcon icon={faX} />
					<span className={classes.mobileCancelText}>Cancel</span>
				</button>
			</div>
		</form>
	);
	
	const deleteItem = (
		<div className={classes.deleteContainer}>
			<p>Are you sure you want to delete: <strong>{localItem.title}</strong>?</p>
			<div>
				<button
					className={`${classes.confirmDelete}`}
					onClick={() => {
						const documentId = localItem.title;
						store.dispatch(deleteItemDoc({ uid, documentId }));
						setIsDeleting(false);
					}}
				>
					Yes
				</button>
				<button
					className={`${classes.cancelDelete}`}
					onClick={() => {
						setIsDeleting(false);
					}}>
					No
				</button>
			</div>
		</div>
	);

	const staticItem = (
		<div className={classes.staticChildContainer}>
			<p className={classes.title}>{localItem.title}</p>
			<p className={classes.date}>{staticDisplayDate}</p>
			<div className={classes.spent}>
				<div className={classes.flex}>
					<p><span className={classes.bold}>Spent</span> ${spent}</p>
					<div className={classes.slash}>/</div>
					<div>${localItem.amount}</div>
				</div>
			</div>
			<div className={classes.chip}>
				<p className={classes[balanceClass]}>{balanceString}!</p>
			</div>
		</div>
	);

	let itemContent;
	if (isEditing) {
		itemContent = editItem;
	} else if (isDeleting) {
		itemContent = deleteItem;
	} else {
		itemContent = staticItem;
	}

	return (
		<Draggable
			key={title}
			draggableId={title}
			index={index}
			isDragDisabled={isEditing || isDeleting}
		>
			{(provided, snapshot) => {
				return (
					<li>
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<div
								className={`${isEditing || isDeleting ? classes.editContainer : classes.primaryContainer} ${snapshot.isDragging && 'backgroundDrag'} ${accordionType === 'planner' && 'plannerMargin'}`}
							>
								{itemContent}
								{!isEditing && !isDeleting && (
									<KebabMenu kebabMenuActions={kebabMenuActions} baseColor="#e3e3e3"/>
								)}
							</div>
						</div>
					</li>
				);
			}}
		</Draggable>
	);
};

export default BudgetItem;
