import { useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useSelector } from 'react-redux';
import store from '../store';
import { updateCategoryItemDoc } from '../store/items-slice';
import { fetchItems } from '../store/items-slice';
import { fetchPaychecks } from '../store/planner-slice';
import { fetchPaycheckOrder } from '../store/paycheckOrder-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchFunds } from '../store/fund-slice';
import FormContext from '../store/form-context';
import PageBackground from '../components/Layout/Containers/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/header/Header';
import ButtonBar from '../components/Layout/Bars/ButtonBar';
import Button from '../components/UI/buttons/Button';
import TotalsBar from '../components/Layout/bars/TotalsBar';
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
import { selectItemEntities } from '../store/items-slice';
import { selectPaycheckEntities } from '../store/planner-slice';
import { selectPaycheckOrder } from '../store/paycheckOrder-slice';
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
  const itemEntities = useSelector(selectItemEntities);
  const income = useSelector(selectPaycheckEntities);
  const paycheckOrder = useSelector(selectPaycheckOrder);
  // const funds = useSelector(selectFundEntities);

  const initCategoryAccordionContainerProps = (
    categoryIds,
    itemEntities,
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
    Object.values(itemEntities).map((item) => {
      orderArr.map((category, i) => {
        if (category.id === item.category) {
          orderArr[i].budgetedItemsTotal += item.budgetAmount;

          orderArr[i].itemIds.push({
            id: item.id,
            budgetAmount: item.budgetAmount,
            billDate: item.billDate,
          });

          // 4. Sort itemIds by DESC budget amount
          orderArr[i].itemIds.sort((a, b) =>
            a.budgetAmount > b.budgetAmount ? -1 : 1
          );

          // 5. calc what percentage of budgetedItems in a category make up the total planned income
          orderArr[i].percentOfIncome = +(
            orderArr[i].budgetedItemsTotal / totalPay
          ).toFixed(2);
        }
      });
    });

    // 6. calc spent amount per category
    Object.values(expenses).map((expense) => {
      orderArr.map((category, i) => {
        if (category.id === expense.category) {
          orderArr[i].spent += expense.amount;
        }
      });
    });

    // 7. Sort categories by DESC percentOfIncome by default
    orderArr.sort((a, b) => (a.percentOfIncome > b.percentOfIncome ? -1 : 1));

    // 8. Finally, update state
    setCategoryOrder(orderArr);
  };

  const reCalcProps = (categoryOrder, expenses) => {
    let orderArr = [...categoryOrder];

    orderArr.map((category) => {
      category.budgetedItemsTotal = 0;

      category.itemIds.map((item) => {
        category.budgetedItemsTotal += item.budgetAmount;
      });

      category.itemIds.sort((a, b) =>
        a.budgetAmount > b.budgetAmount ? -1 : 1
      );

      category.percentOfIncome = +(
        category.budgetedItemsTotal / totalIncome
      ).toFixed(2);
    });

    Object.values(expenses).map((expense) => {
      orderArr.map((category) => {
        category.spent = 0;

        if (category.id === expense.category) {
          category.spent += expense.amount;
        }
      });
    });

    orderArr.sort((a, b) => (a.percentOfIncome > b.percentOfIncome ? -1 : 1));

    setCategoryOrder(orderArr);
  };

  const reverseCategoryOrder = () => {
    const orderClone = [...categoryOrder];
    const reverseOrder = orderClone.reverse();
    setCategoryOrder(reverseOrder);
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
      store.dispatch(fetchPaycheckOrder(uid));
      store.dispatch(fetchItems(uid));
      store.dispatch(fetchFunds(uid));
    }
    console.log('auth useEffect running');
  });

  useEffect(() => {
    initCategoryAccordionContainerProps(
      categoryIds,
      itemEntities,
      income,
      expenses
    );
  }, [categoryIds, itemEntities, income, expenses]);

  const onDragEnd = (result) => {
    const { draggableId, destination, source } = result;

    // if user drops draggable outside of any droppable
    if (!destination) return;
    // The user dropped the item back in the same position
    if (
      destination.droppableId == source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = source.droppableId;
    const end = destination.droppableId;
    if (start === end) return;

    // Moving from one droppable to another: category update occuring
    let categoryOrderClone = [...categoryOrder];
    let dragObj;

    categoryOrder.map((category, i) => {
      if (category.id !== start) return;

      if (category.id === start) {
        const startItemIds = [...category.itemIds];

        dragObj = {
          ...categoryOrderClone[i].itemIds[source.index],
        };

        startItemIds.splice(source.index, 1);
        categoryOrderClone[i].itemIds = [...startItemIds];
      }
    });

    categoryOrder.map((category, i) => {
      if (category.id !== end) return;

      if (category.id === end) {
        const endItemIds = [...category.itemIds];

        endItemIds.splice(destination.index, 0, dragObj);
        categoryOrderClone[i].itemIds = [...endItemIds];
      }
    });

    // updates the itemIds array within the objects within the categoryOrder array in local state to reflect the dragged item event
    setCategoryOrder(categoryOrderClone);

    // updates the other keys inside the objects inside the categoryOrder array in local state
    reCalcProps(categoryOrder, expenses);
    console.log('categoryOrder after onDragEnd()', categoryOrder);

    const uid = auth.user.uid;
    const document = draggableId;
    const newCategory = destination.droppableId;
    store.dispatch(updateCategoryItemDoc({ uid, document, newCategory }));
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
              reverseOrderFn={reverseCategoryOrder}
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
