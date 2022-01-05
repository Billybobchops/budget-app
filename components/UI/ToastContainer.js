import classes from './ToastContainer.module.css';
import Portal from '../UI/Portal';
import Toast from './Toast';

const ToastContainer = ({ toasts }) => {
  return (
    <Portal selector='#toast-portal'>
      <div className={classes.wrapper}>
        {toasts.map((item) => (
          <Toast key={item.id} id={item.id}>
            {item.content}
          </Toast>
        ))}
      </div>
    </Portal>
  );
};

export default ToastContainer;
