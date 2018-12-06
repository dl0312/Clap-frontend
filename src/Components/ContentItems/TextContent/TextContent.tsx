import * as React from "react";
import styled from "styled-components";
import { Editor, Plugin } from "slate-react";
import EditorDefaults from "../../../EditorDefaults";
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
  top: -38px;
  left: -1.5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

interface ITextEditorButtonProps {
  index: number;
}

const TextEditorButton = styled<ITextEditorButtonProps, any>("div")`
  &:hover {
    background-color: #ebebeb;
  }
  border-right: ${props =>
    props.index === 1 ||
    props.index === 7 ||
    props.index === 11 ||
    props.index === 15
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
`;

interface ITextContainerProps {
  textColor: { r: string; g: string; b: string; a: string };
  textAlign: "left" | "center" | "right";
}

const TextContainer = styled<ITextContainerProps, any>("div")`
  text-align: ${props => props.textAlign};
  width: 100%;
  cursor: auto;
  line-height: 1.9;
`;

class GetCategoryById extends Query<
  getCategoryById,
  getCategoryByIdVariables
> {}

interface ITextContents {
  slateData: any;
}

interface IProps {
  index: number;
  contents: ITextContents;
  plugins: Plugin[];
  handleOnChange?: any;
  selected?: boolean;
  callbackfromparent: any;
}

class TextContent extends React.Component<IProps, any> {
  onChange = (change: any) => {
    this.props.handleOnChange(change, this.props.index, "slateData");
  };

  public render() {
    const {
      contents: { slateData },
      plugins,
      handleOnChange,
      selected,
      index
    } = this.props;
    return (
      <TextContainer textAlign={"left"} className="markdown-body">
        {handleOnChange !== undefined ? (
          <React.Fragment>
            {selected && (
              <div className="toolbar">
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
              </div>
            )}
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
          </React.Fragment>
        ) : (
          <Editor
            style={{
              wordBreak: "break-word",
              fontSize: "16px",
              color: EditorDefaults.MAIN_TEXT_COLOR
            }}
            value={slateData}
            readOnly={true}
            renderNode={this.renderNode}
            autoCorrect={false}
            spellCheck={false}
            plugins={plugins}
          />
        )}
      </TextContainer>
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

export default TextContent;
