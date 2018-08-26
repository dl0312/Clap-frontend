import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
// import { onError } from "apollo-link-error";
import { HttpLink } from 'apollo-link-http';
// import { withClientState } from "apollo-link-state";
import { createUploadLink } from 'apollo-upload-client';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';
// import { toast } from 'react-toastify';

const isFile = (value: any) =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob);

const isUpload = ({ variables }: any) => Object.values(variables).some(isFile);

// const isSubscriptionOperation = ({ query }) => {
//   const { kind, operation } = getMainDefinition(query);
//   return kind === "OperationDefinition" && operation === "subscription";
// };

const getToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return token;
  } else {
    return null;
  }
};

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return { headers: { ...headers, 'X-JWT': token } };
});

// const authMiddleware = new ApolloLink((operation, forward) => {
//   operation.setContext({
//     headers: {
//       "X-JWT": getToken()
//     }
//   });
//   return forward(operation);
// });

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql'
});

// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:4000/subscriptions",
//   options: {
//     reconnect: true,
//     connectionParams: {
//       "X-JWT": getToken()
//     }
//   }
// });

// const requestLink = split(isSubscriptionOperation, httpLink);

const terminalLink = split(isUpload, uploadLink, httpLink);

// const combinedLinks = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === "OperationDefinition" && operation === "subscription";
//   },
//   // wsLink,
//   httpLink
// );

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message, locations, path }) => {
//       toast.error(`Unexpected error: ${message}`);
//     });
//   }
//   if (networkError) {
//     toast.error(`Network error: ${networkError}`);
//   }
// });

// const localStateLink = withClientState({
//   defaults: {
//     auth: {
//       __typename: "Auth",
//       isLoggedIn: Boolean(localStorage.getItem("jwt")) || false
//     }
//   },
//   resolvers: {
//     Mutation: {
//       logUserOut: (_, __, { cache: localCache }) => {
//         localStorage.removeItem("jwt");
//         localCache.writeData({
//           data: {
//             auth: {
//               __typename: "Auth",
//               isLoggedIn: false
//             }
//           }
//         });
//         return null;
//       },
//       logUserIn: (_, { token }, { cache: localCache }) => {
//         localStorage.setItem("jwt", token);
//         localCache.writeData({
//           data: {
//             auth: {
//               __typename: "Auth",
//               isLoggedIn: true
//             }
//           }
//         });
//         return null;
//       }
//     }
//   },
//   cache
// });

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     errorLink,
//     localStateLink,
//     concat(authMiddleware, combinedLinks)
//   ]),
//   cache
// });

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, terminalLink])
});

export default client;
