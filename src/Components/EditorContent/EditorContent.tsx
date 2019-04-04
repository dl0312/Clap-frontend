import * as React from "react";
import styled from "styled-components";
import { media } from "src/config/_mixin";
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

const EditorContentFrameLayer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: block;
  min-width: 1024px;
  min-height: 100%;
  overflow: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
`;

interface IEditorContentCanvasProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const EditorContentCanvas = styled<IEditorContentCanvasProps, any>("div")`
  display: block;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  border: 0;
  max-width: ${props =>
    props.device === "PHONE"
      ? "425px"
      : props.device === "TABLET"
      ? "768px"
      : "100%"};
  min-width: ${props => (props.device === "DESKTOP" ? "778px" : null)};
  transform: translate3d(0, 0, 0);
  transition-property: all;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
`;

const EditorContentFrame = styled.div`
  height: 100%;
`;

const EditorContentContainer = styled.div`
  overflow-x: hidden;
  min-width: 320px;
  transition: 0.3s;
  overflow-y: auto;
  height: 100%;
  font-size: 14px;
  word-break: break-all;
  ${media.tablet`
    padding: 0 0 0 40px;
  `}
`;

const EditorContentWrapper = styled.div`
  min-height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
  background-color: #fff;
`;

interface IProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

// interface IDnDProps {
//   // React-dnd props
//   connectDropTarget?: ConnectDropTarget;
//   isOver?: boolean;
// }

class EditorContent extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const { device } = this.props;
    return (
      <EditorContentFrameLayer>
        <EditorContentCanvas device={device}>
          <EditorContentFrame>
            <EditorContentContainer>
              <EditorContentWrapper id="container">
                {this.props.children}
              </EditorContentWrapper>
            </EditorContentContainer>
          </EditorContentFrame>
        </EditorContentCanvas>
      </EditorContentFrameLayer>
    );
  }
}

export default EditorContent;

// export default DropTarget(
//   [ItemTypes.COLUMN, ItemTypes.ROW, ItemTypes.CARD, ItemTypes.CONTENT],
//   cardTarget,
//   (connect: DropTargetConnector, monitor: DropTargetMonitor): object => ({
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver()
//   })
// )(EditorLeft);
