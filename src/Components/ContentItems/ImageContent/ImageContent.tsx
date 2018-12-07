import * as React from "react";
import styled from "styled-components";
import Delete from "src/Components/BlockIcons/Delete";
import ImageChange from "src/Components/BlockIcons/ImageChange";
import SizeChange from "src/Components/BlockIcons/SizeChange";
import FullWidth from "src/Components/BlockIcons/FullWidth";
import AlignLeft from "src/Components/BlockIcons/AlignLeft";
import AlignCenter from "src/Components/BlockIcons/AlignCenter";
import AlignRight from "src/Components/BlockIcons/AlignRight";
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

const icons = [
  ImageChange,
  SizeChange,
  FullWidth,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Delete
];

const cardSource = {
  beginDrag(
    props: IProps,
    monitor: DragSourceMonitor,
    component: ImageContent
  ) {
    props.masterCallback("isDragging", true);
    props.masterCallback("unselect");
    return { index: props.index, Comp: component };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component?: ImageContent) {
    props.masterCallback("isDragging", false);
    props.masterCallback("unselect");
    return { index: props.index, Comp: component };
  }
};

interface IToolbarProps {
  isNearbyTop: boolean;
}

const Toolbar = styled<IToolbarProps, any>("div")`
  transform: ${props => (props.isNearbyTop ? "translateX(-10px)" : null)};
  top: ${props => (props.isNearbyTop ? "125px" : "0px")};
  position: ${props => (props.isNearbyTop ? "fixed" : "static")};
  max-width: ${props => (props.isNearbyTop ? "886px" : null)};
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
  currWidth: number;
  currHeight: number;
}

const ImageContainer = styled<IImageContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  max-width: ${props =>
    props.imageStyle === "fullWidth" ? null : `${props.currWidth}px`};
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
  top: -38px;
  left: -1px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

interface IImageButtonProps {
  index: number;
}

const ImageButton = styled<IImageButtonProps, any>("div")`
  &:hover {
    background-color: #ebebeb;
  }
  border-right: ${props =>
    props.index === 0 || props.index === 1 || props.index === 5
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
  &:focus {
    outline: none;
  }
`;

const DragSourceArea = styled.div`
  opacity: 1;
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
  contents: IImageContents;
  handleOnChange?: any;
  selected?: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  callbackfromparent: any;
  handleOnClickImageChange: any;
  editorRef: any;
  masterCallback: any;
}

interface IState {
  width: number;
  height: number;
  isNearbyTop: boolean;
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
}

class ImageContent extends React.Component<IProps & IDnDSourceProps, IState> {
  imgEl: any;
  constructor(props: IProps & IDnDSourceProps) {
    super(props);
    this.imgEl = React.createRef();
    this.state = {
      width: 0,
      height: 0,
      isNearbyTop: false
    };
  }

  public handleImageWidth = (value: any) => {
    this.setState({ width: value });
    this.imgEl.width = value;
  };

  public handleImageHeight = (value: any) => {
    this.setState({ height: value });
    this.imgEl.height = value;
  };

  public handleScrollFn = () => {
    const rect = (findDOMNode(
      this.imgEl
    )! as Element).getBoundingClientRect() as DOMRect;
    console.log(rect);
    if (rect.top < 150) {
      this.setState({ isNearbyTop: true });
    } else {
      this.setState({ isNearbyTop: false });
    }
  };

  componentDidMount() {
    console.log(this.props.editorRef);
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

  public render() {
    const {
      contents,
      selected,
      hoveredIndex,
      selectedIndex,
      index,
      handleOnChange,
      callbackfromparent,
      handleOnClickImageChange,
      connectDragSource,
      isDragging
    } = this.props;
    const { width, height, isNearbyTop } = this.state;
    const { imageUrl, style, description } = contents;

    const hover: boolean = hoveredIndex === index;
    const active: boolean = selectedIndex === index;
    return (
      <>
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
          <Toolbar isNearbyTop={isNearbyTop} className="toolbar">
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
                      height={height}
                      width={width}
                      handleImageWidth={this.handleImageWidth}
                      handleImageHeight={this.handleImageHeight}
                      // className="toolbar-item"
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
          currWidth={width}
          currHeight={height}
        >
          <img
            style={{
              maxWidth: style === "fullWidth" ? "inherit" : "100%",
              position: "relative",
              verticalAlign: "top",
              height: "100%",
              width: style === "fullWidth" ? "100%" : "auto"
            }}
            src={imageUrl}
            alt="logo"
            ref={(e: any) => (this.imgEl = e)}
            onLoad={() => {
              this.setState(
                {
                  width: this.imgEl.naturalWidth,
                  height: this.imgEl.naturalHeight
                },
                () => {
                  if (this.state.width > 886) {
                    handleOnChange("fullWidth", index, "style");
                  } else {
                    handleOnChange("alignLeft", index, "style");
                  }
                }
              );
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
      </>
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
