import React from "react";
import { EditorState } from "draft-js";
import styled from "src/typed-components";
import TextUserContent from "../UserContentItems/TextUserContent";
import ImageUserContent from "../UserContentItems/ImageUserContent";
import VideoUserContent from "../UserContentItems/VideoUserContent";
import DividerUserContent from "../UserContentItems/DividerUserContent";
import TableUserContent from "../UserContentItems/TableUserContent";

interface IContentFrameProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
  isFirstBlock: boolean;
}

const ContentFrame = styled<IContentFrameProps, any>("div")`
  /* padding: ${props => (props.device === "PHONE" ? "7px 0" : "10px 0")}; */
  padding :10px 0;
`;

const ContentContainer = styled.div`
  position: relative;
  margin: 0 auto;
  /* cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto; */
`;

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
  slateData?: any;
  videoUrl: string;
  description: string;
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

interface IDividerContents {
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

interface ITableContents {
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
  tableMatrix: any;
}

interface IProps {
  index: number;
  type: "Text" | "Image" | "Video" | "Table" | "Divider";
  contents: ITextContents &
    IImageContents &
    IVideoContents &
    IDividerContents &
    ITableContents;
}

export default class UserContainer extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  public showInner = () => {
    switch (this.props.type) {
      case "Image":
        return <ImageUserContent contents={this.props.contents} />;
      case "Text":
        return <TextUserContent contents={this.props.contents} />;
      case "Video":
        return <VideoUserContent contents={this.props.contents} />;
      case "Divider":
        return <DividerUserContent contents={this.props.contents} />;
      case "Table":
        return <TableUserContent contents={this.props.contents} />;
      default:
        return null;
    }
  };

  public render() {
    const { index } = this.props;
    return (
      <ContentFrame isFirstBlock={index === 0}>
        <ContentContainer>{this.showInner()}</ContentContainer>
      </ContentFrame>
    );
  }
}
