import React from "react";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";

const ContentBoxContainer = styled.div`
  position: absolute;
  left: -30px;
  bottom: -30px;
`;

interface IExpandButtonProps {
  isOpen: boolean;
}

const ExpandButton = styled<IExpandButtonProps, any>("i")`
  font-size: 20px;
  transform: ${props => (props.isOpen ? "rotate(45deg)" : null)};
  transition: transform 0.1s;
`;

const ContentContainer = styled.div`
  position: absolute;
  left: 29px;
  top: -5px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 2px 2px 0 0;
  background-color: #fff;
  position: absolute;
  z-index: 100;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.i``;

const contentItems = [
  { icon: "fas fa-square", name: "BUTTON" },
  { icon: "fas fa-divide", name: "DIVIDER" },
  { icon: "fas fa-code", name: "HTML" },
  { icon: "fas fa-image", name: "IMAGE" },
  { icon: "fas fa-font", name: "TEXT" },
  { icon: "fab fa-youtube", name: "VIDEO" },
  { icon: "fab fa-hubspot", name: "SOCIAL" },
  { icon: "fas fa-bars", name: "BANNER" },
  { icon: "fas fa-ellipsis-h", name: "MENU" }
];

interface IProps {
  index: any;
}

interface IState {
  isOpen: boolean;
}

class ContentBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  public handleOnClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  public render() {
    const { isOpen } = this.state;
    return (
      <ContentBoxContainer>
        <ExpandButton
          isOpen={isOpen}
          onClick={this.handleOnClick}
          className="fas fa-plus-circle"
        />

        {isOpen && (
          <ContentContainer>
            {contentItems.map((item, index) => (
              <Content>
                <Icon className={item.icon} />
              </Content>
            ))}
          </ContentContainer>
        )}
      </ContentBoxContainer>
    );
  }
}

export default onClickOutside(ContentBox);
