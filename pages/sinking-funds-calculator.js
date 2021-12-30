import { useContext } from 'react';
import FormContext from '../store/form-context';
import DarkOverlay from '../components/UI/DarkOverlay';
import Portal from '../components/UI/Portal';
import PageBackground from '../components/Layout/PageBackground';
import MainGrid from '../components/Layout/MainGrid';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import SinkingFundsContainer from '../components/Layout/Containers/SinkingFundsContainer';
import { useRequireAuth } from '../hooks/useRequireAuth';
import FundForm from '../components/Forms/FundForm';

const SinkingFunds = () => {
  const { modal, fundForm, onkeydown, onFundClick } = useContext(FormContext);

  const auth = useRequireAuth();

  if (!auth.user) {
    return <p>Loading!</p>;
  }

  return (
    <>
      <Portal selector='#portal'>
        {modal && (
          <DarkOverlay onKeyDown={onkeydown}>
            {fundForm && <FundForm onOverlayClick={onkeydown} />}
          </DarkOverlay>
        )}
      </Portal>
      <PageBackground>
        <MainGrid>
          <Header title='Sinking Funds Calculator' hasDatePicker={false} />
          <SinkingFundsContainer fundHandler={onFundClick} />
        </MainGrid>
        <Sidebar hasProfileBar={true} hasBudgetMessage={true} />
      </PageBackground>
    </>
  );
};

export default SinkingFunds;
