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
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true
});

// import EditorDefaults from "../../../EditorDefaults";

// plugins
// import { getCategoryById, getCategoryByIdVariables } from "src/types/api";
// import { Query } from "react-apollo";
// import { CATEGORY } from "src/sharedQueries";
// import { Popover } from "antd";
import FontFamily from "src/Components/BlockIcons/FontFamily";
import FontSize from "src/Components/BlockIcons/FontSize";
import Bold from "src/Components/BlockIcons/Bold";
import Italic from "src/Components/BlockIcons/Italic";
import Underline from "src/Components/BlockIcons/Underline";
import StrikeThrough from "src/Components/BlockIcons/StrikeThrough";
import FontColor from "src/Components/BlockIcons/FontColor";
import BackgroundColor from "src/Components/BlockIcons/BackgroundColor";
import Emoji from "src/Components/BlockIcons/Emoji";
import TextAlignLeft from "src/Components/BlockIcons/TextAlignLeft";
import TextAlignCenter from "src/Components/BlockIcons/TextAlignCenter";
import TextAlignRight from "src/Components/BlockIcons/TextAlignRight";
import TextAlignJustify from "src/Components/BlockIcons/TextAlignJustify";

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
  FontFamily,
  FontSize,
  Bold,
  Italic,
  Underline,
  StrikeThrough,
  FontColor,
  BackgroundColor,
  // FontBgColor,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextAlignJustify,
  Emoji,
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

const customStyleMap = {
  fontFamily1: {
    fontFamily: "Gothic A1, sans-serif"
  },
  fontFamily2: {
    fontFamily: "Nanum Myeongjo, serif"
  },
  fontFamily3: {
    fontFamily: "Nanum Gothic, sans-serif"
  },
  fontFamily4: {
    fontFamily: "Nanum Pen Script, cursive"
  },
  size1: {
    fontSize: "28px"
  },
  size2: {
    fontSize: "19px"
  },
  size3: {
    fontSize: "16px"
  },
  size4: {
    fontSize: "13px"
  },
  size5: {
    fontSize: "11px"
  },
  colorb80000: {
    color: "#B80000"
  },
  colordb3e00: {
    color: "#DB3E00"
  },
  colorfccb00: {
    color: "#FCCB00"
  },
  color008b02: {
    color: "#008B02"
  },
  color006b76: {
    color: "#006B76"
  },
  color1273de: {
    color: "#1273DE"
  },
  color004dcf: {
    color: "#004DCF"
  },
  color5300eb: {
    color: "#5300EB"
  },
  coloreb9694: {
    color: "#EB9694"
  },
  colorfad0c3: {
    color: "#FAD0C3"
  },
  colorfef3bd: {
    color: "#FEF3BD"
  },
  colorc1e1c5: {
    color: "#C1E1C5"
  },
  colorbedadc: {
    color: "#BEDADC"
  },
  colorc4def6: {
    color: "#C4DEF6"
  },
  colorbed3f3: {
    color: "#BED3F3"
  },
  colord4c4fb: {
    color: "#D4C4FB"
  },
  backgroundColorb80000: {
    backgroundColor: "#B80000"
  },
  backgroundColordb3e00: {
    backgroundColor: "#DB3E00"
  },
  backgroundColorfccb00: {
    backgroundColor: "#FCCB00"
  },
  backgroundColor008b02: {
    backgroundColor: "#008B02"
  },
  backgroundColor006b76: {
    backgroundColor: "#006B76"
  },
  backgroundColor1273de: {
    backgroundColor: "#1273DE"
  },
  backgroundColor004dcf: {
    backgroundColor: "#004DCF"
  },
  backgroundColor5300eb: {
    backgroundColor: "#5300EB"
  },
  backgroundColoreb9694: {
    backgroundColor: "#EB9694"
  },
  backgroundColorfad0c3: {
    backgroundColor: "#FAD0C3"
  },
  backgroundColorfef3bd: {
    backgroundColor: "#FEF3BD"
  },
  backgroundColorc1e1c5: {
    backgroundColor: "#C1E1C5"
  },
  backgroundColorbedadc: {
    backgroundColor: "#BEDADC"
  },
  backgroundColorc4def6: {
    backgroundColor: "#C4DEF6"
  },
  backgroundColorbed3f3: {
    backgroundColor: "#BED3F3"
  },
  backgroundColord4c4fb: {
    backgroundColor: "#D4C4FB"
  }
};

const cardTarget = {
  hover(props: IProps, monitor: DropTargetMonitor, component: TextContent) {
    console.log(`hover`);
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
      console.log(hoverBoundingRect);
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
      type: "Text",
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
    props.index === 0 ||
    props.index === 1 ||
    props.index === 7 ||
    props.index === 11 ||
    props.index === 12 ||
    props.index === 16
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
  height: 100%;
  position: relative;
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

interface IEditorWrapperProps {
  textStyle: "alignLeft" | "alignCenter" | "alignRight" | "alignJustify";
}

const EditorWrapper = styled<IEditorWrapperProps, any>("div")`
  position: relative;
  z-index: 2;
  text-align: ${props => props.textStyle};
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
  style: "alignLeft" | "alignCenter" | "alignRight" | "alignJustify";
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
  toolbarRef: any;
  constructor(props: IProps & IDnDSourceProps & IDnDTargetProps) {
    super(props);
    this.dragSource = React.createRef();
    this.editorRef = React.createRef();
    this.wrapperRef = React.createRef();
    this.toolbarRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setEditor = this.setEditor.bind(this);
    this.setToolbar = this.setToolbar.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

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

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  setEditor = (editor: any) => {
    this.editorRef = editor;
  };
  setToolbar = (toolbar: any) => {
    this.toolbarRef = toolbar;
  };

  handleClickOutside(event: any) {
    // console.log(this.wrapperRef, this.wrapperRef.contains(event.target));
    // console.log(this.props.wikiRef, this.props.wikiRef.contains(event.target));
    // console.log(this.toolbarRef, this.toolbarRef.contains(event.target));
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      (this.props.wikiRef && !this.props.wikiRef.contains(event.target)) &&
      (this.toolbarRef && !this.toolbarRef.contains(event.target))
    ) {
      console.log(
        this.props.selectedIndex === this.props.index,
        this.state.isWriteMode
      );
      document.removeEventListener("mousedown", this.handleClickOutside);
      if (this.props.selectedIndex === this.props.index) {
        this.props.masterCallback("unselect");
      }
      if (this.state.isWriteMode) {
        this.editorRef.blur();
        this.setState({ isWriteMode: false });
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
    this.props.callbackfromparent("select", this.props.index);
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({ isWriteMode: false }, () => this.editorRef.blur());
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
      contents: { editorState, style },
      index,
      hoveredIndex,
      selectedIndex,
      gameId,
      // plugins,
      connectDropTarget,
      connectDragSource,
      isDragging
    } = this.props;
    const { toolbarState, isWriteMode } = this.state;
    const hover: boolean = hoveredIndex === index;
    const active: boolean = selectedIndex === index;
    const textContentState = isWriteMode ? "WRITE" : active ? "ACTIVE" : null;
    if (textContentState === "WRITE") {
      this.props.scrollWrapperRef.current.addEventListener(
        "scroll",
        this.handleScrollFn
      );
    } else {
      if (this.props.scrollWrapperRef.current !== null)
        this.props.scrollWrapperRef.current.removeEventListener(
          "scroll",
          this.handleScrollFn
        );
    }
    return (
      <TextContentFrame
        innerRef={(instance: any) => {
          connectDropTarget(instance);
        }}
        isFirstBlock={index === 0}
        device={device}
      >
        <TextContentContainer device={device}>
          <TextContentWrapper
            innerRef={(instance: any) => this.setWrapperRef(instance)}
            textAlign={"left"}
            className={"markdown-body"}
          >
            <DragSourceArea
              className={classnames(
                "container",
                hover && !isDragging ? "blockHover" : null,
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
            <ToolbarWrapper
              innerRef={(instance: any) => this.setToolbar(instance)}
              toolbarState={toolbarState}
            >
              {isWriteMode && (
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
                              style={style}
                            />
                          </ButtonItem>
                        );
                      })}
                    </ButtonWrapper>
                  </ButtonContainer>
                </Toolbar>
              )}
            </ToolbarWrapper>
            <EditorWrapper id={"editor_wrapper"} textStyle={style}>
              <Editor
                customStyleMap={customStyleMap}
                readOnly={false}
                editorState={editorState}
                onChange={this.onChange}
                ref={this.setEditor}
                onFocus={(e: any) => {
                  this.setState({ isWriteMode: true });
                  document.addEventListener(
                    "mousedown",
                    this.handleClickOutside
                  );
                }}
                plugins={plugins}
                // onBlur={() => {
                //   console.log(`onblur`);
                //   // this.setState({ isWriteMode: false });
                // }}
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
                    return null;
                  }
                  if (error) return `${error}`;
                  return null;
                }}
              </GetCategoriesByGameIdQuery>
              <MentionSuggestions
                onSearchChange={this.onSearchChange}
                suggestions={this.state.suggestions}
              />
            </EditorWrapper>
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
