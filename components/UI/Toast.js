import classes from './Toast.module.css';
import { useEffect } from 'react';
import { useToast } from '../../store/ToastProvider';

const Toast = ({ children, id }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000); // delay

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return <div className={classes.wrapper}>{children}</div>;
};

export default Toast;
