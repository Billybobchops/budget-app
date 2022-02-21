import classes from './ItemsDragList.module.css';
import { useSelector } from 'react-redux';
import DragItem from '../../UI/DragItem';
import { Droppable } from 'react-beautiful-dnd';

const ItemsDragList = () => {
  const items = useSelector((state) => state.items.entities);

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
                  {Object.values(items).length !== 0 && (
                    <ul className={classes.list}>
                      {Object.values(items).map((item, index) => {
                        if (item.paycheckSelect === null)
                          return (
                            <DragItem
                              key={item.id}
                              title={item.id}
                              date={item.billDate}
                              budgetedAmount={item.budgetAmount}
                              index={index}
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
