import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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

export const AUTH_TOKEN = 'auth-token';

const wsLink = new WebSocketLink({
	uri: 'localhost:4000/graphql',
	options: {
		reconnect: true,
	},
});

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN);
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer {token}` : '',
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

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
