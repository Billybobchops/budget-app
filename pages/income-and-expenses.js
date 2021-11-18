import PageBackground from "../components/Layout/PageBackground";
import MainGrid from "../components/Layout/MainGrid";
import Header from "../components/Layout/Header";
import ButtonBar from "../components/Layout/Bars/ButtonBar";
import Button from "../components/UI/Buttons/Button";
import TotalsBar from "../components/Layout/Bars/TotalsBar";
import IncomeExpensesContainer from "../components/Layout/Containers/IncomeExpensesContainer";
import Sidebar from "../components/Layout/Sidebar/Sidebar";

const IncomeExpenses = () => {
  return (
    <PageBackground>
      <MainGrid>
        <Header title="Income and Expenses" hasDatePicker={true} />
        <ButtonBar>
          <Button text="Income" />
          <Button text="Expense" />
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
  );
};

export default IncomeExpenses;
