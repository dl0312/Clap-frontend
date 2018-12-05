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

import { Value } from "slate";
// import styled from "styled-components";
import flow from "lodash/flow";
// import EditorDefaults from "../../EditorDefaults";
// import ContentBox from "../ContentBox";

// import ButtonContent from "../ContentItems/ButtonContent";
import TextContent from "../ContentItems/TextContent";
// import DividerContent from "../ContentItems/DividerContent";
// import HtmlContent from "../ContentItems/HtmlContent";
// import ImageContent from "../ContentItems/ImageContent";
// import VideoContent from "../ContentItems/VideoContent";
// import SocialMediaContent from "../ContentItems/SocialMediaContent";

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
// import { RenderNodeProps, RenderMarkProps } from "slate-react";
import { getEmptyImage } from "react-dnd-html5-backend";
import styled from "styled-components";
import ImageContent from "../ContentItems/ImageContent";
import VideoContent from "../ContentItems/VideoContent";

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
    props.masterCallback("isDragging", true);
    props.masterCallback("setComp", component);
    return { index: props.index };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component?: Container) {
    props.masterCallback("isDragging", false);
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
      props.setTargetIndex(props.index, position);
    }
  },

  drop(props: IProps, monitor: DropTargetMonitor, component: Container) {
    const type = monitor.getItemType();
    const item = monitor.getItem();
    props.masterCallback("setComp", null);
    if (item.type === "Image") {
      console.log(`Image`);
    } else if (item.type === "Video") {
      console.log(`Video`);
    }
    if (type === ItemTypes.CARD) {
      props.pushPresentBlockToTargetIndex(monitor.getItem().index);
    } else if (type === ItemTypes.CONTENT) {
      props.pushNewBlockToTargetIndex(monitor.getItem());
    }
  }
};

const InnerContainer = styled.div`
  width: 100%;
  max-width: 886px;
  margin: 0 auto;
  position: relative;
  cursor: grab;
  padding: 10px;
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
  contents: ITextContents & IImageContents & IVideoContents;
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
}

interface ITextContents {
  slateData: any;
}

interface IImageContents {
  slateData?: any;
  imageUrl: string | null;
  description: string | null;
  isUploaded: boolean | null;
  link: string | null;
  style:
    | "Wallpaper"
    | "AlignLeft"
    | "AlignCenter"
    | "AlignRight"
    | "WithManyTextLeft"
    | "WithManyTextRight"
    | "WithLessTextLeft"
    | "WithLessTextRight";
}

interface IVideoContents {
  videoUrl: string | null;
  description: string | null;
  width: number;
  height: number;
  style: "Wallpaper" | "AlignLeft" | "AlignCenter" | "AlignRight";
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
    switch (this.props.type) {
      case "Image":
        return <ImageContent contents={this.props.contents} />;
      case "Text":
        if (!Value.isValue(this.props.contents.slateData)) {
          const slatifiedData = Value.fromJSON(this.props.contents.slateData);
          console.log(slatifiedData);
          this.props.handleOnChange(
            { slatifiedData },
            this.props.index,
            "TEXT_CHANGE"
          );
        } else {
          // console.log(`data is slate friendly`);
        }
        return (
          <TextContent
            index={this.props.index}
            contents={this.props.contents}
            plugins={plugins}
            selected={selected}
            handleOnChange={this.props.handleOnChange}
            callbackfromparent={this.props.callbackfromparent}
          />
        );
      case "Video":
        return <VideoContent contents={this.props.contents} autoplay={false} />;
      // case "Social":
      //   return <SocialMediaContent />;
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
    hover = hoveredIndex === index;
    active = selectedIndex === index;

    return connectDropTarget(
      connectDragSource(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            // padding: "5px",
            width: "100%",
            justifyContent: "center",
            opacity,
            transition: "border 0.5s ease, opacity 0.5s ease",
            borderRadius: "2px"
          }}
        >
          <InnerContainer
            className={classnames(
              "container",
              hover ? "blockHover" : null,
              active ? "blockActive" : null
            )}
            onMouseOver={this.handleOnMouseOver}
            onMouseDown={this.handleOnMouseDown}
            onMouseLeave={this.handleOnMouseLeave}
          >
            {this.showInner(active)}
          </InnerContainer>
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
