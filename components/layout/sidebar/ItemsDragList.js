import classes from './ItemsDragList.module.css';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { selectItemEntities } from '../../../store/items-slice';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../../hooks/useAuth';
import DragItem from '../../UI/items/DragItem';

const ItemsDragList = ({ dragData }) => {
  const itemEntities = useSelector(selectItemEntities);
  const { user: isLoggedIn } = useAuth();

  let dragListIds = [];

  dragData.map((check) => {
    if (check.id === 'ItemsDragList') {
      check.itemIds.map((item) => {
        dragListIds.push({
          id: item.id,
          billDate: item.billDate,
          budgetAmount: item.budgetAmount,
        });
      });
    }
  });

  return (
    <Droppable droppableId='ItemsDragList' key='ItemsDragList'>
      {(provided, snapshot) => {
        const dragClass = snapshot.isDraggingOver
          ? classes.backgroundDrag
          : classes.background;

        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {Object.values(itemEntities).length !== 0 && isLoggedIn ? (
              <div className={classes.container}>
                <div>
                  <h2 className={classes.title}>
                    Drag Budget Items to a Paycheck
                  </h2>
                </div>
                <div className={dragClass}>
                  <ul className={classes.list}>
                    {Object.values(itemEntities).length !== undefined &&
                      dragListIds.map((item, index) => {
                        return (
                          <DragItem
                            key={item.id}
                            index={index}
                            title={item.id}
                            date={item.billDate}
                            budgetedAmount={item.budgetAmount}
                          />
                        );
                      })}
                    {provided.placeholder}
                  </ul>
                </div>
              </div>
            ) : (
              <Skeleton borderRadius={0} height={100} />
            )}
          </div>
        );
      }}
    </Droppable>
  );
};

export default ItemsDragList;
