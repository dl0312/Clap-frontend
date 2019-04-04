import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { LOG_USER_OUT } from "../../sharedQueries.local";
// import { LOG_USER_OUT, LOG_USER_IN } from "../../sharedQueries.local";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import GoogleLogin from "react-google-login";
import {
  // facebookConnect,
  // facebookConnectVariables,
  // googleConnect,
  // googleConnectVariables,
  getMyProfile
} from "../../types/api";
// import { FACEBOOK_CONNECT, GOOGLE_CONNECT, PROFILE } from "../../sharedQueries";

import { PROFILE } from "../../sharedQueries";
import { media } from "src/config/_mixin";
import { Avatar, Popover, Icon } from "antd";
import SmallProfile from "../SmallProfile";

const NavContainer = styled.div`
  width: 100%;
  z-index: 200;
  border-bottom: 0.1px solid darkgrey;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;

  position: fixed;
  right: 0px;
  left: 0px;
  z-index: 3;
  /* background-color: rgba(5, 5, 5, 0.94); */
  transition: 0.1s ease;
`;

interface IMenuListProps {
  darken: boolean;
}

const MenuList = styled<IMenuListProps, any>("ul")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  color: ${props => (props.darken ? "white" : null)};
  background-color: ${props =>
    props.darken ? "rgba(20, 20, 20, 0.94)" : "transparent"};
  transition: 0.1s ease;
  box-shadow: ${props =>
    props.darken ? "0px 0.5px 2px rgba(0, 0, 0, 0.3)" : null};
  position: relative;
  ${media.desktop`display: none;`};
  ${media.phone``};
`;

const MenuItem = styled.div`
  text-align: center;
  padding: 10px 30px;
  text-decoration: none;
  font-family: "Raleway";
  font-weight: 100;
  letter-spacing: 10px;
  font-size: 15px;
  ${media.tablet`font-size: 12px; padding: 10px 10px;`};
  ${media.phone`font-size: 12px; padding: 10px 10px;`};
`;

interface IProfileContainerProps {
  darken: boolean;
}

const ProfileContainer = styled<IProfileContainerProps, any>("div")`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 35px;
  color: ${props => (props.darken ? "white" : null)};
  background-color: ${props =>
    props.darken ? "rgba(10, 10, 10, 0.94)" : "transparent"};
  transition: 0.1s ease;
`;

const ProfileItemContainer = styled.div`
  padding: 5px 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// interface ISocialIconProps {
//   size: number;
// }

// const SocialIcon = styled<ISocialIconProps, any>("img")`
//   width: ${(props: ISocialIconProps) => props.size};
//   margin: 0 2px;
//   border-radius: 2px;
//   cursor: pointer;
// `;

const ProfileNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const GameIcon = styled.img`
  height: 25px;
  padding: 0 5px;
`;

class GetMyProfileQuery extends Query<getMyProfile> {}

// class FacebookConnectMutation extends Mutation<
//   facebookConnect,
//   facebookConnectVariables
// > {}

// class GoogelConnectMutation extends Mutation<
//   googleConnect,
//   googleConnectVariables
// > {}

interface IProps {
  isLoggedIn: boolean;
}

interface IState {
  darken: boolean;
  isSideBarOpen: boolean;
}

class Navigation extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      darken: false,
      isSideBarOpen: false
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
    if (scrollHeight > 75) {
      this.setState({ darken: true });
    } else {
      this.setState({ darken: false });
    }
  };

  public facebookConnectConfirm = (data: any) => {
    const { FacebookConnect } = data;
    if (FacebookConnect.ok) {
      toast.success("Facebook Connection Success");
    } else {
      toast.error(FacebookConnect.error);
    }
  };

  public render() {
    const { darken } = this.state;
    return (
      <Mutation
        mutation={LOG_USER_OUT}
        onCompleted={data => toast.success("Log Out Success")}
      >
        {logUserOut => (
          <NavContainer>
            <Header>
              <div style={{ width: "100%" }}>
                <ProfileContainer darken={darken}>
                  {this.props.isLoggedIn ? (
                    <>
                      <GetMyProfileQuery
                        query={PROFILE}
                        fetchPolicy={"cache-and-network"}
                      >
                        {({ loading, error, data }) => {
                          if (loading) {
                            return (
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: "5px 15px"
                                }}
                              >
                                <Avatar
                                  shape="square"
                                  size={"small"}
                                  style={{
                                    backgroundColor: "skyblue",
                                    marginRight: "5px"
                                  }}
                                  icon="user"
                                />
                                <div style={{ fontSize: 15 }}>Anonymous</div>
                              </span>
                            );
                          }
                          if (error) {
                            return <div>{error.message}</div>;
                          }
                          if (data !== undefined) {
                            const user = data.GetMyProfile.user;
                            return (
                              user && (
                                <>
                                  {user.games &&
                                    user.games.map((game, index) => {
                                      return (
                                        game && (
                                          <Link
                                            key={game.id}
                                            to={`/game/${game.id}`}
                                            style={{
                                              textDecoration: "none",
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center"
                                            }}
                                          >
                                            <GameIcon
                                              key={index}
                                              src={game.icon!}
                                            />
                                            {game.title}
                                          </Link>
                                        )
                                      );
                                    })}
                                  <Link to={"/games"}>
                                    {" "}
                                    <Icon
                                      style={{
                                        fontSize: 18,
                                        margin: "0 5px"
                                      }}
                                      type="edit"
                                    />
                                  </Link>

                                  <ProfileNavContainer>
                                    <IconContainer>
                                      <Icon
                                        style={{
                                          fontSize: 18,
                                          marginRight: 5
                                        }}
                                        type="message"
                                      />
                                      0
                                    </IconContainer>
                                    <IconContainer>
                                      <Icon
                                        style={{
                                          fontSize: 18,
                                          marginRight: 5
                                        }}
                                        type="bell"
                                      />
                                      0
                                    </IconContainer>
                                    <IconContainer>
                                      <Icon
                                        style={{
                                          fontSize: 18,
                                          marginRight: 5
                                        }}
                                        type="dollar"
                                      />
                                      10
                                    </IconContainer>
                                    <Popover
                                      placement="bottomRight"
                                      content={
                                        <SmallProfile
                                          user={user}
                                          logUserOut={logUserOut}
                                        />
                                      }
                                      trigger="hover"
                                    >
                                      <NavLink
                                        to="/profile"
                                        style={{ textDecoration: "none" }}
                                      >
                                        <span
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "5px 15px"
                                          }}
                                        >
                                          {user.profilePhoto ? (
                                            <Avatar
                                              shape="square"
                                              size={"small"}
                                              src={user.profilePhoto}
                                              style={{ marginRight: "5px" }}
                                            />
                                          ) : (
                                            <Avatar
                                              shape="square"
                                              size={"small"}
                                              style={{
                                                backgroundColor: "grey",
                                                marginRight: "5px"
                                              }}
                                              icon="user"
                                            />
                                          )}
                                          <div style={{ fontSize: 15 }}>
                                            {user.nickName}
                                          </div>
                                        </span>
                                      </NavLink>
                                    </Popover>
                                  </ProfileNavContainer>
                                </>
                              )
                            );
                          } else {
                            return null;
                          }
                        }}
                      </GetMyProfileQuery>
                    </>
                  ) : (
                    <>
                      <NavLink to="/login" style={{ textDecoration: "none" }}>
                        <ProfileItemContainer>LOG IN</ProfileItemContainer>
                      </NavLink>
                      /
                      <NavLink
                        to="/register"
                        style={{ textDecoration: "none" }}
                      >
                        <ProfileItemContainer>JOIN US</ProfileItemContainer>
                      </NavLink>
                      {/* <Mutation mutation={LOG_USER_IN}>
                        {logUserIn => (
                          <>
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
                                        firstName:
                                          response.profileObj.givenName,
                                        lastName:
                                          response.profileObj.familyName,
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
                          </>
                        )}
                      </Mutation> */}
                    </>
                  )}
                </ProfileContainer>
                <MenuList darken={darken}>
                  <MenuItem style={{ minWidth: "240px" }}>
                    <NavLink
                      to="/"
                      style={{
                        fontSize: "20px",
                        textDecoration: "none"
                      }}
                    >
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
                    </NavLink>
                  </MenuItem>

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
