import React from "react";
import {
  DragSource,
  DropTarget,
  DropTargetMonitor,
  DragSourceMonitor,
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DropTargetConnector,
  DragSourceConnector
} from "react-dnd";
import ItemTypes from "../../ItemTypes";
import classnames from "classnames";
import styled from "styled-components";
import EditorDefaults from "../../EditorDefaults";
import { findDOMNode } from "react-dom";
import flow from "lodash/flow";

const Handle = styled.div`
  background-color: ${EditorDefaults.HANDLE_COLOR};
  width: 2rem;
  height: 2rem;
  border-top-left-radius: 100%;
  border-bottom-left-radius: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 50%;
  transform: translate(2px, -16px);

  margin-left: -34px;
  left: 0px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: ${EditorDefaults.HANDLE_COLOR};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Tool = styled.div`
  display: flex;
  position: absolute;
  margin-right: 0.75rem;
  cursor: -webkit-grab;
  align-items: center;
  justify-content: center;
  color: white;
  top: 50%;
  transform: translate(12px, -16px);
  margin-left: -108px;
  left: 0px;
`;

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: Card) {
    const { setTargetIndex, onDrag, index } = props;
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    if (isJustOverThisOne) {
      let dragIndex = monitor.getItem().index;
      if (
        monitor.getItemType() === "content" &&
        monitor.getItem().index === undefined
      ) {
        dragIndex = props.cards - 1;
      }
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = (findDOMNode(
        component
      )! as Element).getBoundingClientRect() as DOMRect;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const position =
        clientOffset!.y < hoverBoundingRect.y + hoverMiddleY ? "over" : "under";
      setTargetIndex(onDrag, index, position);
    }
  },

  drop(props: IProps, monitor: DropTargetMonitor, component: Card) {
    const type = monitor.getItemType();
    if (type === ItemTypes.COLUMN) {
      props.pushPresentBlockToTargetIndex(monitor.getItem().index);
    } else if (type === ItemTypes.ROW) {
      props.pushNewBlockToTargetIndex(monitor.getItem());
    }
  }
};

const cardSource = {
  beginDrag(props: IProps, monitor: DragSourceMonitor, component: Card) {
    props.masterCallback("onDrag", "columnList");
    return { index: props.index };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component: Card) {
    props.masterCallback("onDrag", null);
    return { index: props.index };
  }
};

interface IProps {
  cards: number;
  index: number;
  device: "PHONE" | "TABLET" | "DESKTOP";

  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number[] | number
  ) => void;
  handleDrop: (hoverItem: any, hoverIndex: number[] | number) => void;
  moveCard: any;
  selectedIndex: number[] | number | null;
  hoveredIndex: number[] | number | null;
  onDrag: any;
  masterCallback: any;
  handleSetState: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  setTargetIndex: any;
}

interface IState {
  hover: boolean;
  active: boolean;
  toolHover: boolean;
}

interface IDnDProps {
  // React-dnd props
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
  connectDropTarget?: ConnectDropTarget;
  connectDragPreview: ConnectDragPreview;
  isOver?: boolean;
}

class Card extends React.Component<IProps & IDnDProps, IState> {
  constructor(props: IProps & IDnDProps) {
    super(props);
    this.state = {
      hover: false,
      active: false,
      toolHover: false
    };
  }

  public componentDidMount() {
    const { connectDragPreview } = this.props;
    const img = new Image();
    img.onload = () => connectDragPreview && connectDragPreview(img);
    img.src =
      "http://iconbug.com/data/ab/48/2d2ce45a67022a830dfd8692ec75c8b1.png";
  }

  /* In case, Mouse Over Container */
  public handleOnMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("mouseover", this.props.index);
  };

  /* In case, Mouse Down Container */
  public handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("select", this.props.index);
  };

  /* In case, Mouse Leave Container */
  public handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("mouseleave", this.props.index);
  };

  /* In case, Mouse Over ToolBox */
  public handleOnMouseOverTool = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      toolHover: true
    });
  };

  /* In case, Mouse Leave ToolBox */
  public handleOnMouseLeaveTool = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.setState({
      toolHover: false
    });
  };

  public render() {
    const {
      index,
      callbackfromparent,
      selectedIndex,
      hoveredIndex,
      isDragging,
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      device
    } = this.props;
    const opacity = isDragging ? 0.2 : 1;
    const hover = hoveredIndex === index;
    const active = selectedIndex === index;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDropTarget(
        connectDragPreview(
          <div
            className={classnames(
              "frame",
              hover ? "blockHover" : null,
              active ? "blockActive" : null
            )}
            style={{
              backgroundColor: "transparent",
              width: device === "DESKTOP" ? "100%" : "100%",
              maxWidth: "800px",
              position: "relative",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity,
              transition:
                "border 0.5s ease, opacity 0.5s ease, width 0.2s ease",
              borderRadius: "2px"
            }}
            onMouseOver={this.handleOnMouseOver}
            onMouseDown={this.handleOnMouseDown}
            onMouseLeave={this.handleOnMouseLeave}
          >
            {hover || active ? (
              <div>
                {this.state.toolHover ? (
                  <Tool onMouseLeave={this.handleOnMouseLeaveTool}>
                    <Button
                      onClick={() => {
                        callbackfromparent("delete", index);
                      }}
                      style={{
                        borderTopLeftRadius: "100%",
                        borderBottomLeftRadius: "100%"
                      }}
                    >
                      <i className="fas fa-trash-alt" />
                    </Button>
                    <Button
                      onClick={() => {
                        callbackfromparent("duplicate", index);
                      }}
                    >
                      <i className="far fa-copy" />
                    </Button>
                    {connectDragSource(
                      <div>
                        <Button>
                          <i className="fas fa-arrows-alt" />
                        </Button>
                      </div>
                    )}
                  </Tool>
                ) : (
                  <Handle onMouseOver={this.handleOnMouseOverTool}>
                    <i className="fas fa-ellipsis-h" />
                  </Handle>
                )}
              </div>
            ) : null}
            {this.props.children}
          </div>
        )
      )
    );
  }
}

export default flow(
  DropTarget(
    [ItemTypes.COLUMN, ItemTypes.ROW],
    cardTarget,
    (connect: DropTargetConnector, monitor: DropTargetMonitor): object => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    })
  ),
  DragSource(
    ItemTypes.COLUMN,
    cardSource,
    (connect: DragSourceConnector, monitor: DragSourceMonitor): object => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    })
  )
)(Card);
