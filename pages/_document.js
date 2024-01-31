import { Html, Head, Main, NextScript } from 'next/document';

function MyDocument() {
	return (
		<Html>
			<Head />
			<body>
				<div id='portal' />
				<div id='toast-portal' />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default MyDocument;
