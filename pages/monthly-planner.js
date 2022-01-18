import { useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getPlannedIncome } from '../firebase/planner';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { DragDropContext } from 'react-beautiful-dnd';
import FormContext from '../store/form-context';
import PageBackground from '../components/Layout/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import ButtonBar from '../components/Layout/Bars/ButtonBar';
import PlannerContainer from '../components/Layout/Containers/PlannerContainer';
import Button from '../components/UI/Buttons/Button';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import DarkOverlay from '../components/UI/DarkOverlay';
import Portal from '../components/UI/Portal';
import ItemForm from '../components/Forms/ItemForm';
import PlannerForm from '../components/Forms/PlannerForm';
import CategoryForm from '../components/Forms/CategoryForm';

import dummyData from '../store/dummyData';

const PlannerPage = () => {
  const {
    modal,
    itemForm,
    plannerForm,
    categoryForm,
    onkeydown,
    onItemClick,
    onPlannerClick,
  } = useContext(FormContext);

  const auth = useRequireAuth();
  const [paychecks, setPaychecks] = useState(null);
  const [budgetItems, setBudgetItems] = useState(dummyData.budgetItems); // get rid of dummy!

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const paychecks = await getPlannedIncome(uid);
        setPaychecks(paychecks);
      }
    });
  }, []);

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

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={onkeydown}>
            {itemForm && <ItemForm />}
            {plannerForm && <PlannerForm />}
            {categoryForm && <CategoryForm />}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <DragDropContext onDragEnd={onDragEnd}>
          <MainGrid>
            <Header title='Monthly Planner' hasDatePicker={false} />
            <ButtonBar>
              <Button text='Budget Item' clickHandler={onItemClick} />
            </ButtonBar>
            <PlannerContainer
              checks={paychecks}
              items={budgetItems}
              plannerHandler={onPlannerClick}
            />
          </MainGrid>
          <Sidebar hasProfileBar={true} hasItemsDragList={true} />
        </DragDropContext>
      </PageBackground>
    </>
  );
};

export default PlannerPage;
