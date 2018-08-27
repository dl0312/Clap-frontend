import * as React from "react";
import { Editor, RenderNodeProps, RenderMarkProps } from "slate-react";
import classnames from "classnames";
import ItemTypes from "../../ItemTypes";
import {
  DragSource,
  DropTarget,
  ConnectDragSource,
  ConnectDragPreview,
  ConnectDropTarget,
  DragSourceMonitor,
  DropTargetMonitor
} from "react-dnd";
import { Value, Block, Change, Schema, ObjectsAndTypes } from "slate";
import styled from "styled-components";
import { LAST_CHILD_TYPE_INVALID } from "slate-schema-violations";
import flow from "lodash/flow";
import EditorDefaults from "../../EditorDefaults";

import Button from "../ContentItems/Button";
import Text from "../ContentItems/Text";
import Divider from "../ContentItems/Divider";
import Html from "../ContentItems/Html";

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
import { LinkPlugin } from "@canner/slate-icon-link";
import { ListPlugin } from "@canner/slate-icon-list";
import { StrikeThroughPlugin } from "@canner/slate-icon-strikethrough";
import { UnderlinePlugin } from "@canner/slate-icon-underline";
import { RedoPlugin } from "@canner/slate-icon-redo";
import { VideoPlugin } from "@canner/slate-icon-video";

// select
import { FontSizePlugin } from "@canner/slate-select-fontsize";
import { LetterSpacingPlugin } from "@canner/slate-select-letterspacing";

// plugins
import { DEFAULT as DEFAULTLIST } from "@canner/slate-helper-block-list";
import { DEFAULT as DEFAULTBLOCKQUOTE } from "@canner/slate-helper-block-quote";
import EditList from "slate-edit-list";
import EditBlockquote from "slate-edit-blockquote";
import { ParagraphPlugin } from "@canner/slate-icon-shared";

import EditPrism from "slate-prism";
import EditCode from "slate-edit-code";
import TrailingBlock from "slate-trailing-block";
import EditTable from "slate-edit-table";
import { findDOMNode } from "react-dom";

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
  FontBgColorPlugin(),
  FontColorPlugin(),
  ItalicPlugin(),
  StrikeThroughPlugin(),
  UnderlinePlugin(),
  FontSizePlugin(),
  LetterSpacingPlugin(),
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
  VideoPlugin()
];

const Handle = styled.div`
  background-color: #9c88ff;
  width: 2rem;
  height: 2rem;
  border-top-right-radius: 100%;
  border-bottom-right-radius: 100%;
  margin-right: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 50%;
  right: 0px;
  margin-left: -2px;
  z-index: 100;
  transform: translate(44px, -16px);
`;

const ButtonOption = styled.button`
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
  z-index: 100;
  display: flex;
  position: absolute;
  margin-right: 0.75rem;
  cursor: -webkit-grab;
  align-items: center;
  justify-content: center;
  color: white;
  top: 50%;
  transform: translate(108px, -16px);
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

const cardSource = {
  beginDrag(props: IProps, monitor: DragSourceMonitor, component: Container) {
    props.masterCallback("OnDrag", "content");
    return { index: props.index };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component?: Container) {
    props.masterCallback("OnDrag", null);
    return { index: props.index };
  }
};

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: Container) {
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    if (isJustOverThisOne) {
      const dragIndex = monitor.getItem().index;
      // if (
      //   monitor.getItemType() === "content" &&
      //   monitor.getItem().index === undefined
      // ) {
      //   dragIndex = props.cards - 1;
      // }
      const hoverIndex = props.index;
      // console.log(item.isNew + ", " + monitor.getItem().index);

      // console.log(dragIndex + ", " + hoverIndex);

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

      // Time to actually perform the action
      // props.moveCard(dragIndex, hoverIndex);

      // // Note: we're mutating the monitor item here!
      // // Generally it's better to avoid mutations,
      // // but it's good here for the sake of performance
      // // to avoid expensive index searches.
      // monitor.getItem().index = hoverIndex;
    }
  },

  drop(props: IProps, monitor: DropTargetMonitor, component: Container) {
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
    console.log(clientOffset!.y < hoverBoundingRect.y + hoverMiddleY);

    const type = monitor.getItemType();

    props.masterCallback("OnDrag", null);
    if (type === ItemTypes.CARD) {
      const index = props.index;
      if (dropPosition === "over") {
        // index[2] -= 1;
        props.moveCard(monitor.getItem().index, index);
      } else if (dropPosition === "under") {
        index[2] += 1;
        props.moveCard(monitor.getItem().index, index);
      }
    } else if (type === ItemTypes.CONTENT) {
      const index = props.index;
      console.log(index);
      if (dropPosition === "over") {
        // index[2] -= 1;
        console.log(index);
        props.handleDrop(monitor.getItem(), index);
      } else if (dropPosition === "under") {
        index[2] += 1;
        console.log(index);
        props.handleDrop(monitor.getItem(), index);
      }
    }
  }
};

const schema: Schema = {
  document: {
    last: { type: "paragraph" } as ObjectsAndTypes,
    normalize: (change: Change, reason: any, { node, child }: any) => {
      switch (reason) {
        case LAST_CHILD_TYPE_INVALID: {
          const paragraph = Block.create("paragraph");
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
        default:
          return;
      }
    }
  }
} as Schema;

interface IProps {
  key: number;

  // Action to Parent Component
  callbackfromparent: any;
  masterCallback: any;
  moveCard: any;
  handleDrop: any;
  index: number[];
  handleOnChange: any;

  // React-dnd props
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;

  // Helping for React-dnd
  containerHoverIndex: number | number[] | null;

  // For Content Render
  selectedIndex: number[] | null;
  hoveredIndex: number[] | null;
  item: {
    type: string;
    content:
      | "BUTTON"
      | "DIVIDER"
      | "HTML"
      | "IMAGE"
      | "TEXT"
      | "VIDEO"
      | "SOCIAL";
    value?: any;
    align?: "left" | "center" | "right";
    textAlign?: "left" | "center" | "right";
    textColor?: { r: string; g: string; b: string; a: string };
    backgroundColor?: { r: string; g: string; b: string; a: string };
    hoverColor?: { r: string; g: string; b: string; a: string };
  };
  OnDrag: "content" | "columnList";
  contentWidth: number;
  renderNode: RenderNodeProps;
  renderMark: RenderMarkProps;
}

interface IState {
  hoverPosition: "over" | "under" | null;
  hover: boolean;
  active: boolean;
  toolHover: boolean;
}

class Container extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hoverPosition: null,
      hover: false,
      active: false,
      toolHover: false
    };
  }

  public showInner = (active: boolean) => {
    switch (this.props.item.content) {
      case "BUTTON":
        let value = null;
        if (!Value.isValue(this.props.item.value)) {
          value = Value.fromJSON(this.props.item.value);
          this.props.handleOnChange(
            { value },
            this.props.index,
            "BUTTON",
            "TEXT_CHANGE"
          );
        } else {
          value = this.props.item.value;
        }
        return (
          <Button
            item={this.props.item}
            index={this.props.index}
            value={value}
            handleOnChange={this.props.handleOnChange}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "DIVIDER":
        return <Divider />;
      case "HTML":
        if (!Value.isValue(this.props.item.value)) {
          value = Value.fromJSON(this.props.item.value);
          this.props.handleOnChange(
            { value },
            this.props.index,
            "BUTTON",
            "TEXT_CHANGE"
          );
        } else {
          value = this.props.item.value;
        }
        return (
          <Html
            value={value}
            index={this.props.index}
            active={active}
            handleOnChange={this.props.handleOnChange}
            onKeyDown={this.props.onKeyDown}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "IMAGE":
        return (
          <Image
            active={active}
            src={this.props.item.imageSrc}
            fullWidth={this.props.item.fullWidth}
            contentWidth={this.props.contentWidth}
          />
        );
      case "TEXT":
        if (!Value.isValue(this.props.item.value)) {
          value = Value.fromJSON(this.props.item.value);
          this.props.handleOnChange(
            { value },
            this.props.index,
            "BUTTON",
            "TEXT_CHANGE"
          );
        } else {
          value = this.props.item.value;
        }
        return (
          <Text
            value={value}
            schema={schema}
            index={this.props.index}
            item={this.props.item}
            active={active}
            plugins={plugins}
            handleOnChange={this.props.handleOnChange}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "VIDEO":
        return (
          <Video
            active={active}
            src={this.props.item.videoSrc}
            contentWidth={this.props.item.contentWidth}
          />
        );
      case "SOCIAL":
        return <Social active={active} />;
      default:
        break;
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
      connectDragPreview,
      connectDropTarget,
      index,
      callbackfromparent,
      hoveredIndex,
      selectedIndex,
      isOver
    } = this.props;
    const opacity = isDragging ? 0.2 : 1;
    const hover = hoveredIndex
      ? hoveredIndex.length === index.length &&
        hoveredIndex.every((v, i) => v === index[i])
        ? true
        : false
      : false;
    const active = selectedIndex
      ? selectedIndex.length === index.length &&
        selectedIndex.every((v, i) => v === index[i])
        ? true
        : false
      : false;
    return (
      connectDragSource &&
      connectDropTarget &&
      connectDropTarget(
        connectDragPreview(
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
              padding: "10px",
              width: "100%",
              justifyContent:
                this.props.item.content === "TEXT" ||
                this.props.item.content === "BUTTON" ||
                this.props.item.content === "HTML" ||
                this.props.item.content === "IMAGE" ||
                this.props.item.content === "VIDEO"
                  ? this.props.item.align
                    ? this.props.item.align
                    : "center"
                  : "center",
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
              state={
                this.props.OnDrag === "content"
                  ? this.state.hoverPosition === "over" && isOver
                    ? "ISOVER"
                    : "ONDRAG"
                  : "INVISIBLE"
              }
              position="over"
            >
              {/* BLOCK HERE */}
            </Builder>
            {hover || active ? (
              <div>
                {this.state.toolHover ? (
                  <Tool onMouseLeave={this.handleOnMouseLeaveTool}>
                    <ButtonOption
                      onClick={() => {
                        console.log(index);
                        callbackfromparent("delete", index, this);
                      }}
                    >
                      <i className="fas fa-trash-alt" />
                    </ButtonOption>
                    <ButtonOption
                      onClick={() => {
                        callbackfromparent("duplicate", index, this);
                      }}
                    >
                      <i className="far fa-copy" />
                    </ButtonOption>
                    {connectDragSource(
                      <button
                        style={{
                          border: "none",
                          outline: "none",
                          backgroundColor: "#9c88ff",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "2rem",
                          height: "2rem",
                          marginBottom: "10px",
                          cursor: "pointer",
                          borderTopRightRadius: "100%",
                          borderBottomRightRadius: "100%"
                        }}
                      >
                        <i className="fas fa-arrows-alt" />
                      </button>
                    )}
                  </Tool>
                ) : (
                  <Handle onMouseOver={this.handleOnMouseOverTool}>
                    <i className="fas fa-ellipsis-h" />
                  </Handle>
                )}
              </div>
            ) : null}
            {this.showInner(active)}
            <Builder
              display={this.props.OnDrag === "content"}
              state={
                this.props.OnDrag === "content"
                  ? this.state.hoverPosition === "under" && isOver
                    ? "ISOVER"
                    : "ONDRAG"
                  : "INVISIBLE"
              }
              position="under"
            >
              {/* BLOCK HERE */}
            </Builder>
          </div>
        )
      )
    );
  }
}

export default flow(
  DropTarget(
    [ItemTypes.CARD, ItemTypes.CONTENT],
    cardTarget,
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    })
  ),
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)(Container);

const ImageContainer = styled.div`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  width: ${props => (props.fullWidth ? "100%" : null)};
  width: ${props => (props.isEmpty ? "100%" : null)};
`;

const EmptyImageContainer = styled.div`
  width: 100%;
  padding: 30px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
`;

const EmptyImageIcon = styled.i`
  font-size: 30px;
`;

const EmptyImageText = styled.div`
  text-transform: uppercase;
`;

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ImageContainer
        className="content"
        fullWidth={this.props.fullWidth}
        isEmpty={this.props.src !== null}
      >
        {this.props.src ? (
          <img style={{ width: "100%" }} src={this.props.src} alt="logo" />
        ) : (
          <EmptyImageContainer>
            <EmptyImageIcon className="far fa-image" />
            {/* <EmptyImageText>
              upload local image or use external link
            </EmptyImageText> */}
          </EmptyImageContainer>
        )}
      </ImageContainer>
    );
  }
}

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.isEmpty ? null : "0")};
  padding-bottom: ${props => (props.isEmpty ? null : "56.25%")};
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
`;

const EmptyVideoContainer = styled.div`
  width: 100%;
  padding: 30px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
`;

const EmptyVideoIcon = styled.i`
  font-size: 30px;
  color: #ff0000;
`;

const EmptyVideoText = styled.div`
  text-transform: uppercase;
`;

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  render() {
    let { src } = this.props;
    if (src) {
      src = this.youtube_parser(src);
    }
    console.log(src);
    return (
      <VideoContainer
        className="content"
        isEmpty={src === undefined || src === false}
      >
        {src ? (
          <iframe
            title="youtube"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%"
            }}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${src}?ecver=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <EmptyVideoContainer>
            <EmptyVideoIcon className="fab fa-youtube" />
            {/* <EmptyImageText>
              upload local image or use external link
            </EmptyImageText> */}
          </EmptyVideoContainer>
        )}
      </VideoContainer>
    );
  }
}

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const buttonStyle = {
      borderRadius: "100%",
      border: "none",
      color: "white",
      width: "30px",
      height: "30px",
      fontSize: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 2px"
    };
    return (
      <div
        className="content"
        style={{
          borderTop: "0 solid transparent",
          borderRight: "0 solid transparent",
          borderLeft: "0 solid transparent",
          borderBottom: "0 solid transparent",
          display: "flex"
        }}
      >
        <button style={{ ...buttonStyle, backgroundColor: "#1da1f2" }}>
          <i className="fab fa-twitter" />
        </button>
        <button style={{ ...buttonStyle, backgroundColor: "#3b5998" }}>
          <i className="fab fa-facebook-f" />
        </button>
        <button
          style={{
            ...buttonStyle,
            background:
              "radial-gradient(circle at 33% 100%, #FED373 4%, #F15245 30%, #D92E7F 62%, #9B36B7 85%, #515ECF)"
          }}
        >
          <i className="fab fa-instagram" />
        </button>
        <button style={{ ...buttonStyle, backgroundColor: "#ed3124" }}>
          <i className="fab fa-youtube" />
        </button>
      </div>
    );
  }
}
