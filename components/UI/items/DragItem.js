import classes from './DragItem.module.css';
import { Draggable } from 'react-beautiful-dnd';

const DragItem = ({ title, date, budgetedAmount, index }) => {
  const formattedDate = `${date === 'Today' ? 'Bills' : 'Bills on'} ${date}`;

  return (
    <Draggable key={title} draggableId={title} index={index}>
      {(provided, snapshot) => {
        const style = `${[
          classes.listContainer,
          classes[`${snapshot.isDragging && 'backgroundDrag'}`],
        ].join(' ')}`;

        return (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={style}
          >
            <div className={classes.container}>
              <div className={classes.title}>{title}</div>
              <div className={classes.date}>{formattedDate}</div>
              <div className={classes.budgeted}>{`$${budgetedAmount}`}</div>
            </div>
          </li>
        );
      }}
    </Draggable>
  );
};

export default DragItem;
