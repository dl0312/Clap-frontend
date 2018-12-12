import * as React from "react";
import styled from "styled-components";
import classnames from "classnames";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
const mentionPlugin = createMentionPlugin();
const emojiPlugin = createEmojiPlugin();
// import EditorDefaults from "../../../EditorDefaults";

// plugins
// import { getCategoryById, getCategoryByIdVariables } from "src/types/api";
// import { Query } from "react-apollo";
// import { CATEGORY } from "src/sharedQueries";
// import { Popover } from "antd";
import Bold from "src/Components/BlockIcons/Bold";
import Italic from "src/Components/BlockIcons/Italic";
import Underline from "src/Components/BlockIcons/Underline";
import StrikeThrough from "src/Components/BlockIcons/StrikeThrough";
import Emoji from "src/Components/BlockIcons/Emoji";

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
import {
  getCategoriesByGameId,
  getCategoriesByGameIdVariables
} from "src/types/api";
import { Query } from "react-apollo";
import { GET_CATEGORIES_BY_GAME_ID } from "src/sharedQueries";

// import { Link } from "react-router-dom";
// import HoverView from "src/Components/HoverView";

const icons = [
  // Header1,
  // Header2,
  Bold,
  Italic,
  Underline,
  StrikeThrough,
  Emoji,
  // FontBgColor,
  // FontColor,
  // AlignLeft,
  // AlignCenter,
  // AlignRight,
  // Blockquote,
  // // Clean,
  // // Code,
  // // CodeBlock,
  // // Emoji,
  // Hr,
  // // Image,
  // Video,
  // // Indent,
  // // Outdent,
  // Link,
  // // OlList,
  // // UlList,
  // Table,
  Delete
  // Undo,
  // Redo
];

const plugins = [mentionPlugin, emojiPlugin];

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

// interface IClapImageProps {
//   small: boolean;
// }

// const ClapImage = styled<IClapImageProps, any>("img")`
//   width: ${props => (props.small ? "20px" : null)};
//   margin-left: ${props => (props.small ? "2px" : null)};
//   margin-right: ${props => (props.small ? "2px" : null)};
//   max-width: 100%;
//   max-height: 20em;
//   margin-bottom: ${props => (props.small ? "-4px" : null)};
// `;

// const ClapImageText = styled.span`
//   font-weight: bolder;
//   color: ${props => props.color};
// `;

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
  top: ${props => (props.toolbarState === "sticky" ? "-16px" : "-56px")};
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
    props.index === 3 ||
    props.index === 4 ||
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

// class GetCategoryById extends Query<
//   getCategoryById,
//   getCategoryByIdVariables
// > {}

interface ITextContents {
  editorState: EditorState;
}

class GetCategoriesByGameIdQuery extends Query<
  getCategoriesByGameId,
  getCategoriesByGameIdVariables
> {}

interface IProps {
  index: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
  contents: ITextContents;
  selected?: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  callbackfromparent: any;
  masterCallback: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  setTargetIndex: any;
  handleOnChange?: any;
  wikiRef: any;
  scrollWrapperRef: any;
  activeEditorRef: any;
  gameId: any;
}
interface IState {
  toolbarState: "follow" | "sticky" | "blind";
  isWriteMode: boolean;
  suggestions: any;
  mentions: any;
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
  editorRef: any;
  setEditor: any;
  focusEditor: any;
  constructor(props: IProps & IDnDSourceProps & IDnDTargetProps) {
    super(props);
    this.dragSource = React.createRef();
    this.editorRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.setEditor = (editor: any) => {
      this.editorRef = editor;
    };
    this.focusEditor = (e: any) => {
      e.preventDefault();
      this.setState({ isWriteMode: true });
      // if (this.editorRef) {
      //   this.editorRef.focus();
      // }
    };
    this.state = {
      toolbarState: "follow",
      isWriteMode: false,
      suggestions: [],
      mentions: []
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
    this.props.scrollWrapperRef.current.addEventListener(
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
    if (this.props.scrollWrapperRef.current !== null)
      this.props.scrollWrapperRef.current.removeEventListener(
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
        this.editorRef.blur();
      }
    }
  }

  onChange = (editorState: any) => {
    this.props.handleOnChange(editorState, this.props.index, "editorState");
  };

  onSearchChange = ({ value }: any) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, this.state.mentions)
    });
  };

  onAddMention = () => {
    // get the mention object selected
  };

  /* In case, Mouse Over Container */
  public handleOnMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("mouseover", this.props.index);
  };

  /* In case, Mouse Don Container */
  public handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.editorRef.blur();
    this.props.callbackfromparent("select", this.props.index);
  };

  /* In case, Mouse Leave Container */
  public handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.callbackfromparent("mouseleave", this.props.index);
  };

  public render() {
    const { MentionSuggestions } = mentionPlugin;
    const {
      device,
      contents: { editorState },
      index,
      hoveredIndex,
      selectedIndex,
      gameId,
      // plugins,
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
      this.props.scrollWrapperRef.current.addEventListener(
        "scroll",
        this.handleScrollFn
      );
    } else {
      document.removeEventListener("mousedown", this.handleClickOutside);
      if (this.props.scrollWrapperRef.current !== null)
        this.props.scrollWrapperRef.current.removeEventListener(
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
            <ToolbarWrapper toolbarState={toolbarState}>
              <Toolbar toolbarState={toolbarState}>
                <ButtonContainer>
                  <ButtonWrapper toolbarState={toolbarState}>
                    {icons.map((Type, i) => {
                      return (
                        <ButtonItem key={i} index={i}>
                          <Type
                            handleOnChange={this.props.handleOnChange}
                            callbackfromparent={this.props.callbackfromparent}
                            index={index}
                            editorState={editorState}
                            plugins={plugins}
                            active={editorState
                              .getCurrentInlineStyle()
                              .has(Type.name.toUpperCase())}
                          />
                        </ButtonItem>
                      );
                    })}
                  </ButtonWrapper>
                </ButtonContainer>
              </Toolbar>
            </ToolbarWrapper>
            <div style={{ position: "relative", zIndex: 2 }}>
              <Editor
                readOnly={false}
                editorState={editorState}
                onChange={this.onChange}
                ref={this.setEditor}
                textAlignment={"Right"}
                // onFocus={(e: any) => {
                // e.preventDefault();
                // if (!this.state.isWriteMode) {
                //   this.setState({ isWriteMode: true });
                // }
                // }}
                plugins={plugins}
                onBlur={() => this.setState({ isWriteMode: false })}
              />
              <GetCategoriesByGameIdQuery
                query={GET_CATEGORIES_BY_GAME_ID}
                variables={{ gameId }}
                onCompleted={data => {
                  if ("GetCategoriesByGameId" in data) {
                    const {
                      GetCategoriesByGameId: { categories }
                    } = data;
                    if (categories !== null) {
                      this.setState({
                        mentions: categories.map((category, index) => {
                          return {
                            name: category && category.name,
                            avatar:
                              category &&
                              category.topWikiImage &&
                              category.topWikiImage.shownImage
                          };
                        })
                      });
                    }
                  }
                }}
              >
                {({ loading, error, data }) => {
                  if (loading) {
                    return `Loading`;
                  }
                  if (error) return `${error}`;
                  return null;
                }}
              </GetCategoriesByGameIdQuery>
              <MentionSuggestions
                onSearchChange={this.onSearchChange}
                suggestions={this.state.suggestions}
              />
            </div>
          </TextContentWrapper>
        </TextContentContainer>
      </TextContentFrame>
    );
  }
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
