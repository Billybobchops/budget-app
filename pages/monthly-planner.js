import { useContext, useEffect } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import store from '../store';
import { fetchItems } from '../store/item-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchPaychecks } from '../store/planner-slice';
import { fetchFunds } from '../store/fund-slice';
import { calcTotalPay } from '../store/planner-slice';
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
  const categories = useSelector((state) => state.categories.entities);
  const expenses = useSelector((state) => state.expenses.entities);
  const paychecks = useSelector((state) => state.planner.entities);
  const funds = useSelector((state) => state.funds.entities);

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
      store.dispatch(fetchItems(uid));
      store.dispatch(fetchExpenses(uid));
      store.dispatch(fetchPaychecks(uid));
      store.dispatch(fetchFunds(uid));
      store.dispatch(calcTotalPay());
    }
  }, [auth.user, categories, expenses, paychecks, funds]);

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
