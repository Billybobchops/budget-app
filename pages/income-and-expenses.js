import { useContext, useEffect } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useSelector } from 'react-redux';
import store from '../store';
import { fetchItems } from '../store/items-slice';
import { fetchPaychecks } from '../store/planner-slice';
import { fetchPaycheckOrder } from '../store/paycheckOrder-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchFunds } from '../store/fund-slice';
import FormContext from '../store/form-context';
import PageBackground from '../components/Layout/Containers/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/header/Header';
import ButtonBar from '../components/Layout/Bars/ButtonBar';
import Button from '../components/UI/buttons/Button';
import TotalsBar from '../components/Layout/Bars/TotalsBar';
import IncomeExpensesContainer from '../components/Layout/Containers/IncomeExpensesContainer';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import Portal from '../components/UI/Portal';
import DarkOverlay from '../components/UI/DarkOverlay';
import IncomeForm from '../components/Forms/IncomeForm';
import ExpenseForm from '../components/Forms/ExpenseForm';
import { selectFormattedMonthYear } from '../store/date-slice';
import { selectCategoryEntities } from '../store/category-slice';
import { selectExpenseEntities } from '../store/expenses-slice';
import { selectPaycheckEntities } from '../store/planner-slice';
import { selectFundEntities } from '../store/fund-slice';

const IncomeExpenses = () => {
	const {
		modal,
		incomeForm,
		expenseForm,
		onkeydown,
		onIncomeClick,
		onExpenseClick,
	} = useContext(FormContext);

	const auth = useRequireAuth();
	const currentDate = useSelector(selectFormattedMonthYear);
	const categories = useSelector(selectCategoryEntities);
	const expenses = useSelector(selectExpenseEntities);
	const paychecks = useSelector(selectPaycheckEntities);
	const funds = useSelector(selectFundEntities);

	useEffect(() => {
		if (
			auth.user &&
			Object.keys(categories).length === 0 &&
			Object.keys(expenses).length === 0 &&
			Object.keys(paychecks).length === 0 &&
			Object.keys(funds).length === 0
		) {
			const uid = auth.user.uid;
			store.dispatch(fetchCategories(uid));
			store.dispatch(fetchExpenses({ uid, currentDate }));
			store.dispatch(fetchPaychecks(uid));
			store.dispatch(fetchPaycheckOrder(uid));
			store.dispatch(fetchItems(uid));
			store.dispatch(fetchFunds(uid));
		}
	}, [auth.user, currentDate, categories, expenses, paychecks, funds]);

	return (
		<>
			<Portal selector='#portal'>
				{modal && (
					<DarkOverlay onKeyDown={onkeydown}>
						{incomeForm && <IncomeForm />}
						{expenseForm && <ExpenseForm />}
					</DarkOverlay>
				)}
			</Portal>
			<PageBackground>
				<MainGrid>
					<Header title='Income and Expenses' />
					<ButtonBar title={'Add New'}>
						<Button text='Income' clickHandler={onIncomeClick} />
						<Button text='Expense' clickHandler={onExpenseClick} />
					</ButtonBar>
					<TotalsBar />
					<IncomeExpensesContainer />
				</MainGrid>
				<Sidebar
					hasProfileBar={true}
					hasBudgetMessage={true}
					hasUpcomingBills={true}
				/>
			</PageBackground>
		</>
	);
};

export default IncomeExpenses;
