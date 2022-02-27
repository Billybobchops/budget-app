import classes from './ItemsDragList.module.css';
import { useSelector } from 'react-redux';
import DragItem from '../../UI/DragItem';
import { Droppable } from 'react-beautiful-dnd';

const ItemsDragList = () => {
  const itemIds = useSelector(
    (state) => state.items.totalBudgetedPlanner['ItemsDragList']?.itemIds
  );
  const itemEntities = useSelector((state) => state.items.entities);

  return (
    <Droppable droppableId='ItemsDragList' key='ItemsDragList'>
      {(provided, snapshot) => {
        return (
          <div
            className={`${snapshot.isDraggingOver && classes.backgroundDrag}`}
          >
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className={classes.container}>
                <div>
                  <h2 className={classes.title}>
                    Drag Budget Items to a Paycheck
                  </h2>
                </div>
                <div className={classes.background}>
                  {itemIds !== undefined && (
                    <ul className={classes.list}>
                      {itemIds.map((item, index) => {
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
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default ItemsDragList;
