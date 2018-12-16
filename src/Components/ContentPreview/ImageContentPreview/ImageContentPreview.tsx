import * as React from "react";
import styled from "styled-components";

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
  currWidth: number;
  currHeight: number;
}

const ImageContainer = styled<IImageContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  max-width: ${props =>
    props.imageStyle === "fullWidth" ? null : `${props.currWidth}px`};
  margin-left: ${props =>
    props.imageStyle === "alignCenter" || props.imageStyle === "alignRight"
      ? "auto"
      : null};
  margin-right: ${props =>
    props.imageStyle === "alignCenter" || props.imageStyle === "alignLeft"
      ? "auto"
      : null};
  width: 100%;
  height: 100%;
`;

const DragSourceArea = styled.div`
  background-color: rgba(0, 0, 0, 0.08);
  -webkit-transition-property: opacity, background;
  transition-property: opacity, background;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
`;

interface IProps {
  index: number;
  contents: IImageContents;
  handleOnChange?: any;
  selected?: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  callbackfromparent: any;
  handleOnClickImageChange: any;
  editorRef: any;
  masterCallback: any;

  width: number;
  height: number;
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
}

class ImageContentPreview extends React.Component<IProps, any> {
  public render() {
    const { contents, width, height } = this.props;
    const { imageUrl, style } = contents;
    return (
      <>
        <DragSourceArea />
        <ImageContainer
          className="content"
          imageStyle={style}
          currWidth={width}
          currHeight={height}
        >
          <img
            style={{
              maxWidth: style === "fullWidth" ? "inherit" : "100%",
              position: "relative",
              verticalAlign: "top",
              height: "100%",
              width: style === "fullWidth" ? "100%" : "auto"
            }}
            src={imageUrl}
            alt="logo"
          />
        </ImageContainer>
      </>
    );
  }
}

export default ImageContentPreview;
