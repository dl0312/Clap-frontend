import * as React from "react";
import styled from "styled-components";
import EditorDefaults from "src/EditorDefaults";
// import {
//   DropTarget,
//   DropTargetConnector,
//   DropTargetMonitor,
//   ConnectDropTarget
// } from "react-dnd";
// import ItemTypes from "src/ItemTypes";
// import { findDOMNode } from "react-dom";

// const cardTarget = {
//   hover(props: IProps, monitor: DropTargetMonitor, component: EditorLeft) {
//   }
// };

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
}

// interface IDnDProps {
//   // React-dnd props
//   connectDropTarget?: ConnectDropTarget;
//   isOver?: boolean;
// }

class EditorLeft extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  public render() {
    // const { connectDropTarget } = this.props;
    return (
      <EditorLeftContainer
        view={this.props.view}
        // innerRef={(instance: any) => {
        //   connectDropTarget!(instance);
        // }}
      >
        <RealEditorContainer id="container" view={this.props.view}>
          {this.props.children}
        </RealEditorContainer>
      </EditorLeftContainer>
    );
  }
}

export default EditorLeft;

// export default DropTarget(
//   [ItemTypes.COLUMN, ItemTypes.ROW, ItemTypes.CARD, ItemTypes.CONTENT],
//   cardTarget,
//   (connect: DropTargetConnector, monitor: DropTargetMonitor): object => ({
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver()
//   })
// )(EditorLeft);
