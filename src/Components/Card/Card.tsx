import React from "react";
import {
  DragSource,
  DropTarget,
  DropTargetMonitor,
  DragSourceMonitor,
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget
} from "react-dnd";
import ItemTypes from "../../ItemTypes";
import classnames from "classnames";
import styled from "styled-components";
import EditorDefaults from "../../EditorDefaults";
import { findDOMNode } from "react-dom";
import flow from "lodash/flow";
import { RenderNodeProps, RenderMarkProps } from "slate-react";

const Handle = styled.div`
  background-color: #9c88ff;
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
  margin-left: -2px;
  right: 0px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: #9c88ff;
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
  margin-left: -2px;
  right: 0px;
`;

interface IBuilderProps {
  state: "ISOVER" | "ONDRAG" | null;
  position: "over" | "under";
}

const Builder = styled<IBuilderProps, any>("div")`
  position: absolute;
  z-index: ${props => (props.state === "ISOVER" ? "999" : null)};
  top: ${props => (props.position === "over" ? "-4px" : null)};
  bottom: ${props => (props.position === "under" ? "-4px" : null)};
  text-align: center;
  color: white;
  background-color: ${props => {
    switch (props.state) {
      case "ONDRAG":
        return EditorDefaults.BUILDER_ONDRAG_COLOR;
      case "ISOVER":
        return EditorDefaults.BUILDER_ISOVER_COLOR;
      default:
        return "transparent";
    }
  }};
  border-radius: 5px;
  font-size: 12px;
  padding: 2px 10px;
  transition: background-color 0.5s ease;
  width: 100%;
`;

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: Card) {
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

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = (findDOMNode(
        component
      )! as Element).getBoundingClientRect() as DOMRect;

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverpageY = clientOffset!.y - hoverBoundingRect.top;

      const position =
        clientOffset!.y < hoverBoundingRect.y + hoverMiddleY ? "over" : "under";

      if (position === "over") {
        component.setState({ hoverPosition: "over" });
      } else if (position === "under") {
        component.setState({ hoverPosition: "under" });
      }

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverpageY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverpageY > hoverMiddleY) {
        return;
      }
    }
  },

  drop(props: IProps, monitor: DropTargetMonitor, component: Card) {
    component.setState({ hoverPosition: null });
    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component
    )! as Element).getBoundingClientRect() as DOMRect;

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    const dropPosition =
      clientOffset!.y < hoverBoundingRect.y + hoverMiddleY ? "over" : "under";

    const type = monitor.getItemType();

    props.masterCallback("OnDrag", null);
    if (type === ItemTypes.COLUMN) {
      let index = props.index;
      if (dropPosition === "over") {
        index -= 1;
        props.moveCard(monitor.getItem().index, index);
      } else if (dropPosition === "under") {
        props.moveCard(monitor.getItem().index, index);
      }
    } else if (type === ItemTypes.ROW) {
      let index = props.index;
      if (dropPosition === "over") {
        props.handleDrop(monitor.getItem(), index);
      } else if (dropPosition === "under") {
        index += 1;
        props.handleDrop(monitor.getItem(), index);
      }
    }
  }
};

const cardSource = {
  beginDrag(props: IProps, monitor: DragSourceMonitor, component: Card) {
    props.masterCallback("OnDrag", "columnList");
    return { index: props.index };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component: Card) {
    props.masterCallback("OnDrag", null);
    return { index: props.index };
  }
};

interface IProps {
  cards: number;
  index: number;

  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number[] | number
  ) => void;
  handleDrop: (hoverItem: any, hoverIndex: number[] | number) => void;
  moveCard: any;
  handleOnChange: any;
  renderNode: RenderNodeProps;
  renderMark: RenderMarkProps;
  selectedIndex: number[] | number;
  hoveredIndex: number[] | number;
  OnDrag: any;
  masterCallback: any;

  connectDragPreview?: ConnectDragPreview;
}

interface IState {
  hover: boolean;
  active: boolean;
  toolHover: boolean;
  hoverPosition: "over" | "under" | null;
}

interface IDnDProps {
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
      toolHover: false,
      hoverPosition: null
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
      isOver
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
              width: "99%",
              position: "relative",
              padding: "0.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity,
              transition: "border 0.5s ease, opacity 0.5s ease",
              border: active
                ? "2px solid black"
                : hover
                  ? "2px solid grey"
                  : "2px solid transparent"
            }}
            onMouseOver={this.handleOnMouseOver}
            onMouseDown={this.handleOnMouseDown}
            onMouseLeave={this.handleOnMouseLeave}
          >
            <Builder
              // display={this.props.OnDrag === "columnList"}
              state={
                this.props.OnDrag === "columnList"
                  ? this.state.hoverPosition === "over" && isOver
                    ? "ISOVER"
                    : "ONDRAG"
                  : "INVISIBLE"
              }
              position="over"
            />
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
            <Builder
              // display={this.props.OnDrag === "columnList"}
              state={
                this.props.OnDrag === "columnList"
                  ? this.state.hoverPosition === "under" && isOver
                    ? "ISOVER"
                    : "ONDRAG"
                  : "INVISIBLE"
              }
              position="under"
            />
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
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    })
  ),
  DragSource(ItemTypes.COLUMN, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)(Card);
