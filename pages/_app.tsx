import "rsuite/dist/styles/rsuite-default.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../util/apolloClient";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<link rel="manifest" href="/manifest.json" />
				<link href="/icons/16.png" rel="icon" type="image/png" sizes="16x16" />
				<link href="/icons/32.png" rel="icon" type="image/png" sizes="32x32" />
				<link rel="apple-touch-icon" href="/128.png"></link>
				<meta name="theme-color" content="#8bd7f8" />
			</Head>
			<ApolloProvider client={apolloClient}>
				<Component {...pageProps} />
			</ApolloProvider>
		</>
	);
}

export default MyApp;
