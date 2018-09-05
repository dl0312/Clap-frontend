import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AUTH_TOKEN } from "../../constants";

const NavContainer = styled.div`
  width: 100%;
  z-index: 200;
  border-bottom: 0.1px solid darkgrey;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  color: black;
  background-color: #fafafa;
  transition: background-color 0.1s ease;
  background-color: transparent;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 0.1px solid darkgrey;
`;

const MenuItem = styled.div`
  text-align: center;
  padding: 9px 30px;
  color: black;
  text-decoration: none;
  font-family: "Raleway";
  font-weight: 100;
  font-family: "Roboto";
  letter-spacing: 10px;
  width: 250px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 50px;
`;

const ProfileItemContainer = styled.div`
  padding: 3px 10px;
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
`;

interface IProps {
  isLoggedIn: boolean;
}

const Navigation: React.SFC<IProps> = ({ isLoggedIn }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <NavContainer>
      <Header>
        <div style={{ width: "100%" }}>
          <ProfileContainer>
            {authToken !== null ? (
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <ProfileItemContainer
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                  }}
                >
                  LOG OUT
                </ProfileItemContainer>
              </NavLink>
            ) : (
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <ProfileItemContainer>LOG IN</ProfileItemContainer>
              </NavLink>
            )}
            {!authToken && (
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                <ProfileItemContainer>JOIN US</ProfileItemContainer>
              </NavLink>
            )}
            {!authToken && (
              <React.Fragment>
                <ProfileItemContainer>SOCIAL LOGIN </ProfileItemContainer>
                <SocialIcon
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png"
                  size="18px"
                />
                <SocialIcon
                  src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
                  size="18px"
                />
                <SocialIcon
                  src="http://pluspng.com/img-png/naver-logo-png-naver-300.png"
                  size="18px"
                />
                <SocialIcon
                  src="https://cdn.iconscout.com/public/images/icon/free/png-512/kakaotalk-logo-social-media-3790821a3904b250-512x512.png"
                  size="18px"
                />
              </React.Fragment>
            )}
            {authToken && <ProfileItemContainer>PROFILE</ProfileItemContainer>}
          </ProfileContainer>
          <MenuList>
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
          </MenuList>
          {/* <MenuList>
                <MenuItem style={{ fontSize: "20px" }}>
                  <i className="fas fa-bell" />
                </MenuItem>
                <NavLink to="/profile" style={{ textDecoration: "none" }}>
                  <MenuItem style={{ fontSize: "20px" }}>
                    <i className="fas fa-user-circle" />
                  </MenuItem>
                </NavLink>
              </MenuList> */}
        </div>
      </Header>
    </NavContainer>
  );
};

export default Navigation;
