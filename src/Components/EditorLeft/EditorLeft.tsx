import * as React from "react";
import styled from "styled-components";

interface IEditorLeftContainerProps {
  view: "EDIT" | "USER" | "JSON";
}

const EditorLeftContainer = styled<IEditorLeftContainerProps, any>("div")`
  /* overflow-y: auto; */
  /* overflow-x: hidden; */
  /* position: ${props => (props.view === "USER" ? "block" : "absolute")};
  bottom: 0px;
  right: 0px;
  left: 0px;
  top: ${props => {
    switch (props.view) {
      case "EDIT":
        return null;
      case "USER":
        return "0px";
      default:
        return null;
    }
  }}; */
  width: 100%;
  overflow-y: auto;
  height: 91vh;
`;

interface IRealEditorContainerProps {
  view: "EDIT" | "USER" | "JSON";
  backgroundColor: { r: string; g: string; b: string; a: string };
}

const RealEditorContainer = styled<IRealEditorContainerProps, any>("div")`
  background-color: ${props =>
    `rgba(${props.backgroundColor.r}, ${props.backgroundColor.g}, ${
      props.backgroundColor.b
    }, ${props.backgroundColor.a})`};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => (props.view === "USER" ? null : null)};
  margin-top: ${props => (props.view === "USER" ? null : "10px")};
`;

interface IProps {
  view: "EDIT" | "USER" | "JSON";
  font: string | null;
  bodyBackgroundColor: { r: number; g: number; b: number; a: number };
}

class EditorLeft extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <EditorLeftContainer view={this.props.view}>
        <RealEditorContainer
          backgroundColor={this.props.bodyBackgroundColor}
          fontFamily={this.props.font}
          id="container"
          view={this.props.view}
        >
          {this.props.children}
        </RealEditorContainer>
      </EditorLeftContainer>
    );
  }
}

export default EditorLeft;
