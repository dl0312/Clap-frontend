import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import client from "./apollo";
import App from "./Components/App";
import "./global-styles";

const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <ApolloProvider client={client}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
