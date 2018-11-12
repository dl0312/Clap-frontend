import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
import Register from "../../Routes/Register";
import Profile from "../../Routes/Profile";
import SearchResult from "../../Routes/SearchResult";
import Footer from "../Footer";
import { BackTop } from "antd";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { ApolloProvider } from 'react-apollo';

interface IProps {
  isLoggedIn: boolean;
  changeLocale: any;
}

const AppBox = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  margin-top: 85px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
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

function PrivateRoute({ component: Component, isLoggedIn, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn, changeLocale }) => (
  <Switch>
    <PrivateRoute
      isLoggedIn={isLoggedIn}
      path="/post/add"
      exact={true}
      component={PostAdd}
    />
    <PrivateRoute
      isLoggedIn={isLoggedIn}
      path="/post/edit/:postId"
      exact={true}
      component={PostEdit}
    />
    <PrivateRoute
      isLoggedIn={isLoggedIn}
      path="/category/add"
      exact={true}
      component={CategoryAdd}
    />
    <PrivateRoute
      isLoggedIn={isLoggedIn}
      path="/category/edit/:categoryId"
      exact={true}
      component={CategoryEdit}
    />
    <PrivateRoute
      isLoggedIn={isLoggedIn}
      path="/category/:categoryId/wikiImage/add"
      exact={true}
      component={WikiImageAdd}
    />
    <PrivateRoute
      isLoggedIn={isLoggedIn}
      path="/category/:categoryId/wikiImage/edit/:wikiImageId"
      exact={true}
      component={WikiImageEdit}
    />
    <Route path="/login" exact={true} component={LogIn} />
    <Route path="/register" exact={true} component={Register} />

    <Route
      path={"*"}
      exact={true}
      render={({ location }) => (
        <AppBox>
          <BackTop />
          <Navigation isLoggedIn={isLoggedIn} />
          <MainContainer>
            <Switch>
              <Route
                path="/search/:categoryId"
                exact={true}
                component={SearchResult}
              />
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                path="/profile"
                exact={true}
                component={Profile}
              />

              <Route
                path="/category/read/:categoryId"
                exact={true}
                component={CategoryDetail}
              />
              <Route
                path="/post/read/:postId"
                exact={true}
                component={PostDetail}
              />
              <Route
                path="/category/:categoryId/wikiImage/read/:wikiImageId"
                exact={true}
                component={WikiImageDetail}
              />
              <Route path={"/wiki"} exact={true} component={Wiki} />
              <Route path={"/board"} exact={true} component={Board} />
              <Route path={""} exact={true} component={Home} />
              <Redirect from={"*"} to={"/"} />
            </Switch>
          </MainContainer>
          <Footer changeLocale={changeLocale} />
        </AppBox>
      )}
    />
  </Switch>
);

export default AppPresenter;
