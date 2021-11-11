import BudgetMessage from "./BudgetMessage";
import MonthlyBreakdown from "./MonthlyBreakdown";
import ProfileBar from "./ProfileBar";
import classes from "./SideBar.module.css";
import UpcomingBills from "./UpcomingBills";

const Sidebar = (props) => {
  const sidebarContents = (
    <>
      {props.hasProfileBar && <ProfileBar />}
      {props.hasBudgetMessage && <BudgetMessage />}
      {props.hasMonthlyBreakdown && <MonthlyBreakdown />}
      {props.hasUpcomingBills && <UpcomingBills />}
    </>
  );

  return <aside className={classes.sidebar}>{sidebarContents}</aside>;
};

export default Sidebar;
