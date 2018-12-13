import * as React from "react";
// import EditorDefaults from "../../EditorDefaults";
// import ContentBox from "../ContentBox";

// import ButtonContent from "../ContentItems/ButtonContent";
import TextContent from "../ContentItems/TextContent";
// import DividerContent from "../ContentItems/DividerContent";
// import HtmlContent from "../ContentItems/HtmlContent";
// import ImageContent from "../ContentItems/ImageContent";
// import VideoContent from "../ContentItems/VideoContent";
// import SocialMediaContent from "../ContentItems/SocialMediaContent";

import ImageContent from "../ContentItems/ImageContent";
import VideoContent from "../ContentItems/VideoContent";
import { EditorState } from "draft-js";

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
  setInitialImageContents: any;
  changeImageSizeFromCurrentToTarget: any;
  gameId: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
  wikiRef: any;
  scrollWrapperRef: any;
  activeEditorRef: any;
}

interface ITextContents {
  editorState: EditorState;
  style: "alignLeft" | "alignCenter" | "alignRight" | "alignJustify";
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
            scrollWrapperRef={this.props.scrollWrapperRef}
          />
        );
      case "Text":
        return (
          <TextContent
            index={this.props.index}
            device={this.props.device}
            contents={this.props.contents}
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
            gameId={this.props.gameId}
            wikiRef={this.props.wikiRef}
            scrollWrapperRef={this.props.scrollWrapperRef}
            activeEditorRef={this.props.activeEditorRef}
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
