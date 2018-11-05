import React from "react";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";
import { Avatar } from "antd";

const UserTagContainer = styled.div`
  position: relative;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  cursor: pointer;
`;

interface IUserNameProps {
  size?: number | "large" | "small" | "default";
}

const UserName = styled<IUserNameProps, any>("div")`
  font-weight: bolder;
  margin-left: 5px;
  font-size: ${props => {
    switch (props.size) {
      case "small":
        return "12px";
      case "default":
        return "15px";
      case "large":
        return "21px";
      default:
        return "15px";
    }
  }};
`;

const UserTagOptionsConatiner = styled.div`
  position: absolute;
  z-index: 9999;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 70px;
  height: 120px;
  background-color: white;
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 3px;
  font-size: 8px;
`;

const UserTagOption = styled.div`
  color: #000;
`;

interface IProps {
  profilePhoto?: string | null;
  username: string;
  size?: number | "large" | "small" | "default";
}

interface IState {
  isOpen: boolean;
}

class UserTag extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  public handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  public render() {
    const { profilePhoto, username, size } = this.props;
    const { isOpen } = this.state;

    return (
      <UserTagContainer>
        <UserContainer
          onClick={() =>
            this.setState({
              isOpen: !this.state.isOpen
            })
          }
        >
          {profilePhoto !== null ? (
            <Avatar
              size={size !== undefined ? size : "default"}
              src={profilePhoto}
            />
          ) : (
            <Avatar size={size !== undefined ? size : "default"}>
              {username}
            </Avatar>
          )}
          <UserName size={size}>{username}</UserName>
        </UserContainer>

        {isOpen && (
          <UserTagOptionsConatiner>
            <UserTagOption>Send Message</UserTagOption>
            <UserTagOption>Follow User</UserTagOption>
            <UserTagOption>Block User</UserTagOption>
            <UserTagOption>Profile</UserTagOption>
            <UserTagOption>Written Guides</UserTagOption>
          </UserTagOptionsConatiner>
        )}
      </UserTagContainer>
    );
  }
}

export default onClickOutside(UserTag);
