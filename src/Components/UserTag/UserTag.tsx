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
}

const UserProfilePhoto = styled<IUserProfilePhotoProps, any>("div")`
  width: 15px;
  height: 15px;
  overflow: hidden;
  position: relative;
  transition: filter 0.5s ease;
  margin-right: 5px;
  background-image: url(${props => `${props.url}`});
  background-size: auto 100%;
  background-position: 50% 50%;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
`;

const UserName = styled.div`
  font-weight: bolder;
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
  profilePhoto: string;
  username: string;
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
    const { profilePhoto, username } = this.props;
    const { isOpen } = this.state;

    return (
      <UserTagContainer>
        <UserContainer
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <UserProfilePhoto url={profilePhoto} />
          <UserName>{username}</UserName>
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
