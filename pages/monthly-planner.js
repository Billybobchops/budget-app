import { useContext, useEffect, useState } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import store from '../store';
import {
  fetchItems,
  fetchPaychecks,
  updateItemPaycheckSelectDoc,
  updateItemPaycheckSortIndexDoc,
  reorderPlannerIds,
  updatePlannerEnd,
  updatePlannerStart,
} from '../store/itemsAndPlanner-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchFunds } from '../store/fund-slice';
import FormContext from '../store/form-context';
import PlannerBackground from '../components/Layout/PlannerBackground';
import Header from '../components/Layout/Header';
import PlannerContainer from '../components/Layout/Containers/PlannerContainer';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import DarkOverlay from '../components/UI/DarkOverlay';
import Portal from '../components/UI/Portal';
import ItemForm from '../components/Forms/ItemForm';
import PlannerForm from '../components/Forms/PlannerForm';
import CategoryForm from '../components/Forms/CategoryForm';
import ProfileBar from '../components/Layout/Sidebar/ProfileBar';
import { selectFormattedMonthYear } from '../store/date-slice';
import { selectCategoryEntities } from '../store/category-slice';
import { selectItemEntities } from '../store/itemsAndPlanner-slice';

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
  const currentDate = useSelector(selectFormattedMonthYear);
  const categories = useSelector(selectCategoryEntities);
  // const items = useSelector(selectItemEntities);
  const buttonsArr = [{ text: 'Budget Item', clickHandler: onItemClick }];

  useEffect(() => {
    if (auth.user && Object.keys(categories).length === 0) {
      const uid = auth.user.uid;
      store.dispatch(fetchCategories(uid));
      store.dispatch(fetchExpenses({ uid, currentDate }));
      store.dispatch(fetchPaychecks(uid));
      store.dispatch(fetchItems(uid));
      store.dispatch(fetchFunds(uid));
    }
  });

  if (!auth.user) return <p>Loading!</p>;

  const onDragEnd = (result) => {
    const { draggableId, destination, source } = result;

    // if user drops draggable outside of any droppable - return
    if (!destination) return;
    // The user dropped the item back in the same position - return
    if (
      destination.droppableId == source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = plannerItems[source.droppableId];
    const startId = start.id;
    const end = plannerItems[destination.droppableId];
    const endId = end.id;
    const destinationIndex = destination.index;
		const document = draggableId;
		const uid = auth.user.uid;
    const newLocation = destination.droppableId;

    if (start === end) {
      // Re-Order operation to happen here: (droppable is the same)
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destinationIndex, 0, draggableId);
      // store.dispatch(reorderPlannerIds({ startId, newItemIds })); // no longer need this line!
			console.log(destinationIndex);
      // First, update state
     
      // Second, update firestore
      // we'll pass in the destination index here to replace the paycheckSortIndex in firestore
      // store.dispatch(
      //   updateItemPaycheckSortIndexDoc({ uid, document, destinationIndex })
      // );
      return;
    }

    // Moving from one droppable list to another
    const startItemsIds = Array.from(start.itemIds);
    startItemsIds.splice(source.index, 1); // remove the dragged itemId from the new array
    store.dispatch(updatePlannerStart({ startId, startItemsIds, draggableId }));

    const endItemsIds = Array.from(end.itemIds);
    endItemsIds.splice(destination.index, 0, draggableId); // insert the dragged item into the new array
    store.dispatch(updatePlannerEnd({ endId, endItemsIds, draggableId }));
    // PERSIST THIS CHANGE ^ let firestore know a re-order has a occurred
    
    store.dispatch(updateItemPaycheckSelectDoc({ uid, document, newLocation })); // persisting
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
      <DragDropContext onDragEnd={onDragEnd}>
        <PlannerBackground>
          <Header title='Monthly Planner' />
          <PlannerContainer plannerHandler={onPlannerClick} />
          <ProfileBar />
          <Sidebar
            hasItemsDragList={true}
            hasButtonBar={true}
            buttons={buttonsArr}
          />
        </PlannerBackground>
      </DragDropContext>
    </>
  );
};

export default PlannerPage;
