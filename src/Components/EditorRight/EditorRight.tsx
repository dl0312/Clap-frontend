import React, { Component, Fragment } from "react";
import Content from "../EditorMenu/Content";
import Row from "../EditorMenu/Row";
import Body from "../EditorMenu/Body";
import Title from "../EditorMenu/Title";
import styled from "styled-components";
import EditorDefaults from "../../EditorDefaults";
import CategorySelection from "../CategorySelection";

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

const ContentBody = styled.div`
  padding: 15px;
`;

const ContentColumn = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const RowBody = styled.div`
  padding: 25px;
`;

const Indicator = styled.input`
  height: 30px;
  text-align: center;
  width: 45px;
  border: none;
  border-top: 0.4px solid #d8d8d8;
  border-bottom: 0.4px solid #d8d8d8;
`;

const Operator = styled.button`
  height: 30px;
  width: 25px;
  border: none;
  background-color: #fff;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 0.5px solid #d8d8d8;
  outline: none;
`;

const Swatch = styled.div`
  width: 150px;
  padding: 5px;
  background-color: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

interface ISwatchFontProps {
  fontFamily: string;
}

const SwatchFont = styled<ISwatchFontProps, any>("div")`
  padding: 5px 10px;
  font-family: ${props => props.fontFamily};
`;

const PopOver = styled.div`
  position: absolute;
  margin-top: 5px;
  z-index: 3;
  background-color: white;
`;

const FontColumn = styled.div`
  position: relative;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border: none;
  border-radius: 3px;
  border: 0.4px solid #d8d8d8;
  padding: 5px 0;
`;

interface IFontColumnItem {
  fontFamily: string;
}

const FontColumnItem = styled<IFontColumnItem, any>("div")`
  cursor: pointer;
  width: 150px;
  padding: 5px 10px;
  font-family: ${props => props.fontFamily};
`;

const ViewsContainer = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface IViewIconProps {
  isSelected: boolean;
}

const ViewIcon = styled<IViewIconProps, any>("i")`
  font-size: 20px;
  transition: opacity 0.5s ease;
  opacity: ${props => (props.isSelected ? "1" : "0.2")};
  color: black;
  &:hover {
    opacity: ${props => (props.isSelected ? null : "0.5")};
  }
`;

interface IProps {
  rightMenu: number;
  masterCallback: any;
}

interface IState {
  active: number;
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
            view={this.props.view}
            masterCallback={this.props.masterCallback}
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
