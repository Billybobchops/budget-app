import { useContext, useEffect } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import store from '../store';
import {
  fetchItems,
  fetchPaychecks,
  reorderIds,
  updateEnd,
  updateStart,
} from '../store/itemsAndPlanner-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchFunds } from '../store/fund-slice';
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
  const currentDate = useSelector((state) => state.date.formattedMonthYear);
  const categories = useSelector((state) => state.categories.entities);
  const expenses = useSelector((state) => state.expenses.entities);
  const paychecks = useSelector(
    (state) => state.itemsAndPlanner.planner.entities
  );
  const funds = useSelector((state) => state.funds.entities);
  const dropContainers = useSelector(
    (state) => state.itemsAndPlanner.totalBudgetedPlanner
  );

  useEffect(() => {
    if (
      auth.user &&
      Object.keys(categories).length === 0 &&
      Object.keys(expenses).length === 0 &&
      Object.keys(paychecks).length === 0 &&
      Object.keys(funds).length === 0
    ) {
      const uid = auth.user.uid;
      store.dispatch(fetchCategories(uid));
      store.dispatch(fetchExpenses({ uid, currentDate }));
      store.dispatch(fetchPaychecks(uid));
      store.dispatch(fetchItems(uid));
      store.dispatch(fetchFunds(uid));
    }
  }, [auth.user, currentDate, categories, expenses, paychecks, funds]);

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

    // create data under totalBudgetedPlanner if it doesn't exist
    if (!dropContainers[destination.droppableId]) {
      const id = destination.droppableId;
      store.dispatch(createDroppableData({ id }));
    }

    const start = dropContainers[source.droppableId];
    const startId = start.id;
    const end = dropContainers[destination.droppableId]; // undefined, bc apart of old closure
    const endId = end.id;

    if (start === end) {
      // Re-Order operation to happen here: (column is the same)
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);
      store.dispatch(reorderIds({ startId, newItemIds }));
      return;
    }

    // Moving from one droppable list to another
    const startItemsIds = Array.from(start.itemIds);
    startItemsIds.splice(source.index, 1); // remove the dragged itemId from the new array
    store.dispatch(updateStart({ startId, startItemsIds, draggableId }));

    const endItemsIds = Array.from(end.itemIds);
    endItemsIds.splice(destination.index, 0, draggableId); // insert the dragged item into the new array
    store.dispatch(updateEnd({ endId, endItemsIds, draggableId }));
    // PERSIST THIS CHANGE ^ let firestore know a re-order has a occurred
    // async thunk HERE to update the paycheckSelect field
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
            <Header title='Monthly Planner' />
            <ButtonBar>
              <Button text='Budget Item' clickHandler={onItemClick} />
            </ButtonBar>
            <PlannerContainer plannerHandler={onPlannerClick} />
          </MainGrid>
          <Sidebar hasProfileBar={true} hasItemsDragList={true} />
        </DragDropContext>
      </PageBackground>
    </>
  );
};

export default PlannerPage;
