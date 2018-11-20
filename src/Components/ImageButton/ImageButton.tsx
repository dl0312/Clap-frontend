import React from "react";
import styled from "styled-components";

const ImageInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.i`
  transition: opacity 0.2s ease;
`;

const IconContainer = styled.label`
  cursor: pointer;
`;

interface IProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageButton: React.SFC<IProps> = ({ onChange }) => (
  <React.Fragment>
    <ImageInput id={"photo"} type="file" accept="image/*" onChange={onChange} />
    <IconContainer htmlFor="photo">
      <Button className="far fa-image" />
    </IconContainer>
  </React.Fragment>
);

export default ImageButton;
