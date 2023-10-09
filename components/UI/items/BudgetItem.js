import classes from './BudgetItem.module.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

const BudgetItem = ({
    title,
    index,
    budgetedAmount,
    date,
    tabID,
    accordionType,
}) => {
    // className={`${[classes.primaryContainer, classes[`${snapshot.isDragging && "backgroundDrag"}`],].join(" ")}`}
    const daySlice = date.slice(-2);
    const today = new Date().getDate();
    const dateString = +daySlice === today ? 'Today' : date;
    // const displayDate = `${
    //   dateString === 'Today' ? `Bills` : 'Bills on'
    // } ${dateString}`;

    const displayDate = `${dateString === 'Today' ? `Today` : date}`;

    const expenses = useSelector((state) => state.expenses.entities);
    let balanceClass = null;
    let balanceString = null;
    let spent = 0;

    // would it be better to do this via item-slice once on fetch?
    // instead of every time the accordion opens/closes...
    if (Object.values(expenses).length !== 0) {
        Object.values(expenses).map((expense) => {
            if (title === expense.title) spent += expense.amount;
            // console.log('func running'); // 20 freaking times for 5 items! Must fix.
            // runs for each item for EVERY SINGLE EXPENSE that's in state....
            // ADD THIS TO useEffect ya dingus!
        });
    }

    if (spent === budgetedAmount) {
        balanceClass = 'balanced';
        balanceString = '✅ Balanced';
    }

    if (spent > budgetedAmount) {
        balanceClass = 'over';
        balanceString = '🔺 Over';
    }

    if (spent < budgetedAmount) {
        balanceClass = 'under';
        balanceString = '🎉 Under';
    }

    if (tabID === 'Annual') budgetedAmount = budgetedAmount * 12;

    const displayKebabOptions = () => {
        console.log('Function separate oh yeah');
    };

    return (
        <Draggable key={title} draggableId={title} index={index}>
            {(provided, snapshot) => {
                const style = `${[
                    classes.primaryContainer,
                    classes[`${snapshot.isDragging && 'backgroundDrag'}`],
                    classes[
                        `${accordionType === 'planner' && 'plannerMargin'}`
                    ],
                ].join(' ')}`;

                return (
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
						<div className={classes.parentContainer}>
							<div className={style}>
								<div className={classes.secondaryContainer}>
									<div className={classes.title}>{title}</div>

									<div className={classes.date}>
										<div>{displayDate}</div>
									</div>

									<div className={classes.spent}>
										<div className={classes.flex}>
											<div>
												<span className={classes.bold}>
													Spent
												</span>{' '}
												${spent}
											</div>

											<div className={classes.slash}>/</div>

											<div>${budgetedAmount}</div>
										</div>
									</div>

									<div className={classes.chip}>
										<div className={classes[balanceClass]}>
											{balanceString}!
										</div>
									</div>
								</div>
								
								<button
									className={classes.kebab}
									onClick={displayKebabOptions}
								>
									<FontAwesomeIcon icon={faEllipsisH} />
								</button>
							</div>
						</div>
                    </li>
                );
            }}
        </Draggable>
    );
};

export default BudgetItem;