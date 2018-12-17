import * as React from "react";
import styled from "styled-components";
import flow from "lodash/flow";
import Delete from "src/Components/BlockIcons/Delete";
import {
  DropTarget,
  DragSource,
  DragSourceConnector,
  DropTargetConnector,
  DragSourceMonitor,
  DropTargetMonitor,
  ConnectDropTarget,
  ConnectDragSource,
  ConnectDragPreview
} from "react-dnd";
import ItemTypes from "src/ItemTypes";
import classnames from "classnames";
import { findDOMNode } from "react-dom";

const icons = [Delete];

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: DividerContent) {
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    console.log(`hover`);
    if (isJustOverThisOne) {
      const dragIndex = monitor.getItem().index;
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
      console.log(hoverBoundingRect);
      const position =
        clientOffset!.y < hoverBoundingRect.y + hoverMiddleY ? "over" : "under";
      props.setTargetIndex(props.index, position);
    }
  },

  drop(props: IProps, monitor: DropTargetMonitor, component: DividerContent) {
    const type = monitor.getItemType();
    const item = monitor.getItem();
    if (type === ItemTypes.CARD) {
      props.pushPresentBlockToTargetIndex(item.index);
    } else if (type === ItemTypes.CONTENT) {
      props.pushNewBlockToTargetIndex(item);
    }
  }
};

const cardSource = {
  beginDrag(
    props: IProps,
    monitor: DragSourceMonitor,
    component: DividerContent
  ) {
    const node = findDOMNode(component) as Element;
    const rect = node ? (node.getBoundingClientRect() as DOMRect) : null;

    props.masterCallback("isDragging", true);
    props.masterCallback("unselect");
    return {
      index: props.index,
      Comp: component,
      width: rect && rect.width,
      height: rect && rect.height
    };
  },
  endDrag(
    props: IProps,
    monitor: DragSourceMonitor,
    component?: DividerContent
  ) {
    props.masterCallback("isDragging", false);
    props.masterCallback("unselect");
    return { index: props.index, Comp: component };
  }
};

const DragSourceArea = styled.div`
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.08);
  transition-property: opacity, background;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IDividerContentFrameProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
  isFirstBlock: boolean;
}

const DividerContentFrame = styled<IDividerContentFrameProps, any>("div")`
  margin-top: ${props =>
    props.isFirstBlock ? "0px" : props.device === "PHONE" ? "35px" : "40px"};
`;

interface IDividerContentContainerProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const DividerContentContainer = styled<IDividerContentContainerProps, any>(
  "div"
)`
  position: relative;
  max-width: ${props => (props.device === "DESKTOP" ? "886px" : "640px")};
  width: ${props => (props.device === "PHONE" ? "auto" : "100%")};
  margin: 0 auto;
  padding-left: ${props => (props.device === "PHONE" ? "20px" : null)};
  padding-right: ${props => (props.device === "PHONE" ? "20px" : null)};
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

const DividerContentWrapper = styled.div`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IDividerContainerProps {
  DividerStyle:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
  currentDividerWidth: number;
  currentDividerHeight: number;
}

const DividerContainer = styled<IDividerContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  padding: 5px 0;
`;

interface IToolbarWrapperProps {
  toolbarState: "follow" | "sticky" | "blind";
}

const ToolbarWrapper = styled<IToolbarWrapperProps, any>("div")`
  visibility: ${props => (props.toolbarState === "blind" ? "hidden" : null)};
  max-width: ${props => (props.toolbarState === "sticky" ? null : "886px")};
  position: ${props => (props.toolbarState === "sticky" ? "sticky" : "static")};
  top: 0px;
  width: 100%;
  margin: 0 auto;
  z-index: 1000;
`;

interface IToolbarProps {
  toolbarState: "follow" | "sticky" | "blind";
}

const Toolbar = styled<IToolbarProps, any>("div")`
  width: 100%;
  position: absolute;
  top: ${props => (props.toolbarState === "sticky" ? "-1px" : "-43px")};
  left: -10px;
  height: 0;
  margin: auto;
  z-index: 1000;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
  word-break: normal;
`;

const ButtonContainer = styled.div`
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition-duration: 70ms;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-property: visibility, opacity, clip, transform;
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  position: absolute;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;

  word-break: normal;
`;

interface IButtonWrapperProps {
  toolbarState: "follow" | "sticky" | "blind";
}

const ButtonWrapper = styled<IButtonWrapperProps, any>("ul")`
  transform: ${props =>
    props.toolbarState === "sticky" ? "translateY(0)" : null};
  visibility: visible;
  opacity: 1;
  background-color: #fff;
  border: 1px solid #cecece;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IButtonItemProps {
  index: number;
}

const ButtonItem = styled<IButtonItemProps, any>("div")`
  border-right: ${props =>
    props.index === 0 ||
    props.index === 1 ||
    props.index === 5 ||
    props.index === 6
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
`;

const DividerLine = styled.hr`
  width: 100%;
  border-top: 1px solid grey;
`;

interface IDividerContents {
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

interface IProps {
  // 공통
  masterCallback: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  contents: IDividerContents;
  index: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
  setTargetIndex: any;
  selected: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  scrollWrapperRef: any;
  callbackfromparent: any;
  // 개별
}

interface IDnDTargetProps {
  // React-dnd props
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

interface IDnDSourceProps {
  // React-dnd props
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

class DividerContent extends React.Component<
  IProps & IDnDTargetProps & IDnDSourceProps,
  any
> {
  dragSource: any;
  wrapperRef: any;
  constructor(props: IProps & IDnDTargetProps & IDnDSourceProps) {
    super(props);
    this.dragSource = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      toolbarState: "follow"
    };
  }

  /* In case, Mouse Over Container */
  public handleOnMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("mouseover", this.props.index);
  };

  /* In case, Mouse Don Container */
  public handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("select", this.props.index);
    document.addEventListener("mousedown", this.handleClickOutside);
    this.props.scrollWrapperRef.current.addEventListener(
      "scroll",
      this.handleScrollFn
    );
  };

  /* In case, Mouse Leave Container */
  public handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("mouseleave", this.props.index);
  };

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  handleClickOutside(event: any) {
    console.log(this.wrapperRef);
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log(this.props.selectedIndex === this.props.index);
      if (this.props.selectedIndex === this.props.index) {
        this.props.masterCallback("unselect");
        document.removeEventListener("mousedown", this.handleClickOutside);
        if (this.props.scrollWrapperRef.current !== null)
          this.props.scrollWrapperRef.current.removeEventListener(
            "scroll",
            this.handleScrollFn
          );
      }
    }
  }

  public handleScrollFn = () => {
    const rect = (findDOMNode(
      this.wrapperRef
    )! as Element).getBoundingClientRect() as DOMRect;
    console.log(
      rect.top,
      rect.bottom,
      this.state.toolbarState,
      rect.bottom < 60
    );
    if (rect.bottom < 60) {
      this.setState({ toolbarState: "blind" });
    } else if (rect.top < 150) {
      this.setState({ toolbarState: "sticky" });
    } else {
      this.setState({ toolbarState: "follow" });
    }
  };

  public render() {
    const {
      index,
      device,
      hoveredIndex,
      selectedIndex,
      callbackfromparent,
      selected,
      contents
    } = this.props;
    const { connectDropTarget, isDragging, connectDragSource } = this.props;
    const { toolbarState } = this.state;
    const { style } = contents;
    const hover: boolean = hoveredIndex === index;
    const active: boolean = selectedIndex === index;
    return (
      <DividerContentFrame
        isFirstBlock={index === 0}
        device={device}
        innerRef={(instance: any) => connectDropTarget(instance)}
      >
        <DividerContentContainer device={device}>
          <DividerContentWrapper
            innerRef={(instance: any) => this.setWrapperRef(instance)}
          >
            <DragSourceArea
              className={classnames(
                "container",
                hover && !isDragging ? "blockHover" : null,
                active && !isDragging ? "blockActive" : null
              )}
              innerRef={(instance: any) => connectDragSource(instance)}
              onMouseOver={this.handleOnMouseOver}
              onMouseDown={this.handleOnMouseDown}
              onMouseLeave={this.handleOnMouseLeave}
            />
            {selected && (
              <ToolbarWrapper toolbarState={toolbarState}>
                <Toolbar toolbarState={toolbarState}>
                  <ButtonContainer>
                    <ButtonWrapper toolbarState={toolbarState}>
                      {icons.map((Type, i) => {
                        return (
                          <ButtonItem key={i} index={i}>
                            <Type
                              callbackfromparent={callbackfromparent}
                              index={index}
                              key={i}
                            />
                          </ButtonItem>
                        );
                      })}
                    </ButtonWrapper>
                  </ButtonContainer>
                </Toolbar>
              </ToolbarWrapper>
            )}
            <DividerContainer className="content" DividerStyle={style}>
              <DividerLine />
            </DividerContainer>
          </DividerContentWrapper>
        </DividerContentContainer>
      </DividerContentFrame>
    );
  }
}

export default flow(
  DropTarget<IProps, IDnDTargetProps>(
    [ItemTypes.CARD, ItemTypes.CONTENT],
    cardTarget,
    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    })
  ),
  DragSource<IProps, IDnDSourceProps>(
    ItemTypes.CARD,
    cardSource,
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging(),
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview()
    })
  )
)(DividerContent);
