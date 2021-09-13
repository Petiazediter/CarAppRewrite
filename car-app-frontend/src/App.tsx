import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/shared/footer/Footer';
import { DatabaseProvider } from './context/DatabaseContext';
import ThemeContextProviderComponent from './context/ThemeContext';
import UserContextProvider from './context/UserContext';
import 'antd/dist/antd.css';
import './index.css';
import RouterComponent from './RouterComponent';
import { FunctionComponent } from 'react';

import { WebSocketLink } from '@apollo/client/link/ws';
import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
	split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import useLocalStorage from './customHooks/useLocalStorage';
import { AUTH_TOKEN } from '.';

const App: FunctionComponent = () => {
	const [token] = useLocalStorage(AUTH_TOKEN, '');

	const wsLink = new WebSocketLink({
		uri: 'ws://localhost:4000/graphql',
		options: {
			reconnect: true,
		},
	});

	const httpLink = new HttpLink({
		uri: 'http://localhost:4000/graphql',
	});

	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: `Bearer ${token}`,
			},
		};
	});

	const link = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === 'OperationDefinition' &&
				definition.operation === 'subscription'
			);
		},
		wsLink,
		authLink.concat(httpLink)
	);

	const client = new ApolloClient({
		link: link,
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<UserContextProvider>
				<ThemeContextProviderComponent>
					<DatabaseProvider>
						<BrowserRouter>
							<RouterComponent />
							<Footer />
						</BrowserRouter>
					</DatabaseProvider>
				</ThemeContextProviderComponent>
			</UserContextProvider>
		</ApolloProvider>
	);
};

export default App;
