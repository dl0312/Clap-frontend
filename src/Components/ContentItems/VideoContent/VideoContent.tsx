import * as React from "react";
import styled from "styled-components";
import FullWidth from "src/Components/BlockIcons/FullWidth";
import AlignLeft from "src/Components/BlockIcons/AlignLeft";
import AlignCenter from "src/Components/BlockIcons/AlignCenter";
import AlignRight from "src/Components/BlockIcons/AlignRight";
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
import ReactPlayer from "react-player";

const icons = [FullWidth, AlignLeft, AlignCenter, AlignRight, Delete];

const cardSource = {
  beginDrag(
    props: IProps,
    monitor: DragSourceMonitor,
    component: VideoContent
  ) {
    console.log(component);
    const node = findDOMNode(component) as Element;
    const rect = node ? (node.getBoundingClientRect() as DOMRect) : null;

    props.masterCallback("isDragging", true);
    props.masterCallback("unselect");
    return {
      index: props.index,
      type: "Video",
      Comp: component,
      width: rect && rect.width,
      height: rect && rect.height
    };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component?: VideoContent) {
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

const VideoContentWrapper = styled.div`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IVideoContainerProps {
  VideoStyle: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
  currentVideoWidth: number;
  currentVideoHeight: number;
}

const VideoContainer = styled<IVideoContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  max-width: ${props =>
    props.VideoStyle === "fullWidth" ? null : `${props.currentVideoWidth}px`};
  margin-left: ${props =>
    props.VideoStyle === "alignCenter" || props.VideoStyle === "alignRight"
      ? "auto"
      : null};
  margin-right: ${props =>
    props.VideoStyle === "alignCenter" || props.VideoStyle === "alignLeft"
      ? "auto"
      : null};
  width: ${props => (props.VideoStyle === "fullWidth" ? "100%" : "66.7%")};
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
    props.index === 3 ? "1px solid rgba(0, 0, 0, 0.1)" : null};
`;

interface IDescriptionContainerProps {
  VideoStyle: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

const DescriptionContainer = styled<IDescriptionContainerProps, any>("div")`
  position: relative;
  text-align: ${props =>
    props.VideoStyle === "fullWidth"
      ? "center"
      : props.VideoStyle === "alignLeft"
      ? "left"
      : props.VideoStyle === "alignCenter"
      ? "center"
      : props.VideoStyle === "alignRight"
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
  contents: IVideoContents;
  handleOnChange: any;
  selected: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  callbackfromparent: any;
  masterCallback: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  setTargetIndex: any;
  scrollWrapperRef: any;
}

interface IState {
  toolbarState: "follow" | "sticky" | "blind";
}

interface IDnDSourceProps {
  // React-dnd props
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

interface IVideoContents {
  slateData?: any;
  videoUrl: string;
  description: string;
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

class VideoContent extends React.Component<IProps & IDnDSourceProps, IState> {
  dragSource: any;
  wrapperRef: any;
  constructor(props: IProps & IDnDSourceProps) {
    super(props);
    this.dragSource = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      toolbarState: "follow"
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
    const { connectDragPreview } = this.props;
    console.log(connectDragPreview);
    if (connectDragPreview) {
      // Use empty Video as a drag preview so browsers don't draw it
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
      connectDragSource,
      isDragging
    } = this.props;

    const { toolbarState } = this.state;
    const { videoUrl, style, description } = contents;
    const hover: boolean = hoveredIndex === index;
    const active: boolean = selectedIndex === index;
    return (
      <VideoContentWrapper
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
                  {icons.map((Type: any, i) => {
                    return (
                      <ButtonItem key={i} index={i}>
                        <Type
                          callbackfromparent={callbackfromparent}
                          handleOnChange={handleOnChange}
                          index={index}
                          key={i}
                          contents={contents}
                        />
                      </ButtonItem>
                    );
                  })}
                </ButtonWrapper>
              </ButtonContainer>
            </Toolbar>
          </ToolbarWrapper>
        )}
        <VideoContainer className="content" VideoStyle={style}>
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%"
            }}
          >
            <ReactPlayer
              title="react-player"
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0
              }}
              url={videoUrl}
              frameBorder="0"
              allowFullScreen={true}
              youtubeConfig={{
                playerVars: { showinfo: 1 },
                preload: true
              }}
            />
          </div>
          {!description && !selected ? null : (
            <DescriptionContainer VideoStyle={style}>
              <Description
                value={description}
                onChange={(e: any) =>
                  handleOnChange(e.target.value, index, "description")
                }
                placeholder="Video Description"
              />
            </DescriptionContainer>
          )}
        </VideoContainer>
      </VideoContentWrapper>
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
)(VideoContent);
