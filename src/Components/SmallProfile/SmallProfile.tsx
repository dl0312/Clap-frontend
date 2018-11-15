import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Button } from "antd";

const SmallProfileContainer = styled.span`
  margin: 10;
`;

const ProfileItemContainer = styled.div`
  padding: 3px 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileSettingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 125px;
  padding: 5px 5px;
`;

interface IProps {
  logUserOut: any;
  user: any;
}

class SmallProfile extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { logUserOut, user } = this.props;
    return (
      <>
        <SmallProfileContainer>
          <div style={{ fontWeight: "bolder" }}>PROFILE SETTINGS</div>
          <div>
            <ProfileSettingContainer>
              {user.profilePhoto ? (
                <Avatar size={"large"} shape="square" src={user.profilePhoto} />
              ) : (
                <Avatar
                  size={"large"}
                  shape="square"
                  style={{ backgroundColor: "grey" }}
                  icon="user"
                />
              )}
              <div>
                <NavLink to="/profile" style={{ textDecoration: "none" }}>
                  <ProfileItemContainer>PROFILE</ProfileItemContainer>
                </NavLink>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <ProfileItemContainer
                    onClick={() => {
                      logUserOut();
                    }}
                  >
                    LOG OUT
                  </ProfileItemContainer>
                </NavLink>
              </div>
            </ProfileSettingContainer>
          </div>
          <NavLink
            to="/wiki"
            style={{
              width: "100%",
              textDecoration: "none"
            }}
          >
            <Button
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <i className="fas fa-book-open" style={{ marginRight: 10 }} />{" "}
              WIKI
            </Button>
          </NavLink>
        </SmallProfileContainer>
      </>
    );
  }
}

export default SmallProfile;
