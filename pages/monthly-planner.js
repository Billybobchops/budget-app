import { useContext, useEffect, useState } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import store from '../store';
import {
  fetchItems,
  updateItemPaycheckSelectDoc,
  updateItemPaycheckSortIndexDoc,
} from '../store/items-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchPaychecks } from '../store/planner-slice';
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
import { selectItemEntities } from '../store/items-slice';
import { selectPaycheckEntities } from '../store/planner-slice';

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

  const [plannerOrder, setPlannerOrder] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const auth = useRequireAuth();
  const currentDate = useSelector(selectFormattedMonthYear);
  const categories = useSelector(selectCategoryEntities);
  const income = useSelector(selectPaycheckEntities);
  const items = useSelector(selectItemEntities);

  const buttonsArr = [{ text: 'Budget Item', clickHandler: onItemClick }];

  const initPlannerAccordionContainerProps = (income, items) => {
    let orderArr = [];

    Object.values(income).map((check) => {
      orderArr.push({
        id: check.id,
        nickname: check.nickname,
        expectedPay: check.expectedPay,
        totalPlannedBudget: 0,
        itemIds: [],
      });
    });

    orderArr.push({
      id: 'ItemsDragList',
      itemIds: [],
    });

    let totalPay = 0;
    Object.values(income).map((check) => {
      totalPay += check.expectedPay;
    });
    setTotalIncome(totalPay);

    Object.values(items).map((item) => {
      orderArr.map((check, i) => {
        if (item.paycheckSelect === check.id) {
          orderArr[i].itemIds.push({
            id: item.id,
            budgetAmount: item.budgetAmount,
            billDate: item.billDate,
          });
        }

        if (
          item.paycheckSelect === check.id &&
          item.paycheckSelect !== 'ItemsDragList'
        ) {
          orderArr[i].totalPlannedBudget += item.budgetAmount;
        }

        if (item.paycheckSelect === null && check.id === 'ItemsDragList') {
          orderArr[i].itemIds.push({
            id: item.id,
            budgetAmount: item.budgetAmount,
            billDate: item.billDate,
          });
        }

        orderArr[i].itemIds.sort((a, b) =>
          a.budgetAmount > b.budgetAmount ? -1 : 1
        );
      });
    });

    // sort by user defined sort order stored in FB?
    // orderArr.sort((a, b) => (a.userOrderIndex > b.userOrderIndex ? -1 : 1));
    console.log('init plannerOrder', orderArr);
    setPlannerOrder(orderArr);
  };

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

  useEffect(() => {
    initPlannerAccordionContainerProps(income, items);
  }, [income, items]);

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

    const start = source.droppableId;
    const end = destination.droppableId;
    // if (start === end) return;
    if (start === end) {
      console.log('start', start);
      return;
    }

    // Moving from one droppable to another:
    let plannerOrderClone = [...plannerOrder];
    let dragObj;

    plannerOrder.map((check, i) => {
      if (check.id !== start) return;

      if (check.id === start) {
        const startItemIds = [...check.itemIds];

        dragObj = {
          ...plannerOrderClone[i].itemIds[source.index],
        };

        startItemIds.splice(source.index, 1);
        plannerOrderClone[i].itemIds = [...startItemIds];
      }
    });

    plannerOrder.map((check, i) => {
      if (check.id !== end) return;

      if (check.id === end) {
        const endItemIds = [...check.itemIds];

        endItemIds.splice(destination.index, 0, dragObj);
        plannerOrderClone[i].itemIds = [...endItemIds];
      }
    });

    plannerOrderClone.map((check) => {
      check.totalPlannedBudget = 0;

      check.itemIds.map((item) => {
        check.totalPlannedBudget += item.budgetAmount;
      });
    });
    console.log('plannerOrderClone in onDragEnd', plannerOrderClone);
    setPlannerOrder(plannerOrderClone);

    const document = draggableId;
    const uid = auth.user.uid;
    const newLocation = destination.droppableId;
    // store.dispatch(updateItemPaycheckSelectDoc({ uid, document, newLocation })); // persisting
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
          <PlannerContainer
            plannerHandler={onPlannerClick}
            plannerOrder={plannerOrder}
            totalIncome={totalIncome}
          />
          <ProfileBar />
          <Sidebar
            hasItemsDragList={true}
            dragData={plannerOrder}
            hasButtonBar={true}
            buttons={buttonsArr}
          />
        </PlannerBackground>
      </DragDropContext>
    </>
  );
};

export default PlannerPage;
