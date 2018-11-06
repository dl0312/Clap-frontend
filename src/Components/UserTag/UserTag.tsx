import React from "react";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";
import { Avatar, List } from "antd";

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

// const data = [<span key={1}>Send Message</span>, <span key={1}>Profile</span>];
const data = ["Send Message", "Profile"];

interface IProps {
  profilePhoto: string | null;
  username: string;
  size: number | "large" | "small" | "default";
  display: "text" | "photo" | "both" | null;
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
    const { profilePhoto, username, size, display } = this.props;
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
          {profilePhoto !== null
            ? (display === "photo" || display === "both") && (
                <Avatar
                  size={size !== undefined ? size : "default"}
                  src={profilePhoto}
                />
              )
            : (display === "photo" || display === "both") && (
                <Avatar size={size !== undefined ? size : "default"}>
                  {username}
                </Avatar>
              )}
          {(display === "text" || display === "both") && (
            <UserName size={size}>{username}</UserName>
          )}
        </UserContainer>

        {isOpen && (
          <span
            style={{
              position: "absolute",
              zIndex: 1,
              width: "125px",
              backgroundColor: "white"
            }}
          >
            <List
              size={"small"}
              bordered={true}
              dataSource={data}
              renderItem={(item: any) => <List.Item>{item}</List.Item>}
            />
          </span>
        )}
      </UserTagContainer>
    );
  }
}

export default onClickOutside(UserTag);
