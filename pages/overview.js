import { useContext, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useSelector } from 'react-redux';
import store from '../store';
import {
  fetchItems,
  fetchPaychecks,
	updateCategoryItemDoc,
  reorderCategoryIds,
	updateCategoryStart,
	updateCategoryEnd,
} from '../store/itemsAndPlanner-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchFunds } from '../store/fund-slice';
import FormContext from '../store/form-context';
import PageBackground from '../components/Layout/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import ButtonBar from '../components/Layout/Bars/ButtonBar';
import Button from '../components/UI/Buttons/Button';
import TotalsBar from '../components/Layout/Bars/TotalsBar';
import BudgetContainer from '../components/Layout/Containers/BudgetContainer';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import DarkOverlay from '../components/UI/DarkOverlay';
import Portal from '../components/UI/Portal';
import CategoryForm from '../components/Forms/CategoryForm';
import ItemForm from '../components/Forms/ItemForm';

const Overview = () => {
  const {
    modal,
    itemForm,
    categoryForm,
    onkeydown,
    onCategoryClick,
    onItemClick,
  } = useContext(FormContext);

  const auth = useRequireAuth();
  const currentDate = useSelector((state) => state.date.formattedMonthYear);
  const categories = useSelector((state) => state.categories.entities);
  const items = useSelector((state) => state.itemsAndPlanner.items.entities);
  const expenses = useSelector((state) => state.expenses.entities);
  const paychecks = useSelector(
    (state) => state.itemsAndPlanner.planner.entities
  );
  const paycheckStatus = useSelector(
    (state) => state.itemsAndPlanner.planner.status
  );
  const funds = useSelector((state) => state.funds.entities);
  const dropContainers = useSelector(
    (state) => state.itemsAndPlanner.totalBudgetedCategory
  );

  useEffect(() => {
    if (
      auth.user &&
      Object.keys(categories).length === 0 &&
      Object.keys(items).length === 0 &&
      Object.keys(expenses).length === 0 &&
      Object.keys(paychecks).length === 0 &&
      paycheckStatus !== 'noPaychecksAdded' &&
      Object.keys(funds).length === 0
    ) {
      const uid = auth.user.uid;
      store.dispatch(fetchCategories(uid));
      store.dispatch(fetchExpenses({ uid, currentDate }));
      store.dispatch(fetchPaychecks(uid));
      store.dispatch(fetchItems(uid));
      store.dispatch(fetchFunds(uid));
    }
  }, [
    auth.user,
    currentDate,
    categories,
    items,
    expenses,
    paychecks,
    funds,
    paycheckStatus,
  ]);

  if (!auth.user) {
    return <p>Loading!</p>;
  }

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

    const start = dropContainers[source.droppableId];
    const startId = start.id;
    const end = dropContainers[destination.droppableId]; // undefined, bc apart of old closure
    const endId = end.id;

    if (start === end) {
      // Re-Order operation to happen here: (droppable is the same)
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);
      store.dispatch(reorderCategoryIds({ startId, newItemIds }));
      return;
    }

    // Moving from one droppable list to another
    const startItemsIds = Array.from(start.itemIds);
    startItemsIds.splice(source.index, 1); // remove the dragged itemId from the new array
    store.dispatch(updateCategoryStart({ startId, startItemsIds, draggableId }));

    const endItemsIds = Array.from(end.itemIds);
    endItemsIds.splice(destination.index, 0, draggableId); // insert the dragged item into the new array
    store.dispatch(updateCategoryEnd({ endId, endItemsIds, draggableId }));
    // PERSIST THIS CHANGE ^ let firestore know a re-order has a occurred
    const uid = auth.user.uid;
    const document = draggableId;
    const newCategory = destination.droppableId;
    store.dispatch(updateCategoryItemDoc({ uid, document, newCategory })); // persisting
  };

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={onkeydown}>
            {categoryForm && <CategoryForm />}
            {itemForm && <ItemForm />}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <MainGrid>
          <Header title='Overview' />
          <ButtonBar>
            <Button text='Budget Category' clickHandler={onCategoryClick} />
            <Button text='Budget Item' clickHandler={onItemClick} />
          </ButtonBar>
          <TotalsBar />
          <DragDropContext onDragEnd={onDragEnd}>
            <BudgetContainer />
          </DragDropContext>
        </MainGrid>
        <Sidebar
          hasProfileBar={true}
          hasBudgetMessage={true}
          hasCategoryPie={true}
          hasUpcomingBills={true}
        />
      </PageBackground>
    </>
  );
};

export default Overview;
