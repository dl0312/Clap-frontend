import React, { Component, Fragment } from "react";
import Content from "../EditorMenu/Content";
import Row from "../EditorMenu/Row";
import Body from "../EditorMenu/Body";
import Title from "../EditorMenu/Title";
import styled from "styled-components";

const Container = styled.div`
  color: #505659;
  position: relative;
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
  font-size: 15px;
`;

const MenuTitle = styled.div`
  margin-left: 5px;
  font-size: 12px;
  font-weight: 600;
`;

interface IProps {
  // func
  masterCallback: any;
  addIdToState: any;
  deleteIdToState: any;

  rightMenu: number | null;
  cards: any[];
  view: "EDIT" | "USER" | "JSON";
  title: string;
  bodyBackgroundColor: { r: number; g: number; b: number; a: number };
  contentWidth: number;
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
        return <Content masterCallback={this.props.masterCallback} />;
      case 1:
        return <Row masterCallback={this.props.masterCallback} />;
      case 2:
        return (
          <Body
            masterCallback={this.props.masterCallback}
            view={this.props.view}
            bodyBackgroundColor={this.props.bodyBackgroundColor}
            contentWidth={this.props.contentWidth}
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
    console.log(this.props);
    return (
      <Fragment>
        <Container>
          <MenuColumn>
            <MenuItem
              style={{ background: this.myColor(0), color: this.fontColor(0) }}
              onClick={() => {
                this.toggle(0);
              }}
              onMouseOver={() => {
                this.hover(0);
              }}
              onMouseLeave={() => {
                this.leave(0);
              }}
            >
              <Icon className="fas fa-th-large" />
              <MenuTitle>CONTENT</MenuTitle>
            </MenuItem>
            <MenuItem
              style={{ background: this.myColor(1), color: this.fontColor(1) }}
              onClick={() => {
                this.toggle(1);
              }}
              onMouseOver={() => {
                this.hover(1);
              }}
              onMouseLeave={() => {
                this.leave(1);
              }}
            >
              <Icon className="fas fa-bars" />
              <MenuTitle>ROW</MenuTitle>
            </MenuItem>
            <MenuItem
              style={{ background: this.myColor(2), color: this.fontColor(2) }}
              onClick={() => {
                this.toggle(2);
              }}
              onMouseOver={() => {
                this.hover(2);
              }}
              onMouseLeave={() => {
                this.leave(2);
              }}
            >
              <Icon className="fas fa-columns" />
              <MenuTitle>BODY</MenuTitle>
            </MenuItem>
            <MenuItem
              style={{ background: this.myColor(3), color: this.fontColor(3) }}
              onClick={() => {
                this.toggle(3);
              }}
              onMouseOver={() => {
                this.hover(3);
              }}
              onMouseLeave={() => {
                this.leave(3);
              }}
            >
              <Icon className="fas fa-feather" />
              <MenuTitle>TITLE</MenuTitle>
            </MenuItem>
          </MenuColumn>
          {this.showSection()}
        </Container>
      </Fragment>
    );
  }
}

export default EditorRight;
