import React from "react";
import EditorLeft from "../EditorLeft";
import styled from "styled-components";
import { Value, ValueJSON } from "slate";
import EditorDefaults from "../../EditorDefaults";
import ImagePopup from "../ImagePopup";
import { GetPos } from "../../Utility/GetPos";

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

import EditPrism from "slate-prism";
import EditCode from "slate-edit-code";
import TrailingBlock from "slate-trailing-block";
import EditTable from "slate-edit-table";
import { RenderMarkProps, RenderNodeProps } from "slate-react";
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
  VideoPlugin()
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

interface IClapImageContainerProps {
  small: boolean;
}

const ClapImageContainer = styled<IClapImageContainerProps, any>("span")`
  margin-left: ${props => (props.small ? "2px" : null)};
  margin-right: ${props => (props.small ? "2px" : null)};
  cursor: pointer;
`;

const ClapImageText = styled.span`
  font-weight: bolder;
  color: ${props => props.color};
`;

interface IUserViewProps {
  json: {
    rightMenu: number | null;
    view: "EDIT" | "USER" | "JSON";
    bodyBackgroundColor: { r: number; g: number; b: number; a: number };
    contentWidth: number;
    font: string | null;
    onDrag: "content" | "columnList" | null;
    selectedIndex: number | number[] | null;
    hoveredIndex: number | number[] | null;
    selectedContent: any;
    hoverImgJson: any;
    onImage: boolean;
    exShownImg: { url: string; id: string };
    pos: { x: number; y: number };
    title: string;
    category: number[];
    cards: any[];
  };
}

interface IState {
  pos: { x: number; y: number };
  hoverImgJson: any;
  onImage: boolean;
}

class UserView extends React.Component<IUserViewProps, IState> {
  constructor(props: IUserViewProps) {
    super(props);
    this.state = { pos: { x: 0, y: 0 }, hoverImgJson: null, onImage: false };
  }
  public renderNode = (props: RenderNodeProps): JSX.Element | undefined => {
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
          const representSrc = node.data.get("represent");
          const hoverSrc = node.data.get("hover");
          const name = node.data.get("name");
          const type = node.data.get("type");
          switch (type) {
            case "TEXT":
              return (
                <ClapImageContainer
                  onMouseOver={() =>
                    this.setState({
                      hoverImgJson: hoverSrc,
                      onImage: true
                    })
                  }
                  onMouseMove={(e: React.MouseEvent<HTMLImageElement>) =>
                    this.setState({ pos: GetPos(e) })
                  }
                  onMouseOut={() => {
                    this.setState({ onImage: false });
                  }}
                  small={true}
                >
                  <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                    {name}
                  </ClapImageText>
                </ClapImageContainer>
              );
            case "MINI_IMG":
              return (
                <ClapImageContainer
                  onMouseOver={() =>
                    this.setState({
                      hoverImgJson: hoverSrc,
                      onImage: true
                    })
                  }
                  onMouseMove={(e: React.MouseEvent<HTMLImageElement>) =>
                    this.setState({ pos: GetPos(e) })
                  }
                  onMouseOut={() => {
                    this.setState({ onImage: false });
                  }}
                  small={true}
                >
                  <ClapImage
                    small={true}
                    src={representSrc}
                    alt={"hover"}
                    selected={isSelected}
                    {...attributes}
                  />
                  <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                    {name}
                  </ClapImageText>
                </ClapImageContainer>
              );
            case "NORMAL_IMG":
              return (
                <ClapImage
                  src={`http://localhost:4000/uploads/${representSrc}`}
                  alt={"hover"}
                  selected={isSelected}
                  onMouseOver={() =>
                    this.setState({
                      hoverImgJson: hoverSrc,
                      onImage: true
                    })
                  }
                  onMouseMove={(e: React.MouseEvent<HTMLImageElement>) =>
                    this.setState({ pos: GetPos(e) })
                  }
                  onMouseOut={() => {
                    this.setState({ onImage: false });
                  }}
                  {...attributes}
                />
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

  public renderMark = (props: RenderMarkProps): JSX.Element | undefined => {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return;
    }
  };
  public render() {
    const { json } = this.props;
    const { pos, hoverImgJson, onImage } = this.state;
    return (
      <EditorLeft
        bodyBackgroundColor={json.bodyBackgroundColor}
        contentWidth={json.contentWidth}
        font={json.font}
        view="USER"
      >
        {json.cards.map((item, index) => {
          return (
            <UserCard key={index}>
              <UserColumn
                columnArray={item.content}
                columnListArray={item.columnListArray}
                index={[index, 0, 0]}
                renderNode={this.renderNode}
                renderMark={this.renderMark}
                contentWidth={json.contentWidth}
              />
            </UserCard>
          );
        })}
        <ImagePopup
          pos={pos}
          json={hoverImgJson ? hoverImgJson : null}
          onImage={onImage}
        />
      </EditorLeft>
    );
  }
}

export default UserView;

class UserCard extends React.Component {
  public render() {
    return (
      <div
        style={{
          backgroundColor: "transparent",
          width: "99%",
          position: "relative",
          padding: "0.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        className="frame"
      >
        {this.props.children}
      </div>
    );
  }
}

interface IUserColumnProps {
  columnArray: any[];
  columnListArray: any[];
  index: number[];
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;

  contentWidth: number;
}

class UserColumn extends React.Component<IUserColumnProps> {
  constructor(props: IUserColumnProps) {
    super(props);
    this.state = {};
  }

  public render() {
    let totalRatio = 0;
    this.props.columnArray.map(column => (totalRatio += column));
    const columnListStyle = {
      width: this.props.contentWidth,
      display: "grid",
      gridGap: "0px", // gridTemplateColumns: this.props.columnArray.join("fr ") + "fr"
      gridTemplateColumns:
        this.props.columnArray
          .map(
            (columnRatio, index) =>
              (this.props.contentWidth * columnRatio) / totalRatio
          )
          .join("px ") + "px"
    };
    return (
      <div className="columnList" style={columnListStyle}>
        {this.props.columnListArray.map((columnList, index) => (
          <UserColumnItem
            key={index}
            cards={columnList}
            index={this.props.index.slice(0, 1).concat(index)}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
            contentWidth={this.props.contentWidth}
          />
        ))}
      </div>
    );
  }
}

const Column = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

interface IUserColumnItemProps {
  cards: any[];
  index: number[];
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;

  contentWidth: number;
}

class UserColumnItem extends React.Component<IUserColumnItemProps> {
  constructor(props: IUserColumnItemProps) {
    super(props);
    this.state = {};
  }

  public render() {
    // 기본상태의 에디터화면 id=container, id=body
    const { contentWidth, cards } = this.props;

    const compArray: any[] = [];
    cards.map((item, index) => {
      switch (item.type) {
        case "content":
          compArray.push(
            <UserContainer
              item={item}
              index={this.props.index.concat(index)}
              key={index}
              contentWidth={contentWidth}
              renderNode={this.props.renderNode}
              renderMark={this.props.renderMark}
            />
          );
          break;
        default:
          break;
      }
    });

    return <Column>{compArray}</Column>;
  }
}

interface IUserContainerProps {
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
  index: number[];
  contentWidth: number;
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
}

class UserContainer extends React.Component<IUserContainerProps> {
  constructor(props: IUserContainerProps) {
    super(props);
    this.state = {};
  }

  public showInner = () => {
    switch (this.props.item.content) {
      case "BUTTON":
        let value: Value | null = null;
        if (!Value.isValue(this.props.item.value)) {
          value = Value.fromJSON(this.props.item.value);
        } else {
          value = this.props.item.value;
        }
        return (
          <Button
            item={this.props.item}
            value={value}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "DIVIDER":
        return <Divider />;
      case "HTML":
        if (!Value.isValue(this.props.item.value)) {
          value = Value.fromJSON(this.props.item.value);
        } else {
          value = this.props.item.value;
        }
        return (
          <Html
            value={value}
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
        } else {
          value = this.props.item.value;
        }
        return (
          <Text
            value={value}
            item={this.props.item}
            plugins={plugins}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "VIDEO":
        return <Video src={this.props.item.videoSrc} autoplay={false} />;
      case "SOCIAL":
        return <SocialMedia />;
      default:
        return null;
    }
  };

  public render() {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
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
          position: "relative",
          padding: "10px",
          width: "100%"
        }}
      >
        {this.showInner()}
      </div>
    );
  }
}
