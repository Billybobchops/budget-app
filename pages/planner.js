import PageBackground from "../components/Layout/PageBackground";
import MainGrid from "../components/Layout/MainGrid";
import Header from "../components/Layout/Header";
import ButtonBar from "../components/Layout/Bars/ButtonBar";
import PlannerContainer from "../components/Layout/Containers/PlannerContainer";
import Button from "../components/UI/Buttons/Button";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { DragDropContext } from 'react-beautiful-dnd';

const PlannerPage = () => {
  return (
    <PageBackground>
      <MainGrid>
        <Header title="Planner" hasDatePicker={false} />
        <ButtonBar>
          <Button text="Budget Item" />
        </ButtonBar>
        <PlannerContainer />
      </MainGrid>
      <Sidebar
        hasProfileBar={true}
        hasItemsDragList={true}
      />
    </PageBackground>
  );
};

export default PlannerPage;
