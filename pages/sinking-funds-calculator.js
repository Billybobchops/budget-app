import { useState } from 'react';
import DarkOverlay from '../components/UI/DarkOverlay';
import Portal from '../components/UI/Portal';
import PageBackground from '../components/Layout/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import SinkingFundsContainer from '../components/Layout/Containers/SinkingFundsContainer';
import { useRequireAuth } from '../hooks/useRequireAuth';
import FundForm from '../components/Forms/FundForm'

const SinkingFunds = () => {
  const [modal, setModal] = useState(false);
  const [fundForm, setFundForm] = useState(false);

  const auth = useRequireAuth();

  if (!auth.user) {
    return <p>Loading!</p>;
  }

  const keyDownHandler = () => {
    setModal(false);
    setFundForm(false);
  };

  const fundClickHandler = () => {
    setModal(true);
    setFundForm(true);
  };

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={keyDownHandler}>
            {fundForm && <FundForm onOverlayClick={keyDownHandler} />}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <MainGrid>
          <Header title='Sinking Funds Calculator' hasDatePicker={false} />
          <SinkingFundsContainer fundHandler={fundClickHandler}/>
        </MainGrid>
        <Sidebar hasProfileBar={true} hasBudgetMessage={true} />
      </PageBackground>
    </>
  );
};

export default SinkingFunds;
