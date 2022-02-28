import { useContext, useEffect } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useSelector } from 'react-redux';
import store from '../store';
import { fetchItems, fetchPaychecks } from '../store/itemsAndPlanner-slice';
import { fetchCategories } from '../store/category-slice';
import { fetchExpenses } from '../store/expenses-slice';
import { fetchFunds } from '../store/fund-slice';
import FormContext from '../store/form-context';
import DarkOverlay from '../components/UI/DarkOverlay';
import Portal from '../components/UI/Portal';
import PageBackground from '../components/Layout/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import SinkingFundsContainer from '../components/Layout/Containers/SinkingFundsContainer';
import FundForm from '../components/Forms/FundForm';

const SinkingFunds = () => {
  const { modal, fundForm, onkeydown, onFundClick } = useContext(FormContext);

  const auth = useRequireAuth();
  const currentDate = useSelector((state) => state.date.formattedMonthYear);
  const categories = useSelector((state) => state.categories.entities);
  const expenses = useSelector((state) => state.expenses.entities);
  const paychecks = useSelector((state) => state.itemsAndPlanner.planner.entities);
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
      store.dispatch(fetchExpenses({ uid, currentDate }));
      store.dispatch(fetchPaychecks(uid));
      store.dispatch(fetchItems(uid));
      store.dispatch(fetchFunds(uid));
    }
  }, [auth.user, currentDate, categories, expenses, paychecks, funds]);

  if (!auth.user) {
    return <p>Loading!</p>;
  }

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={onkeydown}>
            {fundForm && <FundForm />}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <MainGrid>
          <Header title='Sinking Funds Calculator' />
          <SinkingFundsContainer fundHandler={onFundClick} />
        </MainGrid>
        <Sidebar hasProfileBar={true} hasBudgetMessage={true} />
      </PageBackground>
    </>
  );
};

export default SinkingFunds;
