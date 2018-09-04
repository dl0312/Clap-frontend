import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import styled from "styled-components";
import Board from "../../Routes/Board";
import Home from "../../Routes/Home";
import Navigation from "../Navigation/Navigation";
import Wiki from "../../Routes/Wiki";
import WikiImageDetail from "../../Routes/WikiImageDetail";
import WikiImageAdd from "../../Routes/WikiImageAdd";
import WikiImageEdit from "../../Routes/WikiImageEdit";
import PostDetail from "../../Routes/PostDetail";
import PostAdd from "../../Routes/PostAdd";
import PostEdit from "../../Routes/PostEdit";
import CategoryDetail from "../../Routes/CategoryDetail";
import CategoryAdd from "../../Routes/CategoryAdd";
import CategoryEdit from "../../Routes/CategoryEdit";
import LogIn from "../../Routes/LogIn";
import SignUp from "../../Routes/SignUp";

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
        <Route path="/login" exact={true} component={LogIn} />
        <Route path="/signup" exact={true} component={SignUp} />
        <Route
          path="/category/read/:categoryId"
          exact={true}
          component={CategoryDetail}
        />
        <Route path="/category/add" exact={true} component={CategoryAdd} />
        <Route
          path="/category/edit/:categoryId"
          exact={true}
          component={CategoryEdit}
        />
        <Route path="/post/read/:postId" exact={true} component={PostDetail} />
        <Route path="/post/add" exact={true} component={PostAdd} />
        <Route path="/post/edit/:postId" exact={true} component={PostEdit} />
        <Route
          path="/category/:categoryId/wikiImage/read/:wikiImageId"
          exact={true}
          component={WikiImageDetail}
        />
        <Route
          path="/category/:categoryId/wikiImage/add"
          exact={true}
          component={WikiImageAdd}
        />
        <Route
          path="/category/:categoryId/wikiImage/edit/:wikiImageId"
          exact={true}
          component={WikiImageEdit}
        />
        <Route path={"/wiki"} exact={true} component={Wiki} />
        <Route path={"/board"} exact={true} component={Board} />
        <Route path={""} exact={true} component={Home} />
        <Redirect from={"*"} to={"/"} />
      </Switch>
    </AppBox>
  </Router>
);

export default AppPresenter;
