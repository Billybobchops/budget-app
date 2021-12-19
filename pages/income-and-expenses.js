import PageBackground from '../components/Layout/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import ButtonBar from '../components/Layout/Bars/ButtonBar';
import Button from '../components/UI/Buttons/Button';
import TotalsBar from '../components/Layout/Bars/TotalsBar';
import IncomeExpensesContainer from '../components/Layout/Containers/IncomeExpensesContainer';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import { useRequireAuth } from '../hooks/useRequireAuth';
import Portal from '../components/UI/Portal';
import DarkOverlay from '../components/UI/DarkOverlay';
import { useState } from 'react';
import IncomeForm from '../components/Forms/IncomeForm';

const IncomeExpenses = () => {
  const [modal, setModal] = useState(false);
  const [incomeForm, setIncomeForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState(false);

  const auth = useRequireAuth();

  if (!auth.user) {
    return <p>Loading!</p>;
  }

  const keyDownHandler = () => {
    setModal(false);
    setIncomeForm(false);
    setExpenseForm(false);
  };

  const incomeClickHandler = () => {
    setModal(true);
    setIncomeForm(true);
  };

  const expenseClickHandler = () => {
    setModal(true);
    setExpenseForm(true);
  };

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={keyDownHandler}>
            {incomeForm && <IncomeForm onOverlayClick={keyDownHandler} />}
            {/* {expenseForm && <ExpenseForm onOverlayClick={keyDownHandler} />} */}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <MainGrid>
          <Header title='Income and Expenses' hasDatePicker={true} />
          <ButtonBar>
            <Button text='Income' clickHandler={incomeClickHandler} />
            <Button text='Expense' clickHandler={expenseClickHandler} />
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
