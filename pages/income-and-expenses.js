import { useRequireAuth } from '../hooks/useRequireAuth';
import { useContext } from 'react';
import FormContext from '../store/form-context';
import PageBackground from '../components/Layout/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import ButtonBar from '../components/Layout/Bars/ButtonBar';
import Button from '../components/UI/Buttons/Button';
import TotalsBar from '../components/Layout/Bars/TotalsBar';
import IncomeExpensesContainer from '../components/Layout/Containers/IncomeExpensesContainer';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import Portal from '../components/UI/Portal';
import DarkOverlay from '../components/UI/DarkOverlay';
import IncomeForm from '../components/Forms/IncomeForm';
import ExpenseForm from '../components/Forms/ExpenseForm';

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

  if (!auth.user) {
    return <p>Loading!</p>;
  }

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
          <Header title='Income and Expenses' hasDatePicker={true} />
          <ButtonBar>
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
