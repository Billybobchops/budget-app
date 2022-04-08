import BudgetMessage from './BudgetMessage';
import MonthlyBreakdown from './MonthlyBreakdown';
import ProfileBar from './ProfileBar';
import classes from './Sidebar.module.css';
import UpcomingBills from './UpcomingBills';
import ItemsDragList from './ItemsDragList';
import ButtonBar from '../Bars/ButtonBar';
import Button from '../../UI/Buttons/Button';

const Sidebar = ({
  hasProfileBar,
  hasMonthlyBreakdown,
  hasBudgetMessage,
  hasUpcomingBills,
  hasItemsDragList,
  hasButtonBar,
  buttons,
}) => {
  const sidebarContents = (
    <>
      {hasProfileBar && <ProfileBar />}
      {hasMonthlyBreakdown && <MonthlyBreakdown />}
      {hasBudgetMessage && <BudgetMessage />}
      {hasUpcomingBills && <UpcomingBills />}
      {hasButtonBar && (
        <ButtonBar>
          {buttons.map((btn) => {
            return (
              <Button
                key={btn.text}
                text={btn.text}
                clickHandler={btn.clickHandler}
              />
            );
          })}
        </ButtonBar>
      )}
      {hasItemsDragList && <ItemsDragList />}
    </>
  );

  return <aside className={classes.sidebar}>{sidebarContents}</aside>;
};

export default Sidebar;
