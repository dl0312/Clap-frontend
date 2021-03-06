import React from "react";
import styled from "styled-components";

const ButtonIcon = styled.i`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.65;
  transition: 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

interface IProps {
  index: number;
  handleOnClickImageChange: any;
  contents: any;
}

class ImageChange extends React.Component<IProps, any> {
  public render() {
    const { handleOnClickImageChange, index, contents } = this.props;
    return (
      <div
        onClick={e => handleOnClickImageChange(index, contents.libraryIndex)}
      >
        <ButtonIcon className="far fa-image" />
      </div>
    );
  }
}

export default ImageChange;
