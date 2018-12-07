import React from "react";
import styled from "styled-components";

const ButtonIcon = styled.i`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface IProps {
  callbackfromparent: any;
  index: number;
}

class Delete extends React.Component<IProps, any> {
  public render() {
    const { callbackfromparent, index } = this.props;
    return (
      <div onClick={() => callbackfromparent("delete", index)}>
        <ButtonIcon className="far fa-trash-alt" />
      </div>
    );
  }
}

export default Delete;
