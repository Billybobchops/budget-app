import PageBackground from "../components/Layout/PageBackground";
import MainGrid from "../components/Layout/MainGrid";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar/Sidebar";

const SinkingFunds = () => {
  return (
    <PageBackground>
      <MainGrid>
        <Header title="Sinking Funds Calculator" hasDatePicker={false} />
      </MainGrid>
      <Sidebar
        hasProfileBar={true}
        hasBudgetMessage={true}
        hasMonthlyBreakdown={false}
        hasUpcomingBills={false}
      />
    </PageBackground>
  );
};

export default SinkingFunds;
