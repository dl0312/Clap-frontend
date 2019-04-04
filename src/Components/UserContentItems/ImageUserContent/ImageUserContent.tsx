import * as React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const ImageContentWrapper = styled.div`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IImageContainerProps {
  imageStyle:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
  currentImageWidth: number;
  currentImageHeight: number;
}

const ImageContainer = styled<IImageContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  max-width: ${props =>
    props.imageStyle === "fullWidth" ? null : `${props.currentImageWidth}px`};
  margin-left: ${props =>
    props.imageStyle === "alignCenter" || props.imageStyle === "alignRight"
      ? "auto"
      : null};
  margin-right: ${props =>
    props.imageStyle === "alignCenter" || props.imageStyle === "alignLeft"
      ? "auto"
      : null};
  width: ${props => (props.imageStyle === "fullWidth" ? "100%" : null)};
`;

interface IDescriptionContainerProps {
  imageStyle:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
}

const DescriptionContainer = styled<IDescriptionContainerProps, any>("div")`
  position: relative;
  z-index: 2;
  text-align: ${props =>
    props.imageStyle === "fullWidth"
      ? "center"
      : props.imageStyle === "alignLeft"
      ? "left"
      : props.imageStyle === "alignCenter"
      ? "center"
      : props.imageStyle === "alignRight"
      ? "right"
      : null};
`;

const Description = styled(TextareaAutosize)`
  border: none;
  resize: none;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
  text-align: inherit;
  width: 100%;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  contents: IImageContents;
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

class ImageUserContent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const { contents } = this.props;
    const {
      imageUrl,
      style,
      description,
      currentImageWidth,
      currentImageHeight
    } = contents;
    return (
      <ImageContentWrapper>
        <ImageContainer
          className="content"
          imageStyle={style}
          currentImageWidth={currentImageWidth}
          currentImageHeight={currentImageHeight}
        >
          <img
            style={{
              maxWidth: style === "fullWidth" ? "inherit" : "100%",
              position: "relative",
              verticalAlign: "top",
              // height: "100%",
              width: style === "fullWidth" ? "100%" : undefined
            }}
            src={imageUrl}
            alt="logo"
          />
          <DescriptionContainer imageStyle={style}>
            <Description value={description} />
          </DescriptionContainer>
        </ImageContainer>
      </ImageContentWrapper>
    );
  }
}

export default ImageUserContent;
