import * as React from "react";
import styled from "styled-components";
import ImageChange from "src/Components/BlockIcons/ImageChange";
import SizeChange from "src/Components/BlockIcons/SizeChange";
import FullWidth from "src/Components/BlockIcons/FullWidth";
import AlignLeft from "src/Components/BlockIcons/AlignLeft";
import AlignCenter from "src/Components/BlockIcons/AlignCenter";
import AlignRight from "src/Components/BlockIcons/AlignRight";
import Link from "src/Components/BlockIcons/Link";
import Duplicate from "src/Components/BlockIcons/Duplicate";
import Delete from "src/Components/BlockIcons/Delete";
import TextareaAutosize from "react-textarea-autosize";
import { findDOMNode } from "react-dom";
import {
  ConnectDragSource,
  ConnectDragPreview,
  DragSourceMonitor,
  DragSource,
  DragSourceConnector,
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector
} from "react-dnd";
import ItemTypes from "src/ItemTypes";
import classnames from "classnames";
import { getEmptyImage } from "react-dnd-html5-backend";
import flow from "lodash/flow";

const icons = [
  ImageChange,
  SizeChange,
  FullWidth,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Duplicate,
  Delete
];

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: ImageContent) {
    const isJustOverThisOne = monitor.isOver({ shallow: true });
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
      const position =
        clientOffset!.y < hoverBoundingRect.y + hoverMiddleY ? "over" : "under";
      props.setTargetIndex(props.index, position);
    }
  },

  drop(props: IProps, monitor: DropTargetMonitor, component: ImageContent) {
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
    component: ImageContent
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
  endDrag(props: IProps, monitor: DragSourceMonitor, component?: ImageContent) {
    props.masterCallback("isDragging", false);
    props.masterCallback("unselect");
    return { index: props.index, Comp: component };
  }
};

interface IImageContentFrameProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
  isFirstBlock: boolean;
}

const ImageContentFrame = styled<IImageContentFrameProps, any>("div")`
  margin-top: ${props =>
    props.isFirstBlock ? "0px" : props.device === "PHONE" ? "35px" : "40px"};
`;

interface IImageContentContainerProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const ImageContentContainer = styled<IImageContentContainerProps, any>("div")`
  position: relative;
  max-width: ${props => (props.device === "DESKTOP" ? "886px" : "640px")};
  width: ${props => (props.device === "PHONE" ? "auto" : "100%")};
  margin: 0 auto;
  padding-left: ${props => (props.device === "PHONE" ? "20px" : null)};
  padding-right: ${props => (props.device === "PHONE" ? "20px" : null)};
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

const ImageContentWrapper = styled.div`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IToolbarProps {
  toolbarState: "follow" | "sticky" | "blind";
}

const Toolbar = styled<IToolbarProps, any>("div")`
  visibility: ${props => (props.toolbarState === "blind" ? "hidden" : null)};
  top: ${props => (props.toolbarState === "sticky" ? "130px" : "130px")};
  position: ${props => (props.toolbarState === "sticky" ? "fixed" : "static")};
  max-width: ${props => (props.toolbarState === "sticky" ? null : "886px")};
  width: 100%;
  margin: 0 auto;
  z-index: 1000;
`;

interface IImageContainerProps {
  imageStyle:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
  currentImageWidth: number;
  currentImageHeight: number;
}

const ImageContainer = styled<IImageContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  max-width: ${props =>
    props.imageStyle === "fullWidth" ? null : `${props.currentImageWidth}px`};
  margin-left: ${props =>
    props.imageStyle === "alignCenter" || props.imageStyle === "alignRight"
      ? "auto"
      : null};
  margin-right: ${props =>
    props.imageStyle === "alignCenter" || props.imageStyle === "alignLeft"
      ? "auto"
      : null};
  width: ${props => (props.imageStyle === "fullWidth" ? "100%" : null)};
`;

const ImageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px 2px 0 0;
  line-height: 0px !important;
  background-color: #fff;
  position: absolute;
  z-index: 100;
  top: -43px;
  left: -10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

interface IImageButtonProps {
  index: number;
}

const ImageButton = styled<IImageButtonProps, any>("div")`
  border-right: ${props =>
    props.index === 0 ||
    props.index === 1 ||
    props.index === 5 ||
    props.index === 6
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
`;

interface IDescriptionContainerProps {
  imageStyle:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
}

const DescriptionContainer = styled<IDescriptionContainerProps, any>("div")`
  position: relative;
  text-align: ${props =>
    props.imageStyle === "fullWidth"
      ? "center"
      : props.imageStyle === "alignLeft"
      ? "left"
      : props.imageStyle === "alignCenter"
      ? "center"
      : props.imageStyle === "alignRight"
      ? "right"
      : null};
`;

const Description = styled(TextareaAutosize)`
  border: none;
  resize: none;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
  text-align: inherit;
  width: 100%;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const DragSourceArea = styled.div`
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.08);
  -webkit-transition-property: opacity, background;
  transition-property: opacity, background;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
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

interface IProps {
  index: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
  contents: IImageContents;
  handleOnChange?: any;
  selected?: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  callbackfromparent: any;
  handleOnClickImageChange: any;
  editorRef: any;
  masterCallback: any;
  setInitialImageContents: any;
  changeImageSizeFromCurrentToTarget: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  setTargetIndex: any;
}

interface IState {
  toolbarState: "follow" | "sticky" | "blind";
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

interface IImageContents {
  slateData?: any;
  imageUrl: string;
  description: string;
  isUploaded: boolean | null;
  link: string | null;
  libraryIndex: number;
  style:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
  naturalImageWidth: number;
  naturalImageHeight: number;
  currentImageWidth: number;
  currentImageHeight: number;
}

class ImageContent extends React.Component<
  IProps & IDnDSourceProps & IDnDTargetProps,
  IState
> {
  imgEl: any;
  dragSource: any;
  constructor(props: IProps & IDnDSourceProps & IDnDTargetProps) {
    super(props);
    this.imgEl = React.createRef();
    this.dragSource = React.createRef();
    this.state = {
      toolbarState: "follow"
    };
  }

  public handleScrollFn = () => {
    const rect = (findDOMNode(
      this.imgEl
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

  componentDidMount() {
    this.props.editorRef.current.addEventListener(
      "scroll",
      this.handleScrollFn
    );
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

  componentWillUnmount() {
    if (this.props.editorRef.current !== null)
      this.props.editorRef.current.removeEventListener(
        "scroll",
        this.handleScrollFn
      );
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
  };

  /* In case, Mouse Leave Container */
  public handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("mouseleave", this.props.index);
  };

  public render() {
    const {
      device,
      contents,
      selected,
      index,
      hoveredIndex,
      selectedIndex,
      handleOnChange,
      callbackfromparent,
      handleOnClickImageChange,
      connectDragSource,
      isDragging,
      setInitialImageContents,
      changeImageSizeFromCurrentToTarget,
      connectDropTarget
    } = this.props;

    const { toolbarState } = this.state;
    const {
      imageUrl,
      style,
      description,
      currentImageWidth,
      currentImageHeight
    } = contents;

    const hover: boolean = hoveredIndex === index;
    const active: boolean = selectedIndex === index;
    return (
      <ImageContentFrame
        isFirstBlock={index === 0}
        device={device}
        innerRef={(instance: any) => connectDropTarget(instance)}
      >
        <ImageContentContainer device={device}>
          <ImageContentWrapper>
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
              <Toolbar toolbarState={toolbarState} className="toolbar">
                <ImageButtonContainer>
                  {icons.map((Type, i) => {
                    return (
                      <ImageButton key={i} index={i}>
                        <Type
                          callbackfromparent={callbackfromparent}
                          handleOnClickImageChange={handleOnClickImageChange}
                          handleOnChange={handleOnChange}
                          index={index}
                          key={i}
                          contents={contents}
                          changeImageSizeFromCurrentToTarget={
                            changeImageSizeFromCurrentToTarget
                          }
                        />
                      </ImageButton>
                    );
                  })}
                </ImageButtonContainer>
              </Toolbar>
            )}
            <ImageContainer
              className="content"
              imageStyle={style}
              currentImageWidth={currentImageWidth}
              currentImageHeight={currentImageHeight}
            >
              <img
                width={currentImageWidth}
                height={currentImageHeight}
                style={{
                  maxWidth: style === "fullWidth" ? "inherit" : "100%",
                  position: "relative",
                  verticalAlign: "top",
                  height: "100%",
                  width: style === "fullWidth" ? "100%" : "100%"
                }}
                src={imageUrl}
                alt="logo"
                ref={(e: any) => (this.imgEl = e)}
                onLoad={() => {
                  if (this.imgEl.naturalWidth > 886) {
                    setInitialImageContents(
                      this.imgEl.naturalWidth,
                      this.imgEl.naturalHeight,
                      "fullWidth",
                      index
                    );
                  } else {
                    setInitialImageContents(
                      this.imgEl.naturalWidth,
                      this.imgEl.naturalHeight,
                      "alignLeft",
                      index
                    );
                  }
                }}
              />

              {!description && !selected ? null : (
                <DescriptionContainer imageStyle={style}>
                  <Description
                    value={description}
                    onChange={(e: any) =>
                      handleOnChange(e.target.value, index, "description")
                    }
                    placeholder="Image Description"
                  />
                </DescriptionContainer>
              )}
            </ImageContainer>
          </ImageContentWrapper>
        </ImageContentContainer>
      </ImageContentFrame>
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
)(ImageContent);
