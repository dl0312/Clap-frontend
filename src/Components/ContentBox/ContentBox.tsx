import React from "react";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";
import EditorDefaults from "src/EditorDefaults";

interface IContentBoxContainerProps {
  isOpen: boolean;
}

const ContentBoxContainer = styled<IContentBoxContainerProps, any>("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => (props.isOpen ? "35px" : "0px")};
  transition: height 0.2s ease;
`;

interface IExpandButtonProps {
  state: "ISOVER" | "ONDRAG" | "NOTHING";
  type: "content" | "columnList";
  isOpen: boolean;
}

const ExpandButton = styled<IExpandButtonProps, any>("div")`
  position: absolute;
  top: 50%;
  transform: translateY(-12.5px);
  right: ${props => (props.type === "content" ? "-25px" : null)};
  left: ${props => (props.type === "columnList" ? "-30px" : null)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    switch (props.state) {
      case "ONDRAG":
        return EditorDefaults.BUILDER_ONDRAG_COLOR;
      case "ISOVER":
        return EditorDefaults.BUILDER_ISOVER_COLOR;
      default:
        return props.isOpen
          ? "rgba(0, 0, 0, 0.5)"
          : EditorDefaults.BUILDER_NOTHING;
    }
  }};
  transition: background-color 0.5s ease;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  &:hover {
    background-color: #aaa;
  }
`;

interface IExpandIconProps {
  isOpen: boolean;
}

const ExpandIcon = styled<IExpandIconProps, any>("i")`
  font-size: 15px;
  color: white;
  transform: ${props => (props.isOpen ? "rotate(45deg)" : null)};
  transition: transform 0.1s;
`;

interface IContentContainerProps {
  isOpen: boolean;
}

const ContentContainer = styled<IContentContainerProps, any>("div")`
  position: absolute;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  height: ${props => (props.isOpen ? "30px" : "0px")};
  overflow: hidden;
  border-radius: 2px 2px 0 0;
  transition: height 0.2s ease;
`;

const Content = styled.div`
  width: 30px;
  height: 100%;
  margin: 0 2px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
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
  state: "ISOVER" | "ONDRAG" | "NOTHING";
  type: "content" | "columnList";
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
    const { state, type } = this.props;
    const { isOpen } = this.state;
    return (
      <ContentBoxContainer isOpen={isOpen}>
        <ExpandButton state={state} type={type} isOpen={isOpen}>
          <ExpandIcon
            isOpen={isOpen}
            onClick={this.handleOnClick}
            className="fas fa-plus"
          />
        </ExpandButton>
        <ContentContainer isOpen={isOpen}>
          {contentItems.map((item, index) => (
            <Content key={index}>
              <Icon className={item.icon} />
            </Content>
          ))}
        </ContentContainer>
      </ContentBoxContainer>
    );
  }
}

export default onClickOutside(ContentBox);
