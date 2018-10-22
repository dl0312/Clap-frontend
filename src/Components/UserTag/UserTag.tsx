import React from "react";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";

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

interface IUserProfilePhotoProps {
  url: string;
  size: "LARGE" | "MEDIUM" | "SMALL";
  isRound: boolean;
}

const UserProfilePhoto = styled<IUserProfilePhotoProps, any>("div")`
  width: ${props => {
    switch (props.size) {
      case "LARGE":
        return "25px";
      case "MEDIUM":
        return "20px";
      case "SMALL":
        return "15px";
      default:
        return null;
    }
  }};
  height: ${props => {
    switch (props.size) {
      case "LARGE":
        return "25px";
      case "MEDIUM":
        return "20px";
      case "SMALL":
        return "15px";
      default:
        return null;
    }
  }};
  border-radius: ${props => (props.isRound ? "100%" : null)};
  overflow: hidden;
  position: relative;
  transition: filter 0.5s ease;
  margin-right: 5px;
  background-image: url(${props => `${props.url}`});
  background-size: auto 100%;
  background-position: 50% 50%;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
`;

interface IUserNameProps {
  size: "LARGE" | "MEDIUM" | "SMALL";
}

const UserName = styled<IUserNameProps, any>("div")`
  font-weight: bolder;
  font-size: ${props => {
    switch (props.size) {
      case "LARGE":
        return "21px";
      case "MEDIUM":
        return "15px";
      case "SMALL":
        return "12px";
      default:
        return null;
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
  profilePhoto?: string;
  username: string;
  size: "LARGE" | "MEDIUM" | "SMALL";
  isRound?: boolean;
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
    const { profilePhoto, username, isRound, size } = this.props;
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
          <UserProfilePhoto url={profilePhoto} isRound={isRound} size={size} />
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
