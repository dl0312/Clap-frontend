import * as React from "react";
import { Value, ValueJSON } from "slate";
import ButtonContent from "../ContentItems/ButtonContent";
import TextContent from "../ContentItems/TextContent";
import DividerContent from "../ContentItems/DividerContent";
import HtmlContent from "../ContentItems/HtmlContent";
import ImageContent from "../ContentItems/ImageContent";
import VideoContent from "../ContentItems/VideoContent";
import SocialMediaContent from "../ContentItems/SocialMediaContent";

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

interface IProps {
  containerItem: {
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
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
}

interface IState {
  hover: boolean;
  active: boolean;
  toolHover: boolean;
}

class UserContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hover: false,
      active: false,
      toolHover: false
    };
  }

  public showInner = () => {
    switch (this.props.containerItem.content) {
      case "BUTTON":
        let value = null;
        if (!Value.isValue(this.props.containerItem.value)) {
          value = Value.fromJSON(this.props.containerItem.value);
        } else {
          value = this.props.containerItem.value;
        }
        return (
          <ButtonContent
            item={this.props.containerItem}
            value={value}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "DIVIDER":
        return <DividerContent />;
      case "HTML":
        if (!Value.isValue(this.props.containerItem.value)) {
          value = Value.fromJSON(this.props.containerItem.value);
        } else {
          value = this.props.containerItem.value;
        }
        return (
          <HtmlContent
            value={value}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "IMAGE":
        return (
          <ImageContent
            src={this.props.containerItem.imageSrc}
            alt={this.props.containerItem.alt}
            link={this.props.containerItem.link}
            fullWidth={this.props.containerItem.fullWidth}
          />
        );
      case "TEXT":
        if (!Value.isValue(this.props.containerItem.value)) {
          value = Value.fromJSON(this.props.containerItem.value);
        } else {
          value = this.props.containerItem.value;
        }
        return (
          <TextContent
            value={value}
            item={this.props.containerItem}
            plugins={plugins}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
          />
        );
      case "VIDEO":
        return (
          <VideoContent
            src={this.props.containerItem.videoSrc!}
            autoplay={false}
          />
        );
      case "SOCIAL":
        return <SocialMediaContent />;
      default:
        return null;
    }
  };

  public render() {
    return (
      <div
        className={"container"}
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          padding: "5px",
          width: "100%",
          cursor: "grab",
          justifyContent:
            this.props.containerItem.content === "TEXT" ||
            this.props.containerItem.content === "BUTTON" ||
            this.props.containerItem.content === "HTML" ||
            this.props.containerItem.content === "IMAGE" ||
            this.props.containerItem.content === "VIDEO"
              ? this.props.containerItem.align
                ? this.props.containerItem.align
                : "center"
              : "center",
          transition: "border 0.5s ease, opacity 0.5s ease",
          borderRadius: "2px"
        }}
      >
        {this.showInner()}
      </div>
    );
  }
}

export default UserContainer;
