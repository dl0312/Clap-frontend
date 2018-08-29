import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import styled from "styled-components";
import PostAdd from "../../Routes/PostAdd";
import Board from "../../Routes/Board";
import Home from "../../Routes/Home";
import Navigation from "../Navigation/Navigation";
// import { ApolloProvider } from 'react-apollo';

interface IProps {
  isLoggedIn: boolean;
}

const AppBox = styled.div`
  width: 100%;
`;

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <Router>
    <AppBox>
      <Navigation isLoggedIn={isLoggedIn} />
      <Switch>
        <Route path={"/post/add"} exact={true} component={PostAdd} />
        <Route path={"/board"} exact={true} component={Board} />
        <Route path={""} exact={true} component={Home} />
        <Redirect from={"*"} to={"/"} />
      </Switch>
    </AppBox>
  </Router>
);

export default AppPresenter;
