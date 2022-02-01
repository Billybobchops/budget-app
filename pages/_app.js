import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/index';
import { fetchItems } from '../store/item-slice';
import { ProvideAuth } from '../hooks/useAuth';
import { FormContextProvider } from '../store/form-context';
import ToastProvider from '../store/ToastProvider';

// dispatch fetchItems() before root component renders...
// store.dispatch(fetchItems());

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <ProvideAuth>
        <FormContextProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </FormContextProvider>
      </ProvideAuth>
    </ToastProvider>
  );
}

export default MyApp;
