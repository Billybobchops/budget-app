import "../styles/globals.css";
// import { Provider } from "react-redux";
// import store from "../store/index";
import { ProvideAuth } from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      {/* <Provider store={store}> */}
      <Component {...pageProps} />
      {/* </Provider> */}
    </ProvideAuth>
  );
}

export default MyApp;
