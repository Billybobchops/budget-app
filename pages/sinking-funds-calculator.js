import PageBackground from "../components/Layout/PageBackground";
import MainGrid from "../components/Layout/MainGrid";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import SinkingFundsContainer from "../components/Layout/Containers/SinkingFundsContainer";

const SinkingFunds = () => {
  return (
    <PageBackground>
      <MainGrid>
        <Header title="Sinking Funds Calculator" hasDatePicker={false} />
        <SinkingFundsContainer />
      </MainGrid>
      <Sidebar hasProfileBar={true} hasBudgetMessage={true} />
    </PageBackground>
  );
};

export default SinkingFunds;
