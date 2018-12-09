import * as React from "react";
import { Value } from "slate";
// import EditorDefaults from "../../EditorDefaults";
// import ContentBox from "../ContentBox";

// import ButtonContent from "../ContentItems/ButtonContent";
import TextContent from "../ContentItems/TextContent";
// import DividerContent from "../ContentItems/DividerContent";
// import HtmlContent from "../ContentItems/HtmlContent";
// import ImageContent from "../ContentItems/ImageContent";
// import VideoContent from "../ContentItems/VideoContent";
// import SocialMediaContent from "../ContentItems/SocialMediaContent";

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
import ImageContent from "../ContentItems/ImageContent";
import VideoContent from "../ContentItems/VideoContent";

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
  // Action to Parent Component
  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number
  ) => void;
  masterCallback: any;
  moveCard: any;
  handleDrop: (hoverItem: any, hoverIndex: number) => void;
  handleOnChange: any;
  index: number;
  type: "Text" | "Image" | "Video" | "Table" | "Divider";
  contents: ITextContents & IImageContents & IVideoContents;
  // // For Content Render
  selectedIndex: number | null;
  hoveredIndex: number | null;
  // onDrag: "content" | "columnList";
  // contentWidth: number;
  // renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  // renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
  setTargetIndex: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  handleOnClickImageChange: any;
  editorRef: any;
  setInitialImageContents: any;
  changeImageSizeFromCurrentToTarget: any;
  device: "PHONE" | "TABLET" | "DESKTOP";
}

interface ITextContents {
  slateData: any;
}

interface IImageContents {
  slateData?: any;
  imageUrl: string;
  description: string;
  isUploaded: boolean | null;
  link: string | null;
  libraryIndex: number;
  style:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
  naturalImageWidth: number;
  naturalImageHeight: number;
  currentImageWidth: number;
  currentImageHeight: number;
}

interface IVideoContents {
  videoUrl: string | null;
  description: string | null;
  width: number;
  height: number;
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

class Container extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  public showInner = (selected: boolean) => {
    switch (this.props.type) {
      case "Image":
        return (
          <ImageContent
            index={this.props.index}
            device={this.props.device}
            selected={selected}
            hoveredIndex={this.props.hoveredIndex}
            selectedIndex={this.props.selectedIndex}
            contents={this.props.contents}
            handleOnChange={this.props.handleOnChange}
            callbackfromparent={this.props.callbackfromparent}
            handleOnClickImageChange={this.props.handleOnClickImageChange}
            editorRef={this.props.editorRef}
            masterCallback={this.props.masterCallback}
            setInitialImageContents={this.props.setInitialImageContents}
            changeImageSizeFromCurrentToTarget={
              this.props.changeImageSizeFromCurrentToTarget
            }
            pushPresentBlockToTargetIndex={
              this.props.pushPresentBlockToTargetIndex
            }
            pushNewBlockToTargetIndex={this.props.pushNewBlockToTargetIndex}
            setTargetIndex={this.props.setTargetIndex}
          />
        );
      case "Text":
        if (!Value.isValue(this.props.contents.slateData)) {
          const slatifiedData = Value.fromJSON(this.props.contents.slateData);
          console.log(slatifiedData);
          this.props.handleOnChange(
            { slatifiedData },
            this.props.index,
            "TEXT_CHANGE"
          );
        } else {
          // console.log(`data is slate friendly`);
        }
        return (
          <TextContent
            index={this.props.index}
            device={this.props.device}
            contents={this.props.contents}
            plugins={plugins}
            selected={selected}
            hoveredIndex={this.props.hoveredIndex}
            selectedIndex={this.props.selectedIndex}
            handleOnChange={this.props.handleOnChange}
            callbackfromparent={this.props.callbackfromparent}
            masterCallback={this.props.masterCallback}
            pushPresentBlockToTargetIndex={
              this.props.pushPresentBlockToTargetIndex
            }
            pushNewBlockToTargetIndex={this.props.pushNewBlockToTargetIndex}
            setTargetIndex={this.props.setTargetIndex}
          />
        );
      case "Video":
        return <VideoContent contents={this.props.contents} autoplay={false} />;
      // case "Social":
      //   return <SocialMediaContent />;
      default:
        return null;
    }
  };

  public render() {
    const { index, selectedIndex } = this.props;
    let active: boolean = false;
    active = selectedIndex === index;
    return <>{this.showInner(active)}</>;
  }
  // public handleClickOutside = () => {
  //   this.props.masterCallback("deselect");
  // };
}

export default Container;
