import React from "react";
import styled from "styled-components";
import ItemTypes from "../../ItemTypes";
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from "react-dnd";
import EditorDefaults from "../../EditorDefaults";

interface IInsertText {
  state: "ISOVER" | "ONDRAG" | "WRONG" | "NOTHING";
}

const InsertText = styled<IInsertText, any>("div")`
  margin: 5px;
  border-radius: 3px;
  background-color: ${props =>
    props.state === "ISOVER"
      ? "rgba(184, 233, 148, 0.5)"
      : props.state === "ONDRAG"
        ? "#eee"
        : props.state === "WRONG"
          ? "rgba(240, 128, 128,0.5)"
          : props.state === "NOTHING"
            ? EditorDefaults.MAIN_BACKGROUND_COLOR
            : null};
  text-align: center;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  color: ${EditorDefaults.MAIN_TEXT_COLOR};
  /* outline: 0.5px dashed #fff; */
`;

const cardTarget = {
  drop(props: IProps, monitor: DropTargetMonitor) {
    const type = monitor.getItemType();
    props.masterCallback("onDrag", null);
    console.log(type);
    console.log(monitor.getItem());
    console.log(props.index);
    if (type === ItemTypes.COLUMN) {
      props.moveCard(monitor.getItem().index, props.index);
    } else if (type === ItemTypes.ROW) {
      props.handleDrop(monitor.getItem(), props.index);
    }
  }
};

interface IProps {
  index: number;
  masterCallback: any;
  moveCard: any;
  handleDrop: any;
  onDrag: "content" | "columnList" | null;
}

interface IDnDProps {
  connectDropTarget: ConnectDropTarget;
  isOverCurrent: boolean;
}

class EmptyCard extends React.Component<IProps & IDnDProps> {
  constructor(props: IProps & IDnDProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { connectDropTarget, isOverCurrent } = this.props;
    const state =
      this.props.onDrag === "columnList"
        ? isOverCurrent
          ? "ISOVER"
          : "ONDRAG"
        : this.props.onDrag === "content"
          ? "WRONG"
          : "NOTHING";
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ width: "99%" }}>
          <InsertText state={state}>
            {state === "ISOVER" ? (
              `DROP IT`
            ) : state === "ONDRAG" ? (
              `DROP HERE!`
            ) : state === "WRONG" ? (
              `YOU NEED TO INSERT ROW TO INSERT CONTENT`
            ) : state === "NOTHING" ? (
              <div>
                INSERT <br /> ROW
              </div>
            ) : null}
          </InsertText>
        </div>
      )
    );
  }
}

export default DropTarget(
  [ItemTypes.ROW, ItemTypes.COLUMN],
  cardTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    didDrop: monitor.didDrop()
  })
)(EmptyCard);
