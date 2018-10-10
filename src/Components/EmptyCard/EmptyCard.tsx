import React from "react";
import styled from "styled-components";
import ItemTypes from "../../ItemTypes";
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from "react-dnd";
const InsertText = styled.div`
  text-align: center;
  height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  color: #fff;
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
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ width: "99%" }}>
          <InsertText>
            {this.props.onDrag === "columnList" ? (
              isOverCurrent ? (
                `DROP IT`
              ) : (
                `DROP HERE!`
              )
            ) : this.props.onDrag === "content" ? (
              `YOU NEED TO INSERT ROW TO INSERT CONTENT`
            ) : (
              <div>INSERT ROW</div>
            )}
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
