import BudgetMessage from './BudgetMessage';
import CategoryPie from './CategoryPie';
import ProfileBar from './ProfileBar';
import classes from './Sidebar.module.css';
import UpcomingBills from './UpcomingBills';
import ItemsDragList from './ItemsDragList';
import ButtonBar from '../Bars/ButtonBar';
import Button from '../../UI/Buttons/Button';

const Sidebar = ({
  hasProfileBar,
  hasCategoryPie,
  hasBudgetMessage,
  hasUpcomingBills,
  hasButtonBar,
  buttons,
  hasItemsDragList,
  dragData,
}) => {
  const sidebarContents = (
    <>
      {hasProfileBar && <ProfileBar />}
      {hasCategoryPie && <CategoryPie />}
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
      {hasItemsDragList && <ItemsDragList dragData={dragData} />}
    </>
  );

  return <aside className={classes.sidebar}>{sidebarContents}</aside>;
};

export default Sidebar;
