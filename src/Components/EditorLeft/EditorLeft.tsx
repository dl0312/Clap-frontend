import * as React from "react";
import styled from "styled-components";
import EditorDefaults from "src/EditorDefaults";

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
  background-color: ${EditorDefaults.MAIN_BACKGROUND_COLOR};
  width: 100%;
  position: ${props => (props.view === "USER" ? "block" : "absolute")};
  min-height: ${props => (props.view === "USER" ? "100%" : "90.5vh")};
  /* overflow-y: ${props => (props.view === "USER" ? null : "auto")}; */

`;

interface IRealEditorContainerProps {
  view: "EDIT" | "USER" | "JSON";
}

const RealEditorContainer = styled<IRealEditorContainerProps, any>("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => (props.view === "USER" ? null : null)};
  margin-top: ${props => (props.view === "USER" ? null : "10px")};
`;

interface IProps {
  view: "EDIT" | "USER" | "JSON";
  font: string | null;
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
