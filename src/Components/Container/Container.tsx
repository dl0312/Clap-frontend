import * as React from "react";
import TextContent from "../ContentItems/TextContent";
import ImageContent from "../ContentItems/ImageContent";
import VideoContent from "../ContentItems/VideoContent";
import DividerContent from "../ContentItems/DividerContent";

import { EditorState } from "draft-js";
import styled from "styled-components";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from "react-dnd";
import ItemTypes from "src/ItemTypes";
import { findDOMNode } from "react-dom";

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: Container) {
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

  drop(props: IProps, monitor: DropTargetMonitor, component: Container) {
    const type = monitor.getItemType();
    const item = monitor.getItem();
    if (type === ItemTypes.CARD) {
      props.pushPresentBlockToTargetIndex(item.index);
    } else if (type === ItemTypes.CONTENT) {
      props.pushNewBlockToTargetIndex(item);
    }
  }
};

interface IContentFrameProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
  isFirstBlock: boolean;
}

const ContentFrame = styled<IContentFrameProps, any>("div")`
  /* padding: ${props => (props.device === "PHONE" ? "7px 0" : "10px 0")}; */
  padding :10px 0;
`;

interface IContentContainerProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const ContentContainer = styled<IContentContainerProps, any>("div")`
  position: relative;
  max-width: ${props =>
    props.device === "DESKTOP"
      ? "886px"
      : props.device === "TABLET"
      ? "640px"
      : "360px"};
  width: ${props => (props.device === "PHONE" ? "auto" : "100%")};
  margin: 0 auto;
  padding-left: ${props => (props.device === "PHONE" ? "20px" : null)};
  padding-right: ${props => (props.device === "PHONE" ? "20px" : null)};
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IProps {
  // Action to Parent Component
  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number
  ) => void;
  masterCallback: any;
  moveCard: any;
  handleDrop: (hoverItem: any, hoverIndex: number) => void;
  handleOnChange: any;
  index: number;
  type: "Text" | "Image" | "Video" | "Table" | "Divider";
  contents: ITextContents & IImageContents & IVideoContents & IDividerContents;
  // // For Content Render
  selectedIndex: number | null;
  hoveredIndex: number | null;
  // onDrag: "content" | "columnList";
  // contentWidth: number;
  // renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  // renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
  setTargetIndex: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  handleOnClickImageChange: any;
  setInitialImageContents: any;
  changeImageSizeFromCurrentToTarget: any;
  gameId: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
  wikiRef: any;
  scrollWrapperRef: any;
  activeEditorRef: any;
}

interface IDnDTargetProps {
  // React-dnd props
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

interface ITextContents {
  editorState: EditorState;
  style: "alignLeft" | "alignCenter" | "alignRight" | "alignJustify";
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

interface IVideoContents {
  slateData?: any;
  videoUrl: string;
  description: string;
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

interface IDividerContents {
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

class Container extends React.Component<IProps & IDnDTargetProps, any> {
  constructor(props: IProps & IDnDTargetProps) {
    super(props);
  }

  public showInner = (selected: boolean) => {
    switch (this.props.type) {
      case "Image":
        return (
          <ImageContent
            index={this.props.index}
            selected={selected}
            hoveredIndex={this.props.hoveredIndex}
            selectedIndex={this.props.selectedIndex}
            contents={this.props.contents}
            handleOnChange={this.props.handleOnChange}
            callbackfromparent={this.props.callbackfromparent}
            handleOnClickImageChange={this.props.handleOnClickImageChange}
            masterCallback={this.props.masterCallback}
            setInitialImageContents={this.props.setInitialImageContents}
            changeImageSizeFromCurrentToTarget={
              this.props.changeImageSizeFromCurrentToTarget
            }
            pushPresentBlockToTargetIndex={
              this.props.pushPresentBlockToTargetIndex
            }
            pushNewBlockToTargetIndex={this.props.pushNewBlockToTargetIndex}
            setTargetIndex={this.props.setTargetIndex}
            scrollWrapperRef={this.props.scrollWrapperRef}
          />
        );
      case "Text":
        return (
          <TextContent
            index={this.props.index}
            contents={this.props.contents}
            selected={selected}
            hoveredIndex={this.props.hoveredIndex}
            selectedIndex={this.props.selectedIndex}
            handleOnChange={this.props.handleOnChange}
            callbackfromparent={this.props.callbackfromparent}
            masterCallback={this.props.masterCallback}
            pushPresentBlockToTargetIndex={
              this.props.pushPresentBlockToTargetIndex
            }
            pushNewBlockToTargetIndex={this.props.pushNewBlockToTargetIndex}
            setTargetIndex={this.props.setTargetIndex}
            gameId={this.props.gameId}
            wikiRef={this.props.wikiRef}
            scrollWrapperRef={this.props.scrollWrapperRef}
            activeEditorRef={this.props.activeEditorRef}
          />
        );
      case "Video":
        return (
          <VideoContent
            index={this.props.index}
            contents={this.props.contents}
            handleOnChange={this.props.handleOnChange}
            selected={selected}
            hoveredIndex={this.props.hoveredIndex}
            selectedIndex={this.props.selectedIndex}
            callbackfromparent={this.props.callbackfromparent}
            masterCallback={this.props.masterCallback}
            pushPresentBlockToTargetIndex={
              this.props.pushPresentBlockToTargetIndex
            }
            pushNewBlockToTargetIndex={this.props.pushNewBlockToTargetIndex}
            setTargetIndex={this.props.setTargetIndex}
            scrollWrapperRef={this.props.scrollWrapperRef}
          />
        );
      case "Divider":
        return (
          <DividerContent
            index={this.props.index}
            contents={this.props.contents}
            masterCallback={this.props.masterCallback}
            pushPresentBlockToTargetIndex={
              this.props.pushPresentBlockToTargetIndex
            }
            pushNewBlockToTargetIndex={this.props.pushNewBlockToTargetIndex}
            setTargetIndex={this.props.setTargetIndex}
            selected={selected}
            hoveredIndex={this.props.hoveredIndex}
            selectedIndex={this.props.selectedIndex}
            callbackfromparent={this.props.callbackfromparent}
            scrollWrapperRef={this.props.scrollWrapperRef}
          />
        );
      // case "Social":
      //   return <SocialMediaContent />;
      default:
        return null;
    }
  };

  public render() {
    const { index, selectedIndex, device, connectDropTarget } = this.props;
    let active: boolean = false;
    active = selectedIndex === index;
    return (
      <ContentFrame
        isFirstBlock={index === 0}
        device={device}
        innerRef={(instance: any) => connectDropTarget(instance)}
      >
        <ContentContainer device={device}>
          {this.showInner(active)}
        </ContentContainer>
      </ContentFrame>
    );
  }
  // public handleClickOutside = () => {
  //   this.props.masterCallback("deselect");
  // };
}

export default DropTarget<IProps, IDnDTargetProps>(
  [ItemTypes.CARD, ItemTypes.CONTENT],
  cardTarget,
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
)(Container);
