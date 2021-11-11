import PageBackground from "../components/Layout/PageBackground";
import MainGrid from "../components/Layout/MainGrid";
import Header from "../components/Layout/Header";
import ButtonBar from "../components/Layout/Bars/ButtonBar";
import Button from "../components/UI/Buttons/Button";
import TotalsBar from "../components/Layout/Bars/TotalsBar";
import BudgetContainer from "../components/Layout/Containers/BudgetContainer";
import Sidebar from "../components/Layout/Sidebar/Sidebar";

const Overview = () => {
  return (
    <PageBackground>
      <MainGrid>
        <Header title="Overview" hasDatePicker={true} />
        <ButtonBar>
          <Button text="Budget Category" />
          <Button text="Budget Item" />
        </ButtonBar>
        <TotalsBar />
        <BudgetContainer />
      </MainGrid>
      <Sidebar
        hasProfileBar={true}
        hasBudgetMessage={true}
        hasMonthlyBreakdown={true}
        hasUpcomingBills={true}
      />
    </PageBackground>
  );
};

export default Overview;
