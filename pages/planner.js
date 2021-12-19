import { useState } from 'react';
import PageBackground from '../components/Layout/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import ButtonBar from '../components/Layout/Bars/ButtonBar';
import PlannerContainer from '../components/Layout/Containers/PlannerContainer';
import Button from '../components/UI/Buttons/Button';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import { DragDropContext } from 'react-beautiful-dnd';
import dummyData from '../store/dummyData';
import { useRequireAuth } from '../hooks/useRequireAuth';
import DarkOverlay from '../components/UI/DarkOverlay';
import Portal from '../components/UI/Portal';
import ItemForm from '../components/Forms/ItemForm';
import PlannerForm from '../components/Forms/PlannerForm';

const PlannerPage = () => {
  const [modal, setModal] = useState(false);
  const [itemForm, setItemForm] = useState(false);
  const [plannerForm, setPlannerForm] = useState(false);

  const [budgetItems, setBudgetItems] = useState(dummyData.budgetItems); // get rid of dummy!
  const auth = useRequireAuth();

  if (!auth.user) return <p>Loading!</p>;

  const onDragEnd = (result) => {
    const { destination, source } = result;

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
    // PERSIST THIS CHANGE ^ BY CALL THE DB ENDPOINT AFTER THIS UPDATE!!!!
  };

  const keyDownHandler = () => {
    setModal(false);
    setItemForm(false);
    setPlannerForm(false);
  };

  const itemClickHandler = () => {
    setModal(true);
    setItemForm(true);
  };

  const plannerClickHandler = () => {
    setModal(true);
    setPlannerForm(true);
  };

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={keyDownHandler}>
            {itemForm && <ItemForm onOverlayClick={keyDownHandler} />}
            {plannerForm && <PlannerForm onOverlayClick={keyDownHandler} />}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <DragDropContext onDragEnd={onDragEnd}>
          <MainGrid>
            <Header title='Planner' hasDatePicker={false} />
            <ButtonBar>
              <Button text='Budget Item' clickHandler={itemClickHandler} />
            </ButtonBar>
            <PlannerContainer
              items={budgetItems}
              checks={dummyData.dummyPaychecks}
              plannerHandler={plannerClickHandler}
            />
          </MainGrid>
          <Sidebar hasProfileBar={true} hasItemsDragList={true} />
        </DragDropContext>
      </PageBackground>
    </>
  );
};

export default PlannerPage;
