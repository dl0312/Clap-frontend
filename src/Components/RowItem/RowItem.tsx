import React, { Component } from "react";
import ItemTypes from "../../ItemTypes";
import styled from "styled-components";
import {
  DragSource,
  ConnectDragSource,
  DragSourceMonitor,
  DragSourceConnector
} from "react-dnd";

const itemSource = {
  beginDrag(
    props: IProps,
    monitor: DragSourceMonitor,
    component: RowItem
  ): {
    type?: string;
    onDrag?: "content" | "columnList";
    content?: any[];
    columnListArray: any[];
  } {
    props.masterCallback("onDrag", "columnList");
    const columnListArray: any[] = [];
    component.props.array.map(element => {
      return columnListArray.push([]);
    });
    return {
      type: "columnList",
      onDrag: "columnList",
      content: props.item.array,
      columnListArray
    };
  },
  endDrag(
    props: IProps,
    monitor: DragSourceMonitor,
    component: RowItem
  ): {
    type?: string;
    onDrag?: "content" | "columnList";
    content?: any[];
    columnListArray: any[];
  } {
    const columnListArray: any[] = [];
    props.masterCallback("onDrag", null);
    component.props.array.map(element => {
      return columnListArray.push([]);
    });
    return {
      type: "columnList",
      onDrag: "columnList",
      content: props.item.array,
      columnListArray
    };
  }
};

const RowItemContainer = styled.div`
  cursor: -webkit-grab;
  border-radius: 5px;
  height: 55px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #cccccc;
  margin-bottom: 15px;
  display: grid;
  transition: box-shadow 0.2s ease;
  color: transparent;
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
  }
`;

const RowItemBox = styled.div`
  outline: 1px solid #c4c4c4;
  background-color: #eeeeee;
`;

interface IProps {
  array: any[];
  masterCallback: any;
  item: any;
}

interface IDnDProps {
  connectDragSource: ConnectDragSource;
  isDragging: boolean;
}

class RowItem extends Component<IProps & IDnDProps> {
  public render() {
    const { array, connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    const gridTemplateColumns = array.join("fr ") + "fr";
    return (
      connectDragSource &&
      connectDragSource(
        <div>
          <RowItemContainer style={{ opacity, gridTemplateColumns }}>
            {array.map((element, index) => {
              return <RowItemBox key={index} />;
            })}
          </RowItemContainer>
        </div>
      )
    );
  }
}

export default DragSource(
  ItemTypes.ROW,
  itemSource,
  (connect: DragSourceConnector): object => ({
    connectDragSource: connect.dragSource()
  })
)(RowItem);
