import React from "react";
import styled from "styled-components";
import ItemTypes from "../../ItemTypes";
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from "react-dnd";
const InsertText = styled.div`
  height: 300px;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  color: #2f3542;
  outline: 0.5px dashed #2f3542;
`;

const cardTarget = {
  drop(props: IProps, monitor: DropTargetMonitor) {
    const type = monitor.getItemType();
    props.masterCallback("OnDrag", null);
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
  OnDrag: any;
}

interface IDnDProps {
  connectDropTarget: ConnectDropTarget;
}

class EmptyCard extends React.Component<IProps & IDnDProps> {
  constructor(props: IProps & IDnDProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { connectDropTarget } = this.props;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ width: "99%" }}>
          <InsertText>INSERT COLUMN</InsertText>
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
