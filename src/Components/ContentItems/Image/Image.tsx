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
  width: ${props => (props.fullWidth ? "100%" : null)};
  width: ${props => (props.isEmpty ? "100%" : null)};
`;

const EmptyImageContainer = styled.div`
  width: 100%;
  padding: 30px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
`;

const EmptyImageIcon = styled.i`
  font-size: 30px;
`;

interface IProps {
  src: string;
  alt?: string;
  link?: string;
  fullWidth: boolean;
}

const Image: React.SFC<IProps> = ({ fullWidth, src }) => {
  return (
    <ImageContainer
      className="content"
      fullWidth={fullWidth}
      isEmpty={src !== null}
    >
      {src ? (
        <img style={{ width: "100%" }} src={src} alt="logo" />
      ) : (
        <EmptyImageContainer>
          <EmptyImageIcon className="far fa-image" />
        </EmptyImageContainer>
      )}
    </ImageContainer>
  );
};

export default Image;
