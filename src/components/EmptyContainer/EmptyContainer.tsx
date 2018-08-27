import * as React from "react";
import styled from "styled-components";
import { DropTarget, DropTargetMonitor } from "react-dnd";
import ItemTypes from "../../ItemTypes";

const InsertText = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  color: #2f3542;
  transition: content 0.5s ease;
`;

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: EmptyContainer) {
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    console.log(isJustOverThisOne);
    if (isJustOverThisOne) {
      component.setState({ state: "ISOVER" });
    }
  },
  drop(props: IProps, monitor: DropTargetMonitor) {
    const type = monitor.getItemType();
    props.masterCallback("OnDrag", null);
    console.log(type);
    console.log(monitor.getItem());
    console.log(props.index);
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
  handleDrop: any;
  OnDrag: any;
}

interface IState {
  state: "ONDRAG" | "NOTHING" | "ISOVER";
}

class EmptyContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      state: this.props.OnDrag === "content" ? "ONDRAG" : "NOTHING"
    };
  }

  public render() {
    const { connectDropTarget, isOverCurrent } = this.context;
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ width: "100%" }}>
          <InsertText>
            {this.props.OnDrag === "content" ? (
              isOverCurrent ? (
                `DROP IT`
              ) : (
                `DROP HERE`
              )
            ) : (
              <div>
                INSERT <br /> CONTENT
              </div>
            )}
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
