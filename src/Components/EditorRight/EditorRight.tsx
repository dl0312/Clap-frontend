import React, { Component, Fragment } from "react";
import Content from "../EditorMenu/Content";
import Row from "../EditorMenu/Row";
import Body from "../EditorMenu/Body";
import Title from "../EditorMenu/Title";
import styled from "styled-components";

const Container = styled.div`
  color: #505659;
`;

const MenuColumn = styled.ul`
  color: #abacad;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
  background-color: #d6d9dc;
`;

const MenuItem = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: -webkit-grab;
`;

const Icon = styled.i`
  font-size: 12px;
`;

const MenuTitle = styled.div`
  margin-left: 5px;
  font-size: 12px;
  font-weight: 600;
`;

const menus = [
  { icon: "fas fa-bars", name: "ROW" },
  { icon: "fas fa-th-large", name: "CONTENT" }
  // { icon: "fas fa-columns", name: "BODY" }
];

interface IProps {
  // func
  masterCallback: any;
  addIdToState: any;
  deleteIdToState: any;
  rightMenu: number | null;
  cards: any[];
  view: "EDIT" | "USER" | "JSON";
  title: string;
  // bodyBackgroundColor: { r: number; g: number; b: number; a: number };
  // contentWidth: number;
  font: string;
  category: number[];
}

interface IState {
  active: number | null;
  hover: number | null;
}

class EditorRight extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: this.props.rightMenu,
      hover: null
    };
  }

  public toggle = (position: number) => {
    if (this.state.active === position) {
      this.props.masterCallback("rightMenu", null);
    } else {
      this.props.masterCallback("rightMenu", position);
    }
  };

  public hover = (position: number) => {
    if (this.state.hover === position) {
      this.setState({ hover: null });
    } else {
      this.setState({ hover: position });
    }
  };

  public leave = (position: number) => {
    if (this.state.hover === position) {
      this.setState({ hover: null });
    }
  };

  public myColor = (position: number) => {
    if (this.props.rightMenu === position) {
      return "#fafafa";
    }
    if (this.state.hover === position) {
      return "#c0c5c9";
    }
    return "";
  };

  public fontColor = (position: number) => {
    if (this.props.rightMenu === position) {
      return "#505659";
    }
    if (this.state.hover === position) {
      return "#505659";
    }
    return "";
  };

  public showSection = () => {
    switch (this.props.rightMenu) {
      case 0:
        return <Row masterCallback={this.props.masterCallback} />;
      case 1:
        return <Content masterCallback={this.props.masterCallback} />;
      case 2:
        return (
          <Body
            masterCallback={this.props.masterCallback}
            view={this.props.view}
            // bodyBackgroundColor={this.props.bodyBackgroundColor}
            // contentWidth={this.props.contentWidth}
            font={this.props.font}
          />
        );
      case 3:
        return (
          <Title
            title={this.props.title}
            masterCallback={this.props.masterCallback}
            addIdToState={this.props.addIdToState}
            deleteIdToState={this.props.deleteIdToState}
            category={this.props.category}
          />
        );
      default:
        return null;
    }
  };

  public render() {
    return (
      <Fragment>
        <Container>
          <MenuColumn>
            {menus.map((menu, index) => (
              <MenuItem
                key={index}
                style={{
                  background: this.myColor(index),
                  color: this.fontColor(index)
                }}
                onClick={() => {
                  this.toggle(index);
                }}
                onMouseOver={() => {
                  this.hover(index);
                }}
                onMouseLeave={() => {
                  this.leave(index);
                }}
              >
                <Icon className={menu.icon} />
                <MenuTitle>{menu.name}</MenuTitle>
              </MenuItem>
            ))}
          </MenuColumn>
          {this.showSection()}
        </Container>
      </Fragment>
    );
  }
}

export default EditorRight;
