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
  withText: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageButton: React.SFC<IProps> = ({ withText, onChange }) => (
  <React.Fragment>
    <ImageInput id={"photo"} type="file" accept="image/*" onChange={onChange} />
    <IconContainer htmlFor="photo">
      <Button className="far fa-image" />
      {withText && <span style={{ marginLeft: 5 }}>TITLE IMAGE</span>}
    </IconContainer>
  </React.Fragment>
);

export default ImageButton;
