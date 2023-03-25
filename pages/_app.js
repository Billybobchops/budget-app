import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/index';
import { ProvideAuth } from '../hooks/useAuth';
import { FormContextProvider } from '../store/form-context';
import ToastProvider from '../store/ToastProvider';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core'

fontawesomeConfig.autoAddCss = false;

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
