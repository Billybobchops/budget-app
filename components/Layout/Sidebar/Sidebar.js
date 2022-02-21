import BudgetMessage from './BudgetMessage';
import MonthlyBreakdown from './MonthlyBreakdown';
import ProfileBar from './ProfileBar';
import classes from './SideBar.module.css';
import UpcomingBills from './UpcomingBills';
import ItemsDragList from './ItemsDragList';

const Sidebar = ({
  hasProfileBar,
  hasMonthlyBreakdown,
  hasBudgetMessage,
  hasUpcomingBills,
  hasItemsDragList,
}) => {
  const sidebarContents = (
    <>
      {hasProfileBar && <ProfileBar />}
      {hasMonthlyBreakdown && <MonthlyBreakdown />}
      {hasBudgetMessage && <BudgetMessage />}
      {hasUpcomingBills && <UpcomingBills />}
      {hasItemsDragList && <ItemsDragList />}
    </>
  );

  return <aside className={classes.sidebar}>{sidebarContents}</aside>;
};

export default Sidebar;
