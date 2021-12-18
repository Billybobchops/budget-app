import { useState } from 'react';
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
import { DragDropContext } from 'react-beautiful-dnd';
import { useRequireAuth } from '../hooks/useRequireAuth';
import CategoryForm from '../components/Forms/CategoryForm';
import ItemForm from '../components/Forms/ItemForm';

const Overview = () => {
  const [modal, setModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [itemForm, setItemForm] = useState(false);

  const auth = useRequireAuth();
  // console.log(auth.user);

  if (!auth.user) {
    return <p>Loading!</p>;
  }

  const onDragEnd = (result) => {};

  const keyDownHandler = () => {
    setModal(false);
    setCategoryForm(false);
    setItemForm(false);
  };

  const categoryClickHandler = () => {
    setModal(true);
    setCategoryForm(true);
  };

  const itemClickHandler = () => {
    setModal(true);
    setItemForm(true);
  };

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={keyDownHandler}>
            {categoryForm && <CategoryForm onOverlayClick={keyDownHandler} />}
            {itemForm && <ItemForm onOverlayClick={keyDownHandler} />}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <MainGrid>
          <Header title='Overview' hasDatePicker={true} />
          <ButtonBar>
            <Button
              text='Budget Category'
              clickHandler={categoryClickHandler}
            />
            <Button text='Budget Item' clickHandler={itemClickHandler} />
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
