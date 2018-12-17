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
  DragSourceConnector
} from "react-dnd";
import ItemTypes from "src/ItemTypes";
import classnames from "classnames";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Icon } from "antd";

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

const cardSource = {
  beginDrag(
    props: IProps,
    monitor: DragSourceMonitor,
    component: ImageContent
  ) {
    console.log(component);
    const node = findDOMNode(component) as Element;
    const rect = node ? (node.getBoundingClientRect() as DOMRect) : null;

    props.masterCallback("isDragging", true);
    props.masterCallback("unselect");
    return {
      index: props.index,
      type: "Image",
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

const ImageContentWrapper = styled.div`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
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

interface IProps {
  index: number;
  contents: IImageContents;
  handleOnChange?: any;
  selected?: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  callbackfromparent: any;
  handleOnClickImageChange: any;
  masterCallback: any;
  setInitialImageContents: any;
  changeImageSizeFromCurrentToTarget: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  setTargetIndex: any;
  scrollWrapperRef: any;
}

interface IState {
  toolbarState: "follow" | "sticky" | "blind";
  isOnLoad: boolean;
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

class ImageContent extends React.Component<IProps & IDnDSourceProps, IState> {
  imgEl: any;
  dragSource: any;
  wrapperRef: any;
  constructor(props: IProps & IDnDSourceProps) {
    super(props);
    this.imgEl = React.createRef();
    this.dragSource = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      toolbarState: "follow",
      isOnLoad: false
    };
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

  componentDidMount() {
    console.log(`didmount`);
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
    console.log(`unmount`);
  }

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

  public render() {
    const {
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
      changeImageSizeFromCurrentToTarget
    } = this.props;

    const { toolbarState, isOnLoad } = this.state;
    const {
      imageUrl,
      style,
      description,
      currentImageWidth,
      currentImageHeight
    } = contents;
    const hover: boolean = hoveredIndex === index;
    const active: boolean = selectedIndex === index;
    // if (selected) {
    //   document.addEventListener("mousedown", this.handleClickOutside);
    //   this.props.scrollWrapperRef.current.addEventListener(
    //     "scroll",
    //     this.handleScrollFn
    //   );
    // } else {
    //   document.removeEventListener("mousedown", this.handleClickOutside);
    //   if (this.props.scrollWrapperRef.current !== null)
    //     this.props.scrollWrapperRef.current.removeEventListener(
    //       "scroll",
    //       this.handleScrollFn
    //     );
    // }
    console.log(currentImageWidth, currentImageHeight);
    return (
      <ImageContentWrapper
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
          onMouseDown={isOnLoad ? this.handleOnMouseDown : undefined}
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
                          handleOnClickImageChange={handleOnClickImageChange}
                          handleOnChange={handleOnChange}
                          index={index}
                          key={i}
                          contents={contents}
                          changeImageSizeFromCurrentToTarget={
                            changeImageSizeFromCurrentToTarget
                          }
                        />
                      </ButtonItem>
                    );
                  })}
                </ButtonWrapper>
              </ButtonContainer>
            </Toolbar>
          </ToolbarWrapper>
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
              width: style === "fullWidth" ? "100%" : undefined,
              opacity: isOnLoad ? 1 : 0.5
            }}
            src={imageUrl}
            alt="logo"
            ref={(e: any) => (this.imgEl = e)}
            onLoad={() => {
              console.log(this.imgEl);
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
              this.setState({ isOnLoad: true });
            }}
          />
          {!isOnLoad && (
            <Icon
              style={{
                top: "35%",
                left: "50%",
                position: "absolute",
                zIndex: 4,
                fontSize: 50,
                marginLeft: -25
              }}
              type="loading"
            />
          )}
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
    );
  }
}

export default DragSource<IProps, IDnDSourceProps>(
  ItemTypes.CARD,
  cardSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  })
)(ImageContent);
