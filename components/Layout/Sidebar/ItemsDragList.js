import classes from './ItemsDragList.module.css';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { selectItemEntities, selectItemIds } from '../../../store/items-slice';
import DragItem from '../../UI/DragItem';

const ItemsDragList = () => {
  const itemEntities = useSelector(selectItemEntities);

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
                  {Object.values(itemEntities).length !== undefined &&
                    Object.values(itemEntities).map((item, index) => {
                      if (
                        item.paycheckSelect === null ||
                        item.paycheckSelect === 'ItemsDragList'
                      ) {
                        return (
                          <DragItem
                            key={item.id}
                            index={index}
                            title={item.id}
                            date={item.billDate}
                            budgetedAmount={item.budgetAmount}
                          />
                        );
                      }
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
