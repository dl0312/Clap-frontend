import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split, Operation } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { createUploadLink } from "apollo-upload-client";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";
import { toast } from "react-toastify";
// import { getMainDefinition } from "apollo-utilities";
// import { WebSocketLink } from "apollo-link-ws";

const isDev = process.env.NODE_ENV === "development";
console.log(isDev);

const isFile = (value: any) =>
  (typeof File !== "undefined" && value instanceof File) ||
  (typeof Blob !== "undefined" && value instanceof Blob);

const isUpload = ({ variables }: any) => Object.values(variables).some(isFile);

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
  uri: "http://localhost:4000/graphql"
});

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql"
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

const terminalLink = split(isUpload, uploadLink, httpLink);

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
    }
  },
  resolvers: {
    Mutation: {
      logUserIn: (_: any, { token }: any, { cache: appCache }: any) => {
        localStorage.setItem("jwt", token);
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true
            }
          }
        });
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
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    authMiddleware,
    terminalLink
  ]),
  cache
});

export default client;
