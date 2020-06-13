import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { split } from 'apollo-link';
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { typeDefs, resolvers } from "./resolvers";
import store from './app/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { getCookie } from "./utils/cookies";
import './index.css';
import * as serviceWorker from './serviceWorker';

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_SERVER_API,
});


const authLink = setContext((_, { headers }) => {
    const token = getCookie('authToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_SERVER_API_WS,
    options: {
        reconnect: true,
        connectionParams: {
            authorization: getCookie('authToken') && `Bearer ${getCookie('authToken')}`
        },
    }
});

const hasSubscriptionOperation = ({ query }) => {
    const definition = getMainDefinition(query);
    // console.log(definition.operation, definition.kind)
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    );
}

const link = split(
    hasSubscriptionOperation,
    wsLink,
    authLink.concat(httpLink),
);

const cache = new InMemoryCache();

const client = new ApolloClient({
    typeDefs,
    resolvers,
    cache,
    link,
});

cache.writeData({
    data: {
        loggedIn: !!getCookie('authToken'),
        photo: localStorage.getItem('photo'),
        name: localStorage.getItem('name'),
        userId: getCookie('userId'),
        // cartItems: []
    }
})

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
