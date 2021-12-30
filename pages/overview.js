import { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRequireAuth } from '../hooks/useRequireAuth';
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
  // console.log(auth.user);

  if (!auth.user) {
    return <p>Loading!</p>;
  }

  const onDragEnd = (result) => {};

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={onkeydown}>
            {categoryForm && <CategoryForm onOverlayClick={onkeydown} />}
            {itemForm && <ItemForm onOverlayClick={onkeydown} />}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <MainGrid>
          <Header title='Overview' hasDatePicker={true} />
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
          hasMonthlyBreakdown={true}
          hasUpcomingBills={true}
        />
      </PageBackground>
    </>
  );
};

export default Overview;
