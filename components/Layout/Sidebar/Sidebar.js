import BudgetMessage from "./BudgetMessage";
import MonthlyBreakdown from "./MonthlyBreakdown";
import ProfileBar from "./ProfileBar";
import classes from "./SideBar.module.css";
import UpcomingBills from "./UpcomingBills";
import ItemsDragList from "./ItemsDragList";

const Sidebar = (props) => {
  const sidebarContents = (
    <>
      {props.hasProfileBar && <ProfileBar />}
      {props.hasMonthlyBreakdown && <MonthlyBreakdown />}
      {props.hasBudgetMessage && <BudgetMessage />}
      {props.hasUpcomingBills && <UpcomingBills />}
      {props.hasItemsDragList && <ItemsDragList />}
    </>
  );

  return <aside className={classes.sidebar}>{sidebarContents}</aside>;
};

export default Sidebar;
