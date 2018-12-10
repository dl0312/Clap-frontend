import * as React from "react";
import styled from "styled-components";
import { Editor, Plugin } from "slate-react";
import EditorDefaults from "../../../EditorDefaults";
import classnames from "classnames";

// import { Row, Col } from "antd";

import { AlignCenter, AlignLeft, AlignRight } from "@canner/slate-icon-align";
// import { AlignCenter, AlignLeft, AlignRight } from "@canner/slate-icon-align";
import Blockquote from "@canner/slate-icon-blockquote";
import Bold from "@canner/slate-icon-bold";
// import Clean from "@canner/slate-icon-clean";
// import Code from "@canner/slate-icon-code";
// import CodeBlock from "@canner/slate-icon-codeblock";
// import Emoji, {EmojiPlugin} from '@canner/slate-icon-emoji';
import FontBgColor from "@canner/slate-icon-fontbgcolor";
import FontColor from "@canner/slate-icon-fontcolor";
import { Header1, Header2 } from "@canner/slate-icon-header";
import Hr from "@canner/slate-icon-hr";
// import Image from "@canner/slate-icon-image";
// import { Indent, Outdent } from "@canner/slate-icon-indent";
import Italic from "@canner/slate-icon-italic";
import Table from "@canner/slate-icon-table";
import Link from "@canner/slate-icon-link";
// import { OlList, UlList } from "@canner/slate-icon-list";
import StrikeThrough from "@canner/slate-icon-strikethrough";
import Underline from "@canner/slate-icon-underline";
import Undo from "@canner/slate-icon-undo";
import Redo from "@canner/slate-icon-redo";
import Video from "@canner/slate-icon-video";

// select
// import FontSize from "@canner/slate-select-fontsize";
// import LetterSpacing from "@canner/slate-select-letterspacing";
// import LineHeight from "@canner/slate-select-lineheight";

// plugins
import "prismjs/themes/prism.css";
import { getCategoryById, getCategoryByIdVariables } from "src/types/api";
import { Query } from "react-apollo";
import { CATEGORY } from "src/sharedQueries";
import { Popover } from "antd";
import Delete from "src/Components/BlockIcons/Delete";
import _ from "lodash";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  ConnectDropTarget,
  ConnectDragSource,
  ConnectDragPreview,
  DropTarget,
  DragSource,
  DropTargetConnector,
  DragSourceConnector
} from "react-dnd";
import { findDOMNode } from "react-dom";
import ItemTypes from "src/ItemTypes";
import flow from "lodash/flow";
import { getEmptyImage } from "react-dnd-html5-backend";
// import HoverView from "src/Components/HoverView";

// const selectors = [FontSize, LetterSpacing, LineHeight];
const icons = [
  Header1,
  Header2,
  Bold,
  Italic,
  Underline,
  StrikeThrough,
  FontBgColor,
  FontColor,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Blockquote,
  // Clean,
  // Code,
  // CodeBlock,
  // Emoji,
  Hr,
  // Image,
  Video,
  // Indent,
  // Outdent,
  Link,
  // OlList,
  // UlList,
  Table,
  Delete,
  Undo,
  Redo
];

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: TextContent) {
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

  drop(props: IProps, monitor: DropTargetMonitor, component: TextContent) {
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
  beginDrag(props: IProps, monitor: DragSourceMonitor, component: TextContent) {
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
  endDrag(props: IProps, monitor: DragSourceMonitor, component?: TextContent) {
    props.masterCallback("isDragging", false);
    props.masterCallback("unselect");
    return { index: props.index, Comp: component };
  }
};

const DragSourceArea = styled.div`
  background-color: rgba(0, 0, 0, 0.08);
  transition-property: opacity, background;
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

interface IClapImageProps {
  small: boolean;
  selected: boolean;
}

const ClapImage = styled<IClapImageProps, any>("img")`
  width: ${props => (props.small ? "20px" : null)};
  margin-left: ${props => (props.small ? "2px" : null)};
  margin-right: ${props => (props.small ? "2px" : null)};
  max-width: 100%;
  max-height: 20em;
  margin-bottom: ${props => (props.small ? "-4px" : null)};
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

const ClapImageText = styled.span`
  font-weight: bolder;
  color: ${props => props.color};
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
  top: ${props => (props.toolbarState === "sticky" ? "-16px" : "-54px")};
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
  transform: translateY(15px);
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
  height: 32px;
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

const ButtonItem = styled<IButtonItemProps, any>("li")`
  border-right: ${props =>
    props.index === 1 ||
    props.index === 7 ||
    props.index === 11 ||
    props.index === 15
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
  height: 100%;
`;

interface ITextContentFrameProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
  isFirstBlock: boolean;
}

const TextContentFrame = styled<ITextContentFrameProps, any>("div")`
  margin-top: ${props =>
    props.isFirstBlock ? "0px" : props.device === "PHONE" ? "35px" : "40px"};
`;

interface ITextContentContainerProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const TextContentContainer = styled<ITextContentContainerProps, any>("div")`
  position: relative;
  max-width: ${props => (props.device === "DESKTOP" ? "886px" : "640px")};
  width: ${props => (props.device === "PHONE" ? "auto" : "100%")};
  margin: 0 auto;
  padding-left: ${props => (props.device === "PHONE" ? "20px" : null)};
  padding-right: ${props => (props.device === "PHONE" ? "20px" : null)};
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface ITextContentWrapperProps {
  textColor: { r: string; g: string; b: string; a: string };
  textAlign: "left" | "center" | "right";
}

const TextContentWrapper = styled<ITextContentWrapperProps, any>("div")`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;

  text-align: ${props => props.textAlign};
  width: 100%;
  cursor: auto;
  line-height: 1.9;
`;

// interface ITextContainerProps {
//   textColor: { r: string; g: string; b: string; a: string };
//   textAlign: "left" | "center" | "right";
// }

// const TextContainer = styled<ITextContainerProps, any>("div")`
//   text-align: ${props => props.textAlign};
//   width: 100%;
//   cursor: auto;
//   line-height: 1.9;
// `;

class GetCategoryById extends Query<
  getCategoryById,
  getCategoryByIdVariables
> {}

interface ITextContents {
  slateData: any;
}

interface IProps {
  index: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
  contents: ITextContents;
  plugins: Plugin[];
  selected?: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  callbackfromparent: any;
  editorRef: any;
  masterCallback: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  setTargetIndex: any;
  handleOnChange?: any;
  wikiRef: any;
}
interface IState {
  toolbarState: "follow" | "sticky" | "blind";
  isWriteMode: boolean;
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

class TextContent extends React.Component<
  IProps & IDnDTargetProps & IDnDSourceProps,
  IState
> {
  dragSource: any;
  wrapperRef: any;
  constructor(props: IProps & IDnDSourceProps & IDnDTargetProps) {
    super(props);
    this.dragSource = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      toolbarState: "follow",
      isWriteMode: false
    };
  }

  public handleScrollFn = () => {
    const rect = (findDOMNode(
      this.wrapperRef
    )! as Element).getBoundingClientRect() as DOMRect;
    console.log(
      this.props.index,
      rect.top,
      rect.bottom,
      this.state.toolbarState,
      rect.bottom < 60
    );
    if (rect.bottom < 100) {
      this.setState({ toolbarState: "blind" });
    } else if (rect.top < 150) {
      this.setState({ toolbarState: "sticky" });
    } else {
      this.setState({ toolbarState: "follow" });
    }
  };

  componentDidMount() {
    console.log(`mount textcontent`);
    document.addEventListener("mousedown", this.handleClickOutside);
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
    console.log(`unmount textcontent`);
    document.removeEventListener("mousedown", this.handleClickOutside);
    if (this.props.editorRef.current !== null)
      this.props.editorRef.current.removeEventListener(
        "scroll",
        this.handleScrollFn
      );
  }

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  handleClickOutside(event: any) {
    event.preventDefault();
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      !this.props.wikiRef.current.contains(event.target)
    ) {
      console.log(
        this.props.selectedIndex === this.props.index,
        this.state.isWriteMode
      );
      if (this.props.selectedIndex === this.props.index) {
        this.props.masterCallback("unselect");
      }
      if (this.state.isWriteMode) {
        this.setState({ isWriteMode: false });
      }
    }
  }

  onChange = (change: any) => {
    this.props.handleOnChange(change, this.props.index, "slateData");
  };

  /* In case, Mouse Over Container */
  public handleOnMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("mouseover", this.props.index);
  };

  /* In case, Mouse Don Container */
  public handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.setState({ isWriteMode: false });
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
      contents: { slateData },
      index,
      hoveredIndex,
      selectedIndex,
      plugins,
      connectDragSource,
      isDragging
    } = this.props;
    const { toolbarState, isWriteMode } = this.state;
    const hover: boolean = hoveredIndex === index;
    const active: boolean = selectedIndex === index;
    const textContentState = isWriteMode
      ? "WRITE"
      : active
      ? "ACTIVE"
      : hover
      ? "HOVER"
      : null;
    if (textContentState === "WRITE") {
      document.addEventListener("mousedown", this.handleClickOutside);
      this.props.editorRef.current.addEventListener(
        "scroll",
        this.handleScrollFn
      );
    } else {
      document.removeEventListener("mousedown", this.handleClickOutside);
      if (this.props.editorRef.current !== null)
        this.props.editorRef.current.removeEventListener(
          "scroll",
          this.handleScrollFn
        );
    }
    return (
      <TextContentFrame isFirstBlock={index === 0} device={device}>
        <TextContentContainer device={device}>
          <TextContentWrapper
            innerRef={(instance: any) => this.setWrapperRef(instance)}
            textAlign={"left"}
            className="markdown-body"
          >
            <DragSourceArea
              className={classnames(
                "container",
                textContentState === "HOVER" && !isDragging
                  ? "blockHover"
                  : null,
                textContentState === "ACTIVE" && !isDragging
                  ? "blockActive"
                  : null
              )}
              innerRef={(instance: any) => {
                connectDragSource(instance);
              }}
              onMouseOver={this.handleOnMouseOver}
              onMouseDown={this.handleOnMouseDown}
              onMouseLeave={this.handleOnMouseLeave}
            />
            {textContentState === "WRITE" && (
              <ToolbarWrapper toolbarState={toolbarState}>
                <Toolbar toolbarState={toolbarState}>
                  <ButtonContainer>
                    <ButtonWrapper toolbarState={toolbarState}>
                      {icons.map((Type, i) => {
                        return (
                          <ButtonItem key={i} index={i}>
                            <Type
                              change={slateData.change()}
                              onChange={this.onChange}
                              callbackfromparent={this.props.callbackfromparent}
                              index={index}
                              key={i}
                              className="toolbar-item"
                              activeClassName="toolbar-item-active"
                              disableClassName="toolbar-item-disable"
                              activeStrokeClassName="ql-stroke-active"
                              activeFillClassName="ql-fill-active"
                              activeThinClassName="ql-thin-active"
                              activeEvenClassName="ql-even-active"
                            />
                          </ButtonItem>
                        );
                      })}
                    </ButtonWrapper>
                  </ButtonContainer>
                </Toolbar>
              </ToolbarWrapper>
            )}
            <Editor
              style={{
                wordBreak: "break-word",
                fontSize: "16px",
                color: EditorDefaults.MAIN_TEXT_COLOR
              }}
              onClick={(e: any) => {
                e.preventDefault();
                this.setState({ isWriteMode: true });
                this.props.callbackfromparent("select", this.props.index);
              }}
              value={slateData}
              readOnly={false}
              onChange={this.onChange}
              placeholder={"Text"}
              renderNode={this.renderNode}
              autoCorrect={false}
              autoFocus={true}
              spellCheck={false}
              plugins={plugins}
            />
            {/* {textContentState === "WRITE" ? (
              <Editor
                style={{
                  wordBreak: "break-word",
                  fontSize: "16px",
                  color: EditorDefaults.MAIN_TEXT_COLOR
                }}
                value={slateData}
                readOnly={false}
                onChange={this.onChange}
                placeholder={"Text"}
                renderNode={this.renderNode}
                autoCorrect={false}
                autoFocus={true}
                spellCheck={false}
                plugins={plugins}
              />
            ) : (
              <Editor
                style={{
                  wordBreak: "break-word",
                  fontSize: "16px",
                  color: EditorDefaults.MAIN_TEXT_COLOR,
                  cursor: "text"
                }}
                onClick={(e: any) => {
                  e.preventDefault();
                  this.setState({ isWriteMode: true });
                }}
                value={slateData}
                readOnly={false}
                onChange={this.onChange}
                renderNode={this.renderNode}
                autoCorrect={false}
                spellCheck={false}
                plugins={plugins}
              />
            )} */}
          </TextContentWrapper>
        </TextContentContainer>
      </TextContentFrame>
    );
  }
  public renderNode = (props: any): JSX.Element | undefined => {
    const { attributes, children, node, isSelected } = props;

    if (node.object === "block" || node.object === "inline") {
      switch (node.type) {
        case "block-quote":
          return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
          return <ul {...attributes}>{children}</ul>;
        case "list-item":
          return <li {...attributes}>{children}</li>;
        case "numbered-list":
          return <ol {...attributes}>{children}</ol>;
        case "clap-image": {
          const id = node.data.get("id");
          const name = node.data.get("name");
          const type = node.data.get("type");
          console.log(id, type);
          switch (type) {
            case "TEXT":
              return (
                <GetCategoryById
                  query={CATEGORY}
                  fetchPolicy={"cache-and-network"}
                  variables={{ categoryId: id }}
                >
                  {({ loading, data, error }) => {
                    if (loading)
                      return (
                        <ClapImageText
                          color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                        >
                          {name}
                        </ClapImageText>
                      );
                    if (error) return `${error.message}`;
                    console.log(data);
                    if (data !== undefined) {
                      const { category } = data.GetCategoryById;
                      return (
                        category &&
                        category.topWikiImage && (
                          <Popover
                            placement="leftTop"
                            content={
                              // <HoverView
                              //   json={JSON.parse(
                              //     category.topWikiImage.hoverImage
                              //   )}
                              // />
                              `hello`
                            }
                            title={
                              <>
                                <ClapImage
                                  small={true}
                                  src={category.topWikiImage.shownImage}
                                  alt={"hover"}
                                  selected={isSelected}
                                  {...attributes}
                                />
                                <ClapImageText
                                  color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                                >
                                  {name}
                                </ClapImageText>
                              </>
                            }
                            trigger="hover"
                          >
                            {/* <Link
                              target="_blank"
                              style={{
                                textDecoration: "none"
                              }}
                              rel="noopener noreferrer"
                              to={`/category/read/${category.id}`}
                            > */}
                            <ClapImageText
                              color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                            >
                              {name}
                            </ClapImageText>
                            {/* </Link> */}
                          </Popover>
                        )
                      );
                    } else {
                      return null;
                    }
                  }}
                </GetCategoryById>
              );
            case "MINI_IMG":
              return (
                <GetCategoryById
                  query={CATEGORY}
                  fetchPolicy={"cache-and-network"}
                  variables={{ categoryId: id }}
                >
                  {({ loading, data, error }) => {
                    if (loading)
                      return (
                        <ClapImageText
                          color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                        >
                          {name}
                        </ClapImageText>
                      );
                    if (error) return `${error.message}`;
                    console.log(data);
                    if (data !== undefined) {
                      const { category } = data.GetCategoryById;
                      return (
                        category &&
                        category.topWikiImage && (
                          <Popover
                            placement="leftTop"
                            content={
                              // <HoverView
                              //   json={JSON.parse(
                              //     category.topWikiImage.hoverImage
                              //   )}
                              // />
                              `null`
                            }
                            title={
                              <>
                                <ClapImage
                                  small={true}
                                  src={category.topWikiImage.shownImage}
                                  alt={"hover"}
                                  selected={isSelected}
                                  {...attributes}
                                />
                                <ClapImageText
                                  color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                                >
                                  {name}
                                </ClapImageText>
                              </>
                            }
                            trigger="hover"
                          >
                            {/* <Link
                              target="_blank"
                              style={{
                                textDecoration: "none"
                              }}
                              rel="noopener noreferrer"
                              to={`/category/read/${category.id}`}
                            > */}
                            <ClapImage
                              small={true}
                              src={category.topWikiImage.shownImage}
                              alt={"hover"}
                              selected={isSelected}
                              {...attributes}
                            />
                            <ClapImageText
                              color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                            >
                              {name}
                            </ClapImageText>
                            {/* </Link> */}
                          </Popover>
                        )
                      );
                    } else {
                      return null;
                    }
                  }}
                </GetCategoryById>
              );
            case "NORMAL_IMG":
              return (
                <GetCategoryById
                  query={CATEGORY}
                  fetchPolicy={"cache-and-network"}
                  variables={{ categoryId: id }}
                >
                  {({ loading, data, error }) => {
                    if (loading)
                      return (
                        <ClapImageText
                          color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                        >
                          {name}
                        </ClapImageText>
                      );
                    if (error) return `${error.message}`;
                    if (data !== undefined) {
                      const { category } = data.GetCategoryById;
                      return (
                        category &&
                        category.topWikiImage && (
                          <Popover
                            placement="leftTop"
                            content={
                              // <HoverView
                              //   json={JSON.parse(
                              //     category.topWikiImage.hoverImage
                              //   )}
                              // />
                              null
                            }
                            title={
                              <>
                                <ClapImage
                                  small={true}
                                  src={category.topWikiImage.shownImage}
                                  alt={"hover"}
                                  selected={isSelected}
                                  {...attributes}
                                />
                                <ClapImageText
                                  color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                                >
                                  {name}
                                </ClapImageText>
                              </>
                            }
                            trigger="hover"
                          >
                            <Link
                              target="_blank"
                              style={{
                                height: "100%",
                                textDecoration: "none",
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",

                                verticalAlign: "top"
                              }}
                              rel="noopener noreferrer"
                              to={`/category/read/${category.id}`}
                            >
                              <ClapImage
                                src={category.topWikiImage.shownImage}
                                alt={"hover"}
                                selected={isSelected}
                                {...attributes}
                              />
                            </Link>
                          </Popover>
                        )
                      );
                    } else {
                      return null;
                    }
                  }}
                </GetCategoryById>
              );
            default:
              return;
          }
        }
        default:
          return;
      }
    } else {
      return;
    }
  };
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
)(TextContent);
