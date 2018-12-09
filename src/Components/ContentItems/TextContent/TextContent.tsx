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
  opacity: 1;
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

const TextEditorButtonContainer = styled.div`
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

interface ITextEditorButtonProps {
  index: number;
}

const TextEditorButton = styled<ITextEditorButtonProps, any>("div")`
  border-right: ${props =>
    props.index === 1 ||
    props.index === 7 ||
    props.index === 11 ||
    props.index === 15
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
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
  masterCallback: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  setTargetIndex: any;
  handleOnChange?: any;
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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  handleClickOutside(event: any) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
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
      // handleOnChange,
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
              <Toolbar toolbarState={toolbarState} className="toolbar">
                <TextEditorButtonContainer>
                  {icons.map((Type, i) => {
                    return (
                      <TextEditorButton key={i} index={i}>
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
                      </TextEditorButton>
                    );
                  })}
                </TextEditorButtonContainer>
              </Toolbar>
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
          const name = node.data.get("name");
          const type = node.data.get("type");
          const id = node.data.get("id");
          console.log(id);
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
                                textDecoration: "none"
                              }}
                              rel="noopener noreferrer"
                              to={`/category/read/${category.id}`}
                            >
                              <ClapImageText
                                color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                              >
                                {name}
                              </ClapImageText>
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
                                textDecoration: "none"
                              }}
                              rel="noopener noreferrer"
                              to={`/category/read/${category.id}`}
                            >
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
