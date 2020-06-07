import React from 'react';
import ReactDOM from 'react-dom';
// import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs, resolvers } from "./resolvers";
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { getCookie } from "./utils/cookies";

const cache = new InMemoryCache();

const client = new ApolloClient({
    typeDefs,
    resolvers,
    cache,
    link: new HttpLink({
        uri: process.env.REACT_APP_SERVER_API,
        headers: {
            authorization: `Bearer ${getCookie('authToken')}`
        }
    }),
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
