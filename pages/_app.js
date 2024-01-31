import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/index';
import { ProvideAuth } from '../hooks/useAuth';
import { FormContextProvider } from '../store/form-context';
import ToastProvider from '../store/ToastProvider';
import { Mukta } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core';

fontawesomeConfig.autoAddCss = false;

const mukta = Mukta({
	subsets: ['latin'],
	weight: ['200', '300', '400', '600', '700'],
});

function MyApp({ Component, pageProps }) {
	return (
		<ToastProvider>
			<ProvideAuth>
				<FormContextProvider>
					<Provider store={store}>
						<div className={mukta.className}>
							<Component {...pageProps} />
						</div>
					</Provider>
				</FormContextProvider>
			</ProvideAuth>
		</ToastProvider>
	);
}

export default MyApp;
