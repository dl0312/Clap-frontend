import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LOG_USER_OUT, LOG_USER_IN } from "../../sharedQueries.local";
import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import {
  facebookConnect,
  facebookConnectVariables,
  googleConnect,
  googleConnectVariables
} from "../../types/api";
import { FACEBOOK_CONNECT, GOOGLE_CONNECT } from "../../sharedQueries";

const NavContainer = styled.div`
  width: 100%;
  z-index: 200;
  border-bottom: 0.1px solid darkgrey;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  color: white;
  position: fixed;
  right: 0px;
  left: 0px;
  z-index: 1;
  /* background-color: rgba(5, 5, 5, 0.94); */
  transition: background-color 0.1s ease;
`;

interface IMenuListProps {
  darken: boolean;
}

const MenuList = styled<IMenuListProps, any>("ul")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.darken ? "rgba(20, 20, 20, 0.94)" : "transparent"};
  transition: background-color 0.3s ease, box-shadow 0.5s ease;
  box-shadow: ${props =>
    props.darken ? "0px 0.5px 2px rgba(0, 0, 0, 0.3)" : null};
`;

const MenuItem = styled.div`
  text-align: center;
  padding: 9px 30px;
  color: white;
  text-decoration: none;
  font-family: "Raleway";
  font-weight: 100;
  letter-spacing: 10px;
  font-size: 15px;
  width: 250px;
`;

interface IProfileContainerProps {
  darken: boolean;
}

const ProfileContainer = styled<IProfileContainerProps, any>("div")`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${props =>
    props.darken ? "rgba(10, 10, 10, 0.94)" : "transparent"};
  transition: background-color 0.3s ease;
  padding-right: 50px;
`;

const ProfileItemContainer = styled.div`
  padding: 5px 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ISocialIconProps {
  size: number;
}

const SocialIcon = styled<ISocialIconProps, any>("img")`
  width: ${(props: ISocialIconProps) => props.size};
  margin: 0 2px;
  border-radius: 2px;
  cursor: pointer;
`;

class FacebookConnectMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

class GoogelConnectMutation extends Mutation<
  googleConnect,
  googleConnectVariables
> {}

interface IProps {
  isLoggedIn: boolean;
}

interface IState {
  darken: boolean;
}

class Navigation extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      darken: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScrollHeader);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScrollHeader);
  }

  public handleScrollHeader = () => {
    const scrollHeight = window.scrollY;
    console.log(scrollHeight);
    if (scrollHeight > 300) {
      this.setState({ darken: true });
    } else {
      this.setState({ darken: false });
    }
  };

  public facebookConnectConfirm = (data: any) => {
    const { FacebookConnect } = data;
    console.log(data);
    if (FacebookConnect.ok) {
      toast.success("Facebook Connection Success");
    } else {
      toast.error(FacebookConnect.error);
    }
  };

  public render() {
    return (
      <Mutation
        mutation={LOG_USER_OUT}
        onCompleted={data => toast.success("Log Out Success")}
      >
        {logUserOut => (
          <NavContainer>
            <Header>
              <div style={{ width: "100%" }}>
                <ProfileContainer darken={this.state.darken}>
                  {this.props.isLoggedIn ? (
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      <ProfileItemContainer
                        onClick={() => {
                          logUserOut();
                        }}
                      >
                        LOG OUT
                      </ProfileItemContainer>
                    </NavLink>
                  ) : (
                    <NavLink to="/login" style={{ textDecoration: "none" }}>
                      <ProfileItemContainer>LOG IN / JOIN US</ProfileItemContainer>
                    </NavLink>
                  )}
                  {!this.props.isLoggedIn && (
                    <Mutation mutation={LOG_USER_IN}>
                      {logUserIn => (
                        <React.Fragment>
                          <ProfileItemContainer>
                            SOCIAL LOGIN{" "}
                          </ProfileItemContainer>

                          <FacebookConnectMutation
                            mutation={FACEBOOK_CONNECT}
                            onCompleted={data => {
                              const { FacebookConnect } = data;
                              const { token } = FacebookConnect;
                              console.log(data);
                              if (FacebookConnect.ok) {
                                toast.success("Facebook Connection Success");
                              } else {
                                toast.error(FacebookConnect.error);
                              }
                              if (token !== null) {
                                logUserIn({ variables: { token } });
                              }
                            }}
                          >
                            {(facebookConnect, { loading }) => (
                              <FacebookLogin
                                appId="1660436057369700"
                                autoLoad={false}
                                fields="first_name,last_name,name,email,id"
                                callback={(response: any) => {
                                  console.log(response);
                                  facebookConnect({
                                    variables: {
                                      firstName: response.first_name,
                                      lastName: response.last_name,
                                      nickName: response.name,
                                      email: response.email,
                                      fbId: response.id
                                    }
                                  });
                                }}
                                render={(renderProps: any) => (
                                  <SocialIcon
                                    onClick={renderProps.onClick}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png"
                                    size="16px"
                                  />
                                )}
                              />
                            )}
                          </FacebookConnectMutation>
                          <GoogelConnectMutation
                            mutation={GOOGLE_CONNECT}
                            onCompleted={data => {
                              const { GoogleConnect } = data;
                              const { token } = GoogleConnect;
                              console.log(data);
                              if (GoogleConnect.ok) {
                                toast.success("Google Connect Success");
                              } else {
                                toast.error(GoogleConnect.error);
                              }
                              if (token !== null) {
                                logUserIn({ variables: { token } });
                              }
                            }}
                          >
                            {(GoogleConnect, { loading }) => (
                              <GoogleLogin
                                clientId={
                                  "507629564813-jp4arkeqhitdcf6mlhnums7dib204odf.apps.googleusercontent.com"
                                }
                                autoLoad={false}
                                onSuccess={(response: any) => {
                                  console.log(response);
                                  GoogleConnect({
                                    variables: {
                                      firstName: response.profileObj.givenName,
                                      lastName: response.profileObj.familyName,
                                      nickName: response.profileObj.name,
                                      email: response.profileObj.email,
                                      profilePhoto:
                                        response.profileObj.imageUrl,
                                      googleId: response.googleId
                                    }
                                  });
                                }}
                                onFailure={() =>
                                  toast.error("Google Connect Failed")
                                }
                                render={(renderProps: any) => (
                                  <SocialIcon
                                    src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
                                    size="16px"
                                    onClick={renderProps.onClick}
                                  />
                                )}
                              />
                            )}
                          </GoogelConnectMutation>

                          <SocialIcon
                            src="http://pluspng.com/img-png/naver-logo-png-naver-300.png"
                            size="16px"
                          />
                          <SocialIcon
                            src="https://cdn.iconscout.com/public/images/icon/free/png-512/kakaotalk-logo-social-media-3790821a3904b250-512x512.png"
                            size="16px"
                          />
                        </React.Fragment>
                      )}
                    </Mutation>
                  )}
                  {this.props.isLoggedIn && (
                    <NavLink to="/profile" style={{ textDecoration: "none" }}>
                      <ProfileItemContainer>PROFILE</ProfileItemContainer>
                    </NavLink>
                  )}
                </ProfileContainer>
                <MenuList darken={this.state.darken}>
                  <NavLink
                    to="/"
                    style={{
                      fontSize: "20px",
                      marginRight: "150px",
                      textDecoration: "none"
                    }}
                  >
                    <MenuItem>
                      CLAP
                      <div
                        role="img"
                        aria-label="Game"
                        style={{
                          fontFamily: "Open Sans",
                          fontSize: "5px",
                          letterSpacing: "2px"
                        }}
                      >
                        🕹️POWERED BY GAMERS🕹️
                      </div>
                    </MenuItem>
                  </NavLink>
                  <NavLink to="/board" style={{ textDecoration: "none" }}>
                    <MenuItem>GUIDE</MenuItem>
                  </NavLink>
                  <NavLink to="/wiki" style={{ textDecoration: "none" }}>
                    <MenuItem>WIKI</MenuItem>
                  </NavLink>
                  <NavLink to="/store" style={{ textDecoration: "none" }}>
                    <MenuItem>STORE</MenuItem>
                  </NavLink>
                  {/* <NavLink to="/editor" style={{ textDecoration: "none" }}>
                <MenuItem>EDITOR</MenuItem>
              </NavLink> */}
                  {/* <MenuItem style={{ fontSize: "20px" }}>
              <i className="fas fa-bell" />
            </MenuItem>
            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <MenuItem style={{ fontSize: "20px" }}>
                <i className="fas fa-user-circle" />
              </MenuItem>
            </NavLink> */}
                </MenuList>
              </div>
            </Header>
          </NavContainer>
        )}
      </Mutation>
    );
  }
}

export default Navigation;
