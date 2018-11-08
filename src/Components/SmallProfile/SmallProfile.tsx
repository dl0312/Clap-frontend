import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "antd";

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
        <span>
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
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <ProfileItemContainer
                    onClick={() => {
                      logUserOut();
                    }}
                  >
                    LOG OUT
                  </ProfileItemContainer>
                </NavLink>
                <NavLink to="/profile" style={{ textDecoration: "none" }}>
                  <ProfileItemContainer>PROFILE</ProfileItemContainer>
                </NavLink>
              </div>
            </ProfileSettingContainer>
          </div>
        </span>
      </>
    );
  }
}

export default SmallProfile;
