import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Operation } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";
import { toast } from "react-toastify";
// import { getMainDefinition } from "apollo-utilities";
// import { WebSocketLink } from "apollo-link-ws";

const isDev = process.env.NODE_ENV === "development";

// const isSubscriptionOperation = ({ query }) => {
//   const { kind, operation } = getMainDefinition(query);
//   return kind === "OperationDefinition" && operation === "subscription";
// };

const getToken = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    return token;
  } else {
    return null;
  }
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      "X-JWT": getToken()
    }
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "https://clapserver.now.sh/graphql"
});

// const wsLink = new WebSocketLink({
//   options: {
//     connectionParams: {
//       "X-JWT": getToken()
//     },
//     reconnect: true
//   },
//   uri: isDev
//     ? "ws://localhost:4000/subscription"
//     : "ws://nuberserver.now.sh/subscription"
// });

// const requestLink = split(isSubscriptionOperation, httpLink);

// const combinedLinks = split(
//   ({ query }) => {
//     const { kind, operation }: any = getMainDefinition(query);
//     return kind === "OperationDefinition" && operation === "subscription";
//   },
//   wsLink,
//   httpLink
// );

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: "Auth",
      isLoggedIn: Boolean(localStorage.getItem("jwt"))
    },
    lang: {
      __typename: "Lang",
      language: "ko"
    }
  },
  resolvers: {
    Mutation: {
      logUserIn: (_: any, { token }: any, { cache: appCache }: any) => {
        if (token !== null) {
          localStorage.setItem("jwt", token);
          appCache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true
              }
            }
          });
        } else {
          appCache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: false
              }
            }
          });
        }
        return null;
      },
      logUserOut: (_: any, __: any, { cache: appCache }: any) => {
        localStorage.removeItem("jwt");
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false
            }
          }
        });
        return null;
      }
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, localStateLink, authMiddleware, httpLink]),
  cache
});

export default client;
