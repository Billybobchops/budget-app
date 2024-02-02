import classes from './TotalsBar.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { selectExpenseEntities } from '../../../store/expenses-slice';
import { useAuth } from '../../../hooks/useAuth';

const TotalsBar = () => {
	const { user: isLoggedIn } = useAuth();
	const expenses = useSelector(selectExpenseEntities);
	let totalIn = 0;
	let totalOut = 0;

	if (Object.values(expenses).length !== 0) {
		Object.values(expenses).map((expense) => {
			if (expense.expense) totalOut += expense.amount;
			if (!expense.expense) totalIn += expense.amount;
		});
	}

	return (
		<div className={classes.container}>
			<h2 className={classes.title}>Monthly Totals</h2>

			{expenses && isLoggedIn ? (
				<div className={classes.incomeBar}>
					<div className={classes.barTitle}>Income</div>
					<div className={classes.barAmount}>
						{`$${totalIn.toLocaleString()}`}
					</div>
				</div>
			) : (
				<div className={classes.barSkeleton}>
					<Skeleton borderRadius={0} height={48} />
				</div>
			)}

			{expenses && isLoggedIn ? (
				<div className={classes.expensesBar}>
					<div className={classes.barTitle}>Expenses</div>
					<div className={classes.barAmount}>
						{`$${totalOut.toLocaleString()}`}
					</div>
				</div>
			) : (
				<div className={classes.barSkeleton}>
					<Skeleton borderRadius={0} height={48} />
				</div>
			)}
		</div>
	);
};

export default TotalsBar;
