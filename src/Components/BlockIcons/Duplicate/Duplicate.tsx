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
  callbackfromparent: any;
  index: number;
}

class Duplicate extends React.Component<IProps, any> {
  public render() {
    const { callbackfromparent, index } = this.props;
    return (
      <div onClick={() => callbackfromparent("duplicate", index)}>
        <ButtonIcon className="far fa-clone" />
      </div>
    );
  }
}

export default Duplicate;
