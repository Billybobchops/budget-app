import PageBackground from "../components/Layout/PageBackground";
import MainGrid from "../components/Layout/MainGrid";
import Header from "../components/Layout/Header";
import ButtonBar from "../components/Layout/Bars/ButtonBar";
import PlannerContainer from "../components/Layout/Containers/PlannerContainer";
import Button from "../components/UI/Buttons/Button";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import dummyData from "../store/dummyData";

const PlannerPage = () => {
  const [budgetItems, setBudgetItems] = useState(dummyData.budgetItems);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    // Guard clause: if user drops draggable outside of droppable
    if (!destination) return;
    // The user dropped the item back in the same position
    if (
      destination.droppableId == source.droppableId &&
      destination.index === source.index
    )
      return;

    const newItems = Array.from(budgetItems);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);

    setBudgetItems(newItems);
  };

  return (
    <PageBackground>
      <DragDropContext onDragEnd={onDragEnd}>
        <MainGrid>
          <Header title="Planner" hasDatePicker={false} />
          <ButtonBar>
            <Button text="Budget Item" />
          </ButtonBar>
          <PlannerContainer
            items={budgetItems}
            checks={dummyData.dummyPaychecks}
          />
        </MainGrid>
        <Sidebar hasProfileBar={true} hasItemsDragList={true} />
      </DragDropContext>
    </PageBackground>
  );
};

export default PlannerPage;
