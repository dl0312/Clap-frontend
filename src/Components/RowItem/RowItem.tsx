import React, { Component } from "react";
import ItemTypes from "../../ItemTypes";
import styled from "styled-components";
import {
  DragSource,
  ConnectDragSource,
  DragSourceMonitor,
  DragSourceConnector,
  ConnectDragPreview
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

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
  endDrag(props: IProps, monitor: DragSourceMonitor, component: RowItem) {
    props.masterCallback("onDrag", null);
    props.masterCallback("targetIndex", null);
  }
};

const RowItemContainer = styled.div`
  cursor: -webkit-grab;
  border-radius: 5px;
  height: 50px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #cccccc;
  margin-bottom: 10px;
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
  onClickPushNewBlock: any;
}

interface IDnDProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
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
          <RowItemContainer
            style={{ opacity, gridTemplateColumns }}
            onClick={() => this.handleOnClick(array)}
          >
            {array.map((element, index) => {
              return <RowItemBox key={index} />;
            })}
          </RowItemContainer>
        </div>
      )
    );
  }

  public handleOnClick = (array: any) => {
    const columnListArray: any[] = [];
    array.map(() => {
      return columnListArray.push([]);
    });
    this.props.onClickPushNewBlock(
      {
        type: "columnList",
        onDrag: "columnList",
        content: array,
        columnListArray
      },
      "ROW"
    );
    console.log(`RowItem Clicked!`);
  };

  public componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }
}

export default DragSource<IProps, IDnDProps>(
  ItemTypes.ROW,
  itemSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  })
)(RowItem);
