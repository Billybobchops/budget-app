import { useState, useCallback, useContext, createContext } from 'react';
import ToastContainer from '../components/UI/ToastContainer';

const ToastContext = createContext(null);

let id = 1;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (content) => {
      setToasts((toasts) => [...toasts, { id: id++, content }]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const toastHelpers = useContext(ToastContext);
  return toastHelpers;
}

export default ToastProvider;
