import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, HttpLink, split, gql } from '@apollo/client';
// import { createUploadLink } from "apollo-upload-client";
// import { persistCache } from 'apollo-cache-persist';
import { WebSocketLink } from '@apollo/client/link/ws';
import { InMemoryCache } from '@apollo/client/cache';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { typeDefs, resolvers } from "./resolvers";
import store from './app/store';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { getCookie } from "./utils/cookies";
import './index.css';
import * as serviceWorker from './serviceWorker';


const httpLink = new HttpLink({
    uri: process.env.REACT_APP_SERVER_API,
    credentials: 'include'
});

// const httpLink = createUploadLink({
//     uri: process.env.REACT_APP_SERVER_API,
// })


const authLink = setContext((_, a ) => {
    // const token = getCookie('authToken');
    const { headers } = a;
    return {
        headers: {
            ...headers,
            // authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_SERVER_API_WS,
    options: {
        reconnect: true,
        connectionParams: {
            // authorization: getCookie('authToken') && `Bearer ${getCookie('authToken')}`
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

const cache = new InMemoryCache({
    typePolicies: {
        // Me: {
        //   fields: {
        //       orders: {
        //           merge(existing = [], incoming) {
        //               console.log(existing)
        //               console.log(incoming)
        //               return [...existing, ...incoming]
        //           }
        //       }
        //   }
        // },
        Query: {
            fields: {
                me: {
                    merge(existing, incoming, { mergeObjects }) {
                        return mergeObjects(existing, incoming)
                    }
                }
            }
        },
        Conversation: {
            fields: {
                start: {
                    merge(existing, incoming) {
                        return {...existing, ...incoming}
                    },
                }
            }
        },
        Tour: {
            fields: {
                startLocation: {
                    merge(existing, incoming) {
                        return {...existing, ...incoming}
                    },
                    // starts: {
                    //     merge(existing= [], incoming) {
                    //         console.log({existing, incoming})
                    //         return {...existing, ...incoming}
                    //     },
                    // }
                }
            }
        }
    },
});

// persistCache({
//     cache,
//     storage: window.localStorage,
// });

const client = new ApolloClient({
    typeDefs,
    resolvers,
    cache,
    link,
});

cache.writeQuery({
    query: gql`
		query {
			loggedIn
            photo
            name
            userId
		}
    `,
    data: {
        loggedIn: !!getCookie('userId'),
        photo: localStorage.getItem('photo') || 'default.jpg',
        name: localStorage.getItem('name') || 'Entours App',
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
