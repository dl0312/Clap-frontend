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
import Profile from "../../Routes/Profile";
import SearchResult from "../../Routes/SearchResult";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

// import { ApolloProvider } from 'react-apollo';

interface IProps {
  isLoggedIn: boolean;
}

const AppBox = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  margin-top: 70px;
  .fade-enter {
    opacity: 0;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 2000ms ease;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 2000ms ease;
  }
`;

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <Router>
    <Route
      render={({ location }) => (
        <AppBox>
          <Navigation isLoggedIn={isLoggedIn} />
          <MainContainer>
            {/* <TransitionGroup>
              <CSSTransition
                key={location.pathname.split("/")[1]}
                classNames={"fade"}
                timeout={{ enter: 2000, exit: 2000 }}
              >
                <Switch location={location}>
                  <Route
                    path="/search/:keyword"
                    exact={true}
                    component={SearchResult}
                  />

                  <Route path="/login" exact={true} component={LogIn} />
                  <Route path="/signup" exact={true} component={SignUp} />
                  <Route path="/profile" exact={true} component={Profile} />

                  <Route
                    path="/category/read/:categoryId"
                    exact={true}
                    component={CategoryDetail}
                  />
                  <Route
                    path="/category/add"
                    exact={true}
                    component={CategoryAdd}
                  />
                  <Route
                    path="/category/edit/:categoryId"
                    exact={true}
                    component={CategoryEdit}
                  />
                  <Route
                    path="/post/read/:postId"
                    exact={true}
                    component={PostDetail}
                  />
                  <Route path="/post/add" exact={true} component={PostAdd} />
                  <Route
                    path="/post/edit/:postId"
                    exact={true}
                    component={PostEdit}
                  />
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
              </CSSTransition>
            </TransitionGroup> */}

            <Switch>
              <Route
                path="/search/:keyword"
                exact={true}
                component={SearchResult}
              />

              <Route path="/login" exact={true} component={LogIn} />
              <Route path="/signup" exact={true} component={SignUp} />
              <Route path="/profile" exact={true} component={Profile} />

              <Route
                path="/category/read/:categoryId"
                exact={true}
                component={CategoryDetail}
              />
              <Route
                path="/category/add"
                exact={true}
                component={CategoryAdd}
              />
              <Route
                path="/category/edit/:categoryId"
                exact={true}
                component={CategoryEdit}
              />
              <Route
                path="/post/read/:postId"
                exact={true}
                component={PostDetail}
              />
              <Route path="/post/add" exact={true} component={PostAdd} />
              <Route
                path="/post/edit/:postId"
                exact={true}
                component={PostEdit}
              />
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
          </MainContainer>
        </AppBox>
      )}
    />
  </Router>
);

export default AppPresenter;
