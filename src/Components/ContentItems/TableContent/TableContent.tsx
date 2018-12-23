import * as React from "react";
import styled from "styled-components";
import Delete from "../../BlockIcons/Delete";
import ItemTypes from "../../../ItemTypes";
import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  ConnectDragSource,
  ConnectDragPreview
} from "react-dnd";
import Editor from "draft-js-plugins-editor";
import classnames from "classnames";
import { findDOMNode } from "react-dom";
import createMentionPlugin from "draft-js-mention-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import { getCategoryById, getCategoryByIdVariables } from "src/types/api";
import { Query } from "react-apollo";
import EditorDefaults from "src/EditorDefaults";
import { Popover } from "antd";
import { CATEGORY } from "src/sharedQueries";
const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionComponent: (mentionProps: any) => {
    console.log(mentionProps);
    const { name } = mentionProps.mention;
    return (
      <GetCategoryById
        query={CATEGORY}
        fetchPolicy={"cache-and-network"}
        variables={{ categoryId: mentionProps.mention.id }}
      >
        {({ loading, data, error }) => {
          if (loading)
            return (
              <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
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
                    `ekko`
                    // <HoverView
                    //   json={JSON.parse(
                    //     category.topWikiImage.hoverImage
                    //   )}
                    // />
                  }
                  title={
                    <>
                      <ClapImage
                        src={category.topWikiImage.shownImage}
                        alt={"hover"}
                      />
                      <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                        {category.name}
                      </ClapImageText>
                    </>
                  }
                  trigger="hover"
                >
                  <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                    {mentionProps.children}
                  </ClapImageText>
                </Popover>
              )
            );
          } else return null;
        }}
      </GetCategoryById>
    );
  }
});
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true
});

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

const icons = [Delete];

const cardSource = {
  beginDrag(
    props: IProps,
    monitor: DragSourceMonitor,
    component: TableContent
  ) {
    const node = findDOMNode(component) as Element;
    const rect = node ? (node.getBoundingClientRect() as DOMRect) : null;

    props.masterCallback("isDragging", true);
    props.masterCallback("unselect");
    return {
      index: props.index,
      type: "Table",
      Comp: component,
      width: rect && rect.width,
      height: rect && rect.height
    };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component?: TableContent) {
    props.masterCallback("isDragging", false);
    props.masterCallback("unselect");
    return { index: props.index, Comp: component };
  }
};

interface IClapImageProps {
  selected: boolean;
}

const ClapImage = styled<IClapImageProps, any>("img")`
  width: 20px;
  margin-left: 2px;
  margin-right: 2px;
  max-width: 100%;
  max-height: 20em;
  margin-bottom: -4px;
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

const ClapImageText = styled.span`
  font-weight: bolder;
  color: ${props => props.color};
`;

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

const TableContentWrapper = styled.div`
  position: static;
  display: block;
  /* cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto; */
`;

interface ITableContainerProps {
  TableStyle:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
  currentTableWidth: number;
  currentTableHeight: number;
}

const TableContainer = styled<ITableContainerProps, any>("table")`
  position: relative;
  z-index: 3;
  border: solid #d2d2d2;
  border-width: 1px 0 0 1px;
  width: 100%;
  border-collapse: separate;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableData = styled.td`
  border: solid #d2d2d2;
  border-width: 0 1px 1px 0;
  padding: 5px;
  background-color: #fff;
  vertical-align: middle;
  box-sizing: border-box;
  max-width: 0;
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
    props.index === 0 ||
    props.index === 1 ||
    props.index === 5 ||
    props.index === 6
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
`;

class GetCategoryById extends Query<
  getCategoryById,
  getCategoryByIdVariables
> {}

interface ITableContents {
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
  tableMatrix: any;
}

interface IProps {
  masterCallback: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  contents: ITableContents;
  index: number;
  setTargetIndex: any;
  selected: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  scrollWrapperRef: any;
  callbackfromparent: any;
  handleTableData: any;
}

interface IDnDSourceProps {
  // React-dnd props
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

class TableContent extends React.Component<IProps & IDnDSourceProps, any> {
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

  public render() {
    const {
      index,
      hoveredIndex,
      selectedIndex,
      callbackfromparent,
      selected,
      contents
    } = this.props;
    const { isDragging, connectDragSource } = this.props;
    const { toolbarState } = this.state;
    const { style, tableMatrix } = contents;
    const hover: boolean = hoveredIndex === index;
    const active: boolean = selectedIndex === index;
    console.log(contents);
    return (
      <TableContentWrapper
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
                  {icons.map((Type, i) => {
                    return (
                      <ButtonItem key={i} index={i}>
                        <Type
                          callbackfromparent={callbackfromparent}
                          index={index}
                          key={i}
                        />
                      </ButtonItem>
                    );
                  })}
                </ButtonWrapper>
              </ButtonContainer>
            </Toolbar>
          </ToolbarWrapper>
        )}
        <TableContainer className="content" TableStyle={style}>
          <tbody>
            {tableMatrix.map((tableRow: any, row: number) => {
              return (
                <tr key={row}>
                  {tableRow.map((tableData: any, col: number) => {
                    return (
                      <TableData
                        style={{
                          width: tableData.width,
                          height: tableData.height
                        }}
                        key={col}
                      >
                        <Editor
                          customStyleMap={customStyleMap}
                          readOnly={false}
                          editorState={tableData.editorState}
                          onChange={(editorState: any) =>
                            this.props.handleTableData(
                              "editorState",
                              index,
                              row,
                              col,
                              editorState
                            )
                          }
                          onFocus={(e: any) => {
                            this.setState({ isWriteMode: true });
                            this.props.masterCallback("unselect");
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
                      </TableData>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </TableContainer>
      </TableContentWrapper>
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
)(TableContent);
