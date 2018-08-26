import * as React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../Navigation/Navigation';
// import { ApolloProvider } from 'react-apollo';

interface IProps {
  isLoggedIn: boolean;
}

const AppBox = styled.div`
  width: 100%;
`;

const AppPresenter: React.SFC<IProps> = () => (
  <Router>
    <AppBox>
      <Switch>
        <Route path={''} exact={true} component={Navigation} />
        {/* <Route path={'/ride/:rideId'} exact={true} component={Ride} />
      <Route path={'/chat/:chatId'} exact={true} component={Chat} />
      <Route path={'/edit-account'} exact={true} component={EditAccount} />
      <Route path={'/settings'} exact={true} component={Settings} />
      <Route path={'/places'} exact={true} component={Places} />
      <Route path={'/add-place'} exact={true} component={AddPlace} />
      <Route path={'/find-address'} exact={true} component={FindAddress} /> */}
        <Redirect from={'*'} to={'/'} />
      </Switch>
    </AppBox>
  </Router>
);

export default AppPresenter;
