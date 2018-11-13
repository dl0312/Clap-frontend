import * as React from "react";
import styled from "styled-components";
import { DropTarget, DropTargetMonitor, ConnectDropTarget } from "react-dnd";
import ItemTypes from "../../ItemTypes";
import EditorDefaults from "../../EditorDefaults";
import Plain from "slate-plain-serializer";

interface IInsertProps {
  state: "ONDRAG" | "NOTHING" | "ISOVER";
}

const InsertText = styled<IInsertProps, any>("div")`
  border-radius: 3px;
  background-color: ${props =>
    props.state === "ISOVER"
      ? "rgb(184, 233, 148, 0.5)"
      : props.state === "ONDRAG"
      ? "#eee"
      : props.state === "NOTHING"
      ? EditorDefaults.MAIN_BACKGROUND_COLOR
      : null};
  height: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  color: ${EditorDefaults.MAIN_TEXT_COLOR};
  transition: content 0.5s ease, background-color 0.5s ease;
`;

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: EmptyContainer) {
    // const isJustOverThisOne = monitor.isOver({ shallow: true });
    // // if (isJustOverThisOne) {
    // //   component.setState({ curState: "ISOVER" });
    // // }
  },
  drop(props: IProps, monitor: DropTargetMonitor) {
    const type = monitor.getItemType();
    props.masterCallback("OnDrag", null);
    if (type === ItemTypes.CARD) {
      props.moveCard(monitor.getItem().index, props.index);
    } else if (type === ItemTypes.CONTENT) {
      props.handleDrop(monitor.getItem(), props.index);
    }
  }
};

interface IProps {
  index: number[];
  masterCallback: any;
  moveCard: any;
  handleDrop: (hoverItem: any, hoverIndex: number[]) => void;
  onDrag: any;
}

interface IDnDProps {
  connectDropTarget: ConnectDropTarget;
  isOverCurrent: boolean;
}

class EmptyContainer extends React.Component<IProps & IDnDProps, any> {
  constructor(props: IProps & IDnDProps) {
    super(props);
  }

  public render() {
    const { connectDropTarget, isOverCurrent, index, handleDrop } = this.props;
    const state =
      this.props.onDrag === "content"
        ? isOverCurrent
          ? "ISOVER"
          : "ONDRAG"
        : "NOTHING";
    console.log(index);
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ width: "100%", height: "100%" }}>
          <InsertText state={state}>
            {state === "ISOVER" ? (
              `DROP IT`
            ) : state === "ONDRAG" ? (
              `DROP HERE!`
            ) : state === "NOTHING" ? (
              <span style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 15 }}>
                  INSERT <br /> CONTENT
                </div>
                <div
                  onClick={() =>
                    handleDrop(
                      {
                        type: "content",
                        onDrag: "content",
                        content: "TEXT",
                        value: Plain.deserialize("")
                      },
                      index
                    )
                  }
                  style={{ margin: 5 }}
                >
                  TEXT
                </div>
              </span>
            ) : null}
          </InsertText>
        </div>
      )
    );
  }
}

export default DropTarget(
  [ItemTypes.CONTENT, ItemTypes.CARD],
  cardTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    didDrop: monitor.didDrop()
  })
)(EmptyContainer);
