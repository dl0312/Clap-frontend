import React from "react";
import styled from "styled-components";
import HoverView from "../HoverView";

interface IPopupContainer {
  hover: boolean;
  left: number;
  top: number;
}

const PopupContainer = styled<IPopupContainer, any>("div")`
  display: ${props => (props.hover ? null : "none")};
  position: absolute;
  z-index: 99999;
  left: ${props => props.left + 50}px;
  top: ${props => props.top}px;
`;

const StaticContainer = styled.div``;

interface IProps {
  pos: { x: number; y: number };
  onImage: boolean;
  follow?: boolean;
  json: string;
}

class ImagePopup extends React.Component<IProps> {
  public render() {
    const {
      // json,
      pos: { x, y },
      onImage
    } = this.props;
    // console.log(this.props);

    return this.props.follow === undefined ? (
      <PopupContainer hover={onImage ? true : false} left={x} top={y}>
        {onImage ? <HoverView json={JSON.parse(this.props.json)} /> : null}
      </PopupContainer>
    ) : (
      <StaticContainer>
        {onImage ? <HoverView json={JSON.parse(this.props.json)} /> : null}
      </StaticContainer>
    );
  }
}

export default ImagePopup;