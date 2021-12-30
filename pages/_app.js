import '../styles/globals.css';
// import { Provider } from "react-redux";
// import store from "../store/index";
import { ProvideAuth } from '../hooks/useAuth';
import { FormContextProvider } from '../store/form-context';

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <FormContextProvider>
        {/* <Provider store={store}> */}
        <Component {...pageProps} />
        {/* </Provider> */}
      </FormContextProvider>
    </ProvideAuth>
  );
}

export default MyApp;
