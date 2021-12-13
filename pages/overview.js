import PageBackground from "../components/Layout/PageBackground";
import MainGrid from "../components/Layout/MainGrid";
import Header from "../components/Layout/Header";
import ButtonBar from "../components/Layout/Bars/ButtonBar";
import Button from "../components/UI/Buttons/Button";
import TotalsBar from "../components/Layout/Bars/TotalsBar";
import BudgetContainer from "../components/Layout/Containers/BudgetContainer";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { DragDropContext } from "react-beautiful-dnd";
import { useRequireAuth } from "../hooks/useRequireAuth";

const Overview = () => {
  const onDragEnd = (result) => {};

  const auth = useRequireAuth();
  console.log(auth.user);

  if (!auth.user) {return <p>Loading!</p>};

  return (
    <PageBackground>
      <MainGrid>
        <Header title="Overview" hasDatePicker={true} />
        <ButtonBar>
          <Button text="Budget Category" />
          <Button text="Budget Item" />
        </ButtonBar>
        <TotalsBar />
        <DragDropContext onDragEnd={onDragEnd}>
          <BudgetContainer />
        </DragDropContext>
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
