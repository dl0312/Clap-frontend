import React from "react";
import styled from "styled-components";

const ImageInput = styled.input`
  position: absolute;
  color: white;
  opacity: 0;
  height: 0px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.i`
  position: absolute;
  right: 60px;
  top: 25px;
  opacity: 0.2;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

const IconContainer = styled.label``;

interface IProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageButton: React.SFC<IProps> = ({ onChange }) => (
  <React.Fragment>
    <ImageInput id={"photo"} type="file" accept="image/*" onChange={onChange} />
    <IconContainer htmlFor="photo">
      <Button className="far fa-image fa-2x" />
    </IconContainer>
  </React.Fragment>
);

export default ImageButton;
