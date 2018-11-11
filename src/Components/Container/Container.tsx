import * as React from "react";
import classnames from "classnames";
import ItemTypes from "../../ItemTypes";
import {
  DragSource,
  DropTarget,
  ConnectDragSource,
  ConnectDragPreview,
  ConnectDropTarget,
  DragSourceMonitor,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector
} from "react-dnd";

import { Value, ValueJSON } from "slate";
// import styled from "styled-components";
import flow from "lodash/flow";
// import EditorDefaults from "../../EditorDefaults";
// import ContentBox from "../ContentBox";

import ButtonContent from "../ContentItems/ButtonContent";
import TextContent from "../ContentItems/TextContent";
import DividerContent from "../ContentItems/DividerContent";
import HtmlContent from "../ContentItems/HtmlContent";
import ImageContent from "../ContentItems/ImageContent";
import VideoContent from "../ContentItems/VideoContent";
import SocialMediaContent from "../ContentItems/SocialMediaContent";

import {
  AlignCenterPlugin,
  AlignLeftPlugin,
  AlignRightPlugin
} from "@canner/slate-icon-align";
import { BlockquotePlugin } from "@canner/slate-icon-blockquote";
import { BoldPlugin } from "@canner/slate-icon-bold";
import { CleanPlugin } from "@canner/slate-icon-clean";
import { CodePlugin } from "@canner/slate-icon-code";
import { CodeBlockPlugin } from "@canner/slate-icon-codeblock";
// import Emoji, {EmojiPlugin} from '@canner/slate-icon-emoji';
import { FontBgColorPlugin } from "@canner/slate-icon-fontbgcolor";
import { FontColorPlugin } from "@canner/slate-icon-fontcolor";
import {
  HeaderOnePlugin,
  HeaderTwoPlugin,
  HeaderThreePlugin
} from "@canner/slate-icon-header";
import { HrPlugin } from "@canner/slate-icon-hr";
import { ImagePlugin } from "@canner/slate-icon-image";
import { ItalicPlugin } from "@canner/slate-icon-italic";
import { TablePlugin } from "@canner/slate-icon-table";
// import { TablePlugin } from "@canner/slate-icon-table";
import { LinkPlugin } from "@canner/slate-icon-link";
import { ListPlugin } from "@canner/slate-icon-list";
import { StrikeThroughPlugin } from "@canner/slate-icon-strikethrough";
import { UnderlinePlugin } from "@canner/slate-icon-underline";
import { RedoPlugin } from "@canner/slate-icon-redo";
import { VideoPlugin } from "@canner/slate-icon-video";

// select
// import { FontSizePlugin } from "@canner/slate-select-fontsize";
// import { LetterSpacingPlugin } from "@canner/slate-select-letterspacing";

// plugins
import { DEFAULT as DEFAULTLIST } from "@canner/slate-helper-block-list";
import { DEFAULT as DEFAULTBLOCKQUOTE } from "@canner/slate-helper-block-quote";
import EditList from "slate-edit-list";
import EditBlockquote from "slate-edit-blockquote";
import { ParagraphPlugin } from "@canner/slate-icon-shared";
import copyPastePlugin from "@canner/slate-paste-html-plugin";

import EditPrism from "slate-prism";
import EditCode from "slate-edit-code";
import TrailingBlock from "slate-trailing-block";
import EditTable from "slate-edit-table";
import { findDOMNode } from "react-dom";
import { RenderNodeProps, RenderMarkProps } from "slate-react";
import { getEmptyImage } from "react-dnd-html5-backend";

const plugins = [
  EditPrism({
    onlyIn: (node: any) => node.type === "code_block",
    getSyntax: (node: any) => node.data.get("syntax")
  }),
  EditCode({
    onlyIn: (node: any) => node.type === "code_block"
  }),
  TrailingBlock(),
  EditTable(),
  EditList(DEFAULTLIST),
  EditBlockquote(DEFAULTBLOCKQUOTE),
  AlignCenterPlugin(),
  AlignRightPlugin(),
  AlignLeftPlugin(),
  ParagraphPlugin(),
  BlockquotePlugin(),
  BoldPlugin(),
  CleanPlugin(),
  CodePlugin(),
  CodeBlockPlugin(),
  FontBgColorPlugin({
    backgroundColor: (mark: any) =>
      mark.data.get("color") && mark.data.get("color").color
  }),
  FontColorPlugin({
    color: (mark: any) => mark.data.get("color") && mark.data.get("color").color
  }),
  ItalicPlugin(),
  StrikeThroughPlugin(),
  UnderlinePlugin(),
  // FontSizePlugin(),
  // LetterSpacingPlugin(),
  TablePlugin(),
  // EmojiPlugin(),
  HeaderOnePlugin(),
  HeaderTwoPlugin(),
  HeaderThreePlugin(),
  RedoPlugin(),
  HrPlugin(),
  ImagePlugin(),
  LinkPlugin(),
  ListPlugin(),
  VideoPlugin(),
  copyPastePlugin()
];

const cardSource = {
  beginDrag(props: IProps, monitor: DragSourceMonitor, component: Container) {
    props.masterCallback("onDrag", "content");
    props.masterCallback("setComp", component);
    return { index: props.index };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component?: Container) {
    props.masterCallback("onDrag", null);

    props.masterCallback("setComp", null);
    return { index: props.index };
  }
};

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: Container) {
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
      props.setTargetIndex(props.onDrag, props.index, position);
    }
  },

  drop(props: IProps, monitor: DropTargetMonitor, component: Container) {
    const type = monitor.getItemType();
    props.masterCallback("setComp", null);
    if (type === ItemTypes.CARD) {
      props.pushPresentBlockToTargetIndex(monitor.getItem().index);
    } else if (type === ItemTypes.CONTENT) {
      props.pushNewBlockToTargetIndex(monitor.getItem());
    }
  }
};

interface IProps {
  // Action to Parent Component
  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number[]
  ) => void;
  masterCallback: any;
  moveCard: any;
  handleDrop: (hoverItem: any, hoverIndex: number[]) => void;
  index: number[];
  handleOnChange: any;

  // For Content Render
  selectedIndex: number | number[] | null;
  hoveredIndex: number | number[] | null;
  containerItem: {
    type: string;
    content:
      | "BUTTON"
      | "DIVIDER"
      | "HTML"
      | "IMAGE"
      | "TEXT"
      | "VIDEO"
      | "SOCIAL";
    // Button, Text
    value: ValueJSON;
    // Button, Text
    align?: "left" | "center" | "right";
    // Button, Text
    textAlign?: "left" | "center" | "right";
    // Button, Text
    textColor?: { r: string; g: string; b: string; a: string };
    // Button
    backgroundColor?: { r: string; g: string; b: string; a: string };
    // Button
    hoverColor?: { r: string; g: string; b: string; a: string };
    // Image
    imageSrc?: string;
    // Image
    fullWidth?: boolean;
    // Image
    alt?: string;
    // Image, Button
    link?: string;
    // Video
    videoSrc?: string;
  };
  onDrag: "content" | "columnList";
  // contentWidth: number;
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
  setTargetIndex: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
}

interface IState {
  hover: boolean;
  active: boolean;
  toolHover: boolean;
}

interface IDnDSourceProps {
  // React-dnd props
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

interface IDnDTargetProps {
  // React-dnd props
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
}

class Container extends React.Component<
  IProps & IDnDSourceProps & IDnDTargetProps,
  IState
> {
  constructor(props: IProps & IDnDSourceProps & IDnDTargetProps) {
    super(props);

    this.state = {
      hover: false,
      active: false,
      toolHover: false
    };
  }

  public setDragImage = () => {
    const image = new Image();
    image.src =
      "https://pbs.twimg.com/profile_images/882259118131523585/jckOG2cP_400x400.jpg";
    image.onload = () => {
      image.width = image.height = 20;
      this.props.connectDragPreview(image);
    };
  };

  // public componentDidMount = () => {
  //   const image = new Image();
  //   image.src =
  //     "https://pbs.twimg.com/profile_images/882259118131523585/jckOG2cP_400x400.jpg";
  //   image.onload = () => {
  //     this.props.connectDragPreview(image);
  //   };
  // };

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

  public showInner = (selected: boolean) => {
    switch (this.props.containerItem.content) {
      case "BUTTON":
        let value = null;
        if (!Value.isValue(this.props.containerItem.value)) {
          value = Value.fromJSON(this.props.containerItem.value);
          this.props.handleOnChange(
            { value },
            this.props.index,
            "BUTTON",
            "TEXT_CHANGE"
          );
        } else {
          value = this.props.containerItem.value;
        }
        return (
          <ButtonContent
            item={this.props.containerItem}
            index={this.props.index}
            value={value}
            handleOnChange={this.props.handleOnChange}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "DIVIDER":
        return <DividerContent />;
      case "HTML":
        if (!Value.isValue(this.props.containerItem.value)) {
          value = Value.fromJSON(this.props.containerItem.value);
          this.props.handleOnChange(
            { value },
            this.props.index,
            "BUTTON",
            "TEXT_CHANGE"
          );
        } else {
          value = this.props.containerItem.value;
        }
        return (
          <HtmlContent
            index={this.props.index}
            value={value}
            handleOnChange={this.props.handleOnChange}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "IMAGE":
        return (
          <ImageContent
            src={this.props.containerItem.imageSrc}
            alt={this.props.containerItem.alt}
            link={this.props.containerItem.link}
            fullWidth={this.props.containerItem.fullWidth}
          />
        );
      case "TEXT":
        if (!Value.isValue(this.props.containerItem.value)) {
          value = Value.fromJSON(this.props.containerItem.value);
          this.props.handleOnChange(
            { value },
            this.props.index,
            "BUTTON",
            "TEXT_CHANGE"
          );
        } else {
          value = this.props.containerItem.value;
        }
        return (
          <TextContent
            value={value}
            index={this.props.index}
            item={this.props.containerItem}
            plugins={plugins}
            selected={selected}
            handleOnChange={this.props.handleOnChange}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "VIDEO":
        return (
          <VideoContent
            src={this.props.containerItem.videoSrc!}
            autoplay={false}
          />
        );
      case "SOCIAL":
        return <SocialMediaContent />;
      default:
        return null;
    }
  };

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
      isDragging,
      connectDragSource,
      connectDropTarget
      // connectDragPreview
    } = this.props;
    const { index, hoveredIndex, selectedIndex } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    let hover: boolean = false;
    let active: boolean = false;
    if (Array.isArray(hoveredIndex)) {
      hover = hoveredIndex
        ? hoveredIndex.length === index.length &&
          hoveredIndex.every((v, i) => v === index[i])
          ? true
          : false
        : false;
    }
    if (Array.isArray(selectedIndex)) {
      active = selectedIndex
        ? selectedIndex.length === index.length &&
          selectedIndex.every((v, i) => v === index[i])
          ? true
          : false
        : false;
    }

    return connectDropTarget(
      connectDragSource(
        <div
          className={classnames(
            "container",
            hover ? "blockHover" : null,
            active ? "blockActive" : null
          )}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            padding: "5px",
            width: "100%",
            cursor: "grab",
            justifyContent:
              this.props.containerItem.content === "TEXT" ||
              this.props.containerItem.content === "BUTTON" ||
              this.props.containerItem.content === "HTML" ||
              this.props.containerItem.content === "IMAGE" ||
              this.props.containerItem.content === "VIDEO"
                ? this.props.containerItem.align
                  ? this.props.containerItem.align
                  : "center"
                : "center",
            opacity,
            transition: "border 0.5s ease, opacity 0.5s ease",
            borderRadius: "2px"
          }}
          onMouseOver={this.handleOnMouseOver}
          onMouseDown={this.handleOnMouseDown}
          onMouseLeave={this.handleOnMouseLeave}
        >
          {this.showInner(active)}
        </div>
      )
    );
  }
  // public handleClickOutside = () => {
  //   this.props.masterCallback("deselect");
  // };
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
)(Container);
