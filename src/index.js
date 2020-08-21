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
        Query: {
            fields: {
                me: {
                    merge(existing, incoming, { mergeObjects }) {
                        return mergeObjects(existing, incoming)
                    }
                },
                search: {
                    merge(ex= {}, inc) {
                        return inc
                    }
                },
                recommended: {
                    merge(ex= [], inc) {
                        return inc
                    }
                },
                tour: {
                    merge(ex= {}, inc, {mergeObjects}) {
                        // console.log(ex, 'ex')
                        // console.log(inc, 'inc')
                        // return {...ex, ...inc}
                        return mergeObjects(ex, inc)
                    },
                    // read(a, b) {
                    //     console.log(b.args.id, a)
                    //     return b.toReference({
                    //         __typename: 'Tour',
                    //         id: '5f3239cfb642804b753024d1'
                    //     })
                    // }
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
                },
                reviews: {
                    merge(existing= { data: [] }, incoming, { mergeObjects }) {
                        return {
                            ...incoming,
                            data: [
                                ...existing.data,
                                ...incoming.data
                            ]
                        }
                    },
                },
                // starts: {
                //     merge(ex= [], inc) {
                //         return [...ex, ...inc]
                //     },
                //     read(a, b) {
                //         console.log(b)
                //         return b.toReference({
                //             __typename: 'Tour',
                //             id: '5f3239cfb642804b753024d1'
                //         })
                //     }
                // }
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
        photo: localStorage.getItem('photo') || 'assets/icons/default.svg',
        name: localStorage.getItem('name') || 'Entours',
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
