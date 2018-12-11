import React from "react";
import styled from "styled-components";
import { RichUtils, EditorState } from "draft-js";

const ButtonIcon = styled.i`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

interface IProps {
  handleOnChange: any;
  index: number;
  editorState: EditorState;
}

class Bold extends React.Component<IProps, any> {
  onBoldClick = () => {
    this.props.handleOnChange(
      RichUtils.toggleInlineStyle(this.props.editorState, "BOLD"),
      this.props.index,
      "editorState"
    );
  };

  public render() {
    return (
      <div title={"Align Center"} onClick={this.onBoldClick}>
        <ButtonIcon className="fas fa-bold" />
      </div>
    );
  }
}

export default Bold;
