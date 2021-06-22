import "rsuite/dist/styles/rsuite-default.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../util/apolloClient";

function MyApp({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
