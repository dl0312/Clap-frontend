import * as React from "react";
import styled from "styled-components";
import Delete from "src/Components/BlockIcons/Delete";
import ImageChange from "src/Components/BlockIcons/ImageChange";
import FullWidth from "src/Components/BlockIcons/FullWidth";
import AlignLeft from "src/Components/BlockIcons/AlignLeft";
import AlignCenter from "src/Components/BlockIcons/AlignCenter";
import AlignRight from "src/Components/BlockIcons/AlignRight";
import TextareaAutosize from "react-textarea-autosize";
import { findDOMNode } from "react-dom";

const icons = [
  ImageChange,
  FullWidth,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Delete
];

interface IToolbarProps {
  isNearbyTop: boolean;
}

const Toolbar = styled<IToolbarProps, any>("div")`
  transform: ${props => (props.isNearbyTop ? "translateX(-10px)" : null)};
  top: ${props => (props.isNearbyTop ? "125px" : "0px")};
  position: ${props => (props.isNearbyTop ? "fixed" : "static")};
  max-width: ${props => (props.isNearbyTop ? "886px" : null)};
  width: 100%;
  margin: 0 auto;
  z-index: 1000;
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
  width: number;
  height: number;
}

const ImageContainer = styled<IImageContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  max-width: ${props =>
    props.imageStyle === "fullWidth" ? null : `${props.width}px`};
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

const ImageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px 2px 0 0;
  line-height: 0px !important;
  background-color: #fff;
  position: absolute;
  z-index: 100;
  top: -33px;
  left: -1.5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

interface IImageButtonProps {
  index: number;
}

const ImageButton = styled<IImageButtonProps, any>("div")`
  &:hover {
    background-color: #ebebeb;
  }
  border-right: ${props =>
    props.index === 0 || props.index === 4
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
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
  &:focus {
    outline: none;
  }
`;

interface IProps {
  index: number;
  contents: IImageContents;
  handleOnChange?: any;
  selected?: boolean;
  callbackfromparent: any;
  handleOnClickImageChange: any;
  editorRef: any;
}

interface IState {
  width: number;
  height: number;
  isNearbyTop: boolean;
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

class ImageContent extends React.Component<IProps, IState> {
  imgEl: any;
  constructor(props: IProps) {
    super(props);
    this.imgEl = React.createRef();
    this.state = {
      width: 0,
      height: 0,
      isNearbyTop: false
    };
  }

  public handleScrollFn = () => {
    const rect = (findDOMNode(
      this.imgEl
    )! as Element).getBoundingClientRect() as DOMRect;
    console.log(rect);
    if (rect.top < 150) {
      this.setState({ isNearbyTop: true });
    } else {
      this.setState({ isNearbyTop: false });
    }
  };

  componentDidMount() {
    console.log(this.props.editorRef);
    this.props.editorRef.current.addEventListener(
      "scroll",
      this.handleScrollFn
    );
  }

  componentWillUnmount() {
    this.props.editorRef.current.removeEventListener(
      "scroll",
      this.handleScrollFn
    );
  }

  public render() {
    const {
      contents,
      selected,
      index,
      handleOnChange,
      callbackfromparent,
      handleOnClickImageChange
    } = this.props;
    const { width, height, isNearbyTop } = this.state;
    const { imageUrl, style, description } = contents;
    return (
      <>
        {selected && (
          <Toolbar isNearbyTop={isNearbyTop} className="toolbar">
            <ImageButtonContainer>
              {icons.map((Type, i) => {
                return (
                  <ImageButton key={i} index={i}>
                    <Type
                      callbackfromparent={callbackfromparent}
                      handleOnClickImageChange={handleOnClickImageChange}
                      handleOnChange={handleOnChange}
                      index={index}
                      key={i}
                      contents={contents}
                      // className="toolbar-item"
                    />
                  </ImageButton>
                );
              })}
            </ImageButtonContainer>
          </Toolbar>
        )}
        <ImageContainer
          className="content"
          imageStyle={style}
          width={width}
          height={height}
        >
          <img
            style={{
              maxWidth: style === "fullWidth" ? "inherit" : "100%",
              position: "relative",
              verticalAlign: "top",
              height: "auto",
              width: "100%"
            }}
            src={imageUrl}
            alt="logo"
            ref={(e: any) => (this.imgEl = e)}
            onLoad={() => {
              this.setState(
                {
                  width: this.imgEl.naturalWidth,
                  height: this.imgEl.naturalHeight
                },
                () => {
                  if (this.state.width > 886) {
                    handleOnChange("fullWidth", index, "style");
                  } else {
                    handleOnChange("alignLeft", index, "style");
                  }
                }
              );
            }}
          />
          {!description && !selected ? null : (
            <DescriptionContainer imageStyle={style}>
              <Description
                value={description}
                onChange={(e: any) =>
                  handleOnChange(e.target.value, index, "description")
                }
                placeholder="Image Description"
              />
            </DescriptionContainer>
          )}
        </ImageContainer>
      </>
    );
  }
}

export default ImageContent;
