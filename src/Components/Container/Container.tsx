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
import styled from "styled-components";
import flow from "lodash/flow";
import EditorDefaults from "../../EditorDefaults";

import Button from "../ContentItems/Button";
import Text from "../ContentItems/Text";
import Divider from "../ContentItems/Divider";
import Html from "../ContentItems/Html";
import Image from "../ContentItems/Image";
import Video from "../ContentItems/Video";
import SocialMedia from "../ContentItems/SocialMedia";

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
import { RenderNodeProps, RenderMarkProps } from "slate-react";

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
    console.log("hover");
    if (isJustOverThisOne) {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = (findDOMNode(
        component
      )! as Element).getBoundingClientRect() as DOMRect;

      console.log(hoverBoundingRect);
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

      if (dragIndex < hoverIndex && hoverpageY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverpageY > hoverMiddleY) {
        return;
      }
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
        props.moveCard(monitor.getItem().index, index);
      } else if (dropPosition === "under") {
        index[2] += 1;
        props.moveCard(monitor.getItem().index, index);
      }
    } else if (type === ItemTypes.CONTENT) {
      const index = props.index;
      if (dropPosition === "over") {
        props.handleDrop(monitor.getItem(), index);
      } else if (dropPosition === "under") {
        index[2] += 1;
        props.handleDrop(monitor.getItem(), index);
      }
    }
  }
};

interface IProps {
  key: number;

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
  contentWidth: number;
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
}

interface IState {
  hoverPosition: "over" | "under" | null;
  hover: boolean;
  active: boolean;
  toolHover: boolean;
}

interface IDnDProps {
  // React-dnd props
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;
}

class Container extends React.Component<IProps & IDnDProps, IState> {
  constructor(props: IProps & IDnDProps) {
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
            index={this.props.index}
            value={value}
            handleOnChange={this.props.handleOnChange}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "IMAGE":
        return (
          <Image
            src={this.props.item.imageSrc}
            alt={this.props.item.alt}
            link={this.props.item.link}
            fullWidth={this.props.item.fullWidth}
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
            index={this.props.index}
            item={this.props.item}
            plugins={plugins}
            handleOnChange={this.props.handleOnChange}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "VIDEO":
        return <Video src={this.props.item.videoSrc!} />;
      case "SOCIAL":
        return <SocialMedia />;
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
      connectDragPreview,
      connectDropTarget,
      isOver
    } = this.props;
    const {
      index,
      callbackfromparent,
      hoveredIndex,
      selectedIndex
    } = this.props;
    const opacity = isDragging ? 0.2 : 1;
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
                this.props.onDrag === "content"
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
                        callbackfromparent("delete", index);
                      }}
                    >
                      <i className="fas fa-trash-alt" />
                    </ButtonOption>
                    <ButtonOption
                      onClick={() => {
                        callbackfromparent("duplicate", index);
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
              state={
                this.props.onDrag === "content"
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
    (connect: DropTargetConnector, monitor: DropTargetMonitor): object => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    })
  ),
  DragSource(
    ItemTypes.CARD,
    cardSource,
    (connect: DragSourceConnector, monitor: DragSourceMonitor): object => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    })
  )
)(Container);
