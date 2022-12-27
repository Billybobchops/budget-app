import { useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useSelector } from 'react-redux';
import store from '../store';
import {
  fetchItems,
  updateCategoryItemDoc,
  // reorderCategoryIds,
  updateCategoryStart,
  updateCategoryEnd,
} from '../store/items-slice';
import { fetchPaychecks } from '../store/planner-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchFunds } from '../store/fund-slice';
import FormContext from '../store/form-context';
import PageBackground from '../components/Layout/Containers/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import ButtonBar from '../components/Layout/Bars/ButtonBar';
import Button from '../components/UI/Buttons/Button';
import TotalsBar from '../components/Layout/Bars/TotalsBar';
import CategoryAccordionContainer from '../components/Layout/Containers/CategoryAccordionContainer';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import DarkOverlay from '../components/UI/DarkOverlay';
import Portal from '../components/UI/Portal';
import CategoryForm from '../components/Forms/CategoryForm';
import ItemForm from '../components/Forms/ItemForm';
import { selectFormattedMonthYear } from '../store/date-slice';
import { selectCategoryEntities } from '../store/category-slice';
import { selectCategoryIds } from '../store/category-slice';
import { selectExpenseEntities } from '../store/expenses-slice';
import { selectItemEntities, selectPaycheckStatus } from '../store/items-slice';
import { selectPaycheckEntities } from '../store/planner-slice';
import { selectFundEntities } from '../store/fund-slice';

const Overview = () => {
  const {
    modal,
    itemForm,
    categoryForm,
    onkeydown,
    onCategoryClick,
    onItemClick,
  } = useContext(FormContext);

  const [categoryOrder, setCategoryOrder] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const auth = useRequireAuth();
  const currentDate = useSelector(selectFormattedMonthYear);
  const categoryEntities = useSelector(selectCategoryEntities);
  const categoryIds = useSelector(selectCategoryIds);
  const expenses = useSelector(selectExpenseEntities);
  const items = useSelector(selectItemEntities);
  const income = useSelector(selectPaycheckEntities);
  // const paycheckStatus = useSelector(selectPaycheckStatus);
  // const dropContainers = useSelector(
  //   (state) => state.itemsAndPlanne.totalBudgetedCategory
  // );
  // const funds = useSelector(selectFundEntities);

  const calcCategoryAccordionContainerProps = (
    categoryIds,
    items,
    income,
    expenses
  ) => {
    // we don't separate this big fn into smaller functions out b/c setState isn't synchronous
    // and we synchronously build the shape of the data we're passing to each accordion
    // also... you cannot call hooks from within loops!
    let orderArr = [];

    // // 1. init setup of orderArr
    categoryIds.map((category) =>
      orderArr.push({
        id: category,
        budgetedItemsTotal: 0,
        percentOfIncome: 0,
        spent: 0,
        itemIds: [],
      })
    );

    // 2. calc total planned income
    let totalPay = 0;
    Object.values(income).map((check) => {
      totalPay += check.expectedPay;
    });
    setTotalIncome(totalPay);

    // 3. calc total budgetItems amount per category and gather array of items that belong to each category
    Object.values(items).map((item) => {
      orderArr.map((category, i) => {
        if (category.id === item.category) {
          orderArr[i].budgetedItemsTotal += item.budgetAmount;
          orderArr[i].itemIds.push(item.id);

          // 4. calc what percentage of budgetedItems in a category make up the total planned income
          orderArr[i].percentOfIncome = +(
            orderArr[i].budgetedItemsTotal / totalPay
          ).toFixed(2);
        }
      });
    });

    // 5. calc spent amount per category
    Object.values(expenses).map((expense) => {
      orderArr.map((category, i) => {
        if (category.id === expense.category) {
          orderArr[i].spent += expense.amount;
        }
      });
    });

    // 6. Sort by DESC percentOfIncome by default
    orderArr.sort((a, b) => (a.percentOfIncome > b.percentOfIncome ? -1 : 1));

    // 7. Finally, update state
    setCategoryOrder(orderArr);
  };

  useEffect(() => {
    if (
      auth.user &&
      Object.keys(categoryEntities).length === 0
      // Object.keys(items).length === 0 &&
      // Object.keys(expenses).length === 0 &&
      // Object.keys(income).length === 0 &&
      // paycheckStatus !== 'noPaychecksAdded' &&
      // Object.keys(funds).length === 0
    ) {
      const uid = auth.user.uid;
      store.dispatch(fetchCategories(uid));
      store.dispatch(fetchExpenses({ uid, currentDate }));
      store.dispatch(fetchPaychecks(uid));
      store.dispatch(fetchItems(uid));
      store.dispatch(fetchFunds(uid));
    }
  });

  useEffect(() => {
    calcCategoryAccordionContainerProps(categoryIds, items, income, expenses);
  }, [categoryIds, items, income, expenses]);

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

    // const start = dropContainers[source.droppableId];
    const start = source.droppableId;
    // const startId = start.id;
    // const end = dropContainers[destination.droppableId]; // undefined, bc apart of old closure
    const end = destination.droppableId;
    const endId = end.id;

    if (start === end) return;

    // Moving from one droppable list to another
    const startItemsIds = Array.from(start.itemIds);
    startItemsIds.splice(source.index, 1); // remove the dragged itemId from the new array
    // store.dispatch(
    //   updateCategoryStart({ startId, startItemsIds, draggableId })
    // );

    const endItemsIds = Array.from(end.itemIds);
    endItemsIds.splice(destination.index, 0, draggableId); // insert the dragged item into the new array
    // store.dispatch(updateCategoryEnd({ endId, endItemsIds, draggableId }));
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
            <CategoryAccordionContainer
              categoryOrder={categoryOrder}
              totalIncome={totalIncome}
            />
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
