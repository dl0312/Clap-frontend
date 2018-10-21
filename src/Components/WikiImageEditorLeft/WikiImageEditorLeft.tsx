import * as React from "react";
import styled from "styled-components";
import EditorDefaults from "../../../src/EditorDefaults";

interface IEditorLeftContainerProps {
  view: "EDIT" | "USER" | "JSON";
}

const EditorLeftContainer = styled<IEditorLeftContainerProps, any>("div")`
  background-color: ${EditorDefaults.MAIN_BACKGROUND_COLOR};
  width: 100%;
  max-width: 400px;
  position: ${props => (props.view === "USER" ? "block" : "absolute")};
  min-height: ${props => (props.view === "USER" ? "100%" : "90.5vh")};
`;

interface IRealEditorContainerProps {
  view: "EDIT" | "USER" | "JSON";
}

const RealEditorContainer = styled<IRealEditorContainerProps, any>("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => (props.view === "USER" ? null : null)};
  margin-top: ${props => (props.view === "USER" ? null : "30px")};
`;

interface IProps {
  view: "EDIT" | "USER" | "JSON";
  font: string | null;
}

class WikiImageEditorLeft extends React.Component<IProps> {
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

export default WikiImageEditorLeft;
