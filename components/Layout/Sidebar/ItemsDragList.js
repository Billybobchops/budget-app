import classes from './ItemsDragList.module.css';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import DragItem from '../../UI/DragItem';

const ItemsDragList = () => {
  const itemIds = useSelector(
    (state) =>
      state.itemsAndPlanner.totalBudgetedPlanner['ItemsDragList']?.itemIds
  );
  const itemEntities = useSelector(
    (state) => state.itemsAndPlanner.items.entities
  );

  return (
    <Droppable droppableId='ItemsDragList' key='ItemsDragList'>
      {(provided, snapshot) => {
        const dragClass = snapshot.isDraggingOver
          ? classes.backgroundDrag
          : classes.background;

        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className={classes.container}>
              <div>
                <h2 className={classes.title}>
                  Drag Budget Items to a Paycheck
                </h2>
              </div>
              <div className={dragClass}>
                <ul className={classes.list}>
                  {itemIds !== undefined &&
                    itemIds.map((item, index) => {
                      return (
                        <DragItem
                          key={itemEntities[item].id}
                          index={index}
                          title={itemEntities[item].id}
                          date={itemEntities[item].billDate}
                          budgetedAmount={itemEntities[item].budgetAmount}
                        />
                      );
                    })}
                  {provided.placeholder}
                </ul>
              </div>
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default ItemsDragList;
