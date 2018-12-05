import * as React from "react";
import styled from "styled-components";

interface IImageContainerProps {
  fullWidth: string;
  isEmpty: boolean;
}

const ImageContainer = styled<IImageContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  width: ${props =>
    props.isEmpty ? "100%" : props.fullWidth ? "100%" : "auto"};
`;

const EmptyImageContainer = styled.div`
  width: 100%;
  padding: 15px;
  /* border: 0.5px solid rgba(0, 0, 0, 0.5); */
`;

const EmptyImageIcon = styled.i`
  font-size: 30px;
`;

interface IProps {
  contents: IImageContents;
}

interface IImageContents {
  slateData?: any;
  imageUrl: string | null;
  description: string | null;
  isUploaded: boolean | null;
  link: string | null;
  style:
    | "Wallpaper"
    | "AlignLeft"
    | "AlignCenter"
    | "AlignRight"
    | "WithManyTextLeft"
    | "WithManyTextRight"
    | "WithLessTextLeft"
    | "WithLessTextRight";
}

const ImageContent: React.SFC<IProps> = ({ contents: { imageUrl } }) => {
  return (
    <ImageContainer className="content" fullWidth={true} isEmpty={true}>
      {imageUrl ? (
        <img style={{ width: "100%" }} src={imageUrl} alt="logo" />
      ) : (
        <EmptyImageContainer>
          <EmptyImageIcon className="far fa-image" />
        </EmptyImageContainer>
      )}
    </ImageContainer>
  );
};

export default ImageContent;
