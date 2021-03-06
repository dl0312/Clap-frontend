import React from "react";
import styled from "styled-components";
import { RichUtils, EditorState } from "draft-js";

interface IButtonIconProps {
  active: boolean;
}

const ButtonIcon = styled<IButtonIconProps, any>("i")`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
  color: ${props => (props.active ? "#00bcd4" : null)};
  opacity: ${props => (props.active ? "1" : "0.65")};
  &:hover {
    opacity: 1;
  }
`;

interface IProps {
  handleOnChange: any;
  index: number;
  editorState: EditorState;
  active: boolean;
}

class TextColor extends React.Component<IProps, any> {
  onTextColorClick = () => {
    this.props.handleOnChange(
      RichUtils.toggleInlineStyle(this.props.editorState, "BOLD"),
      this.props.index,
      "editorState"
    );
  };

  public render() {
    return (
      <div title={"TextColor"} onClick={this.onTextColorClick}>
        <ButtonIcon active={this.props.active} className="fas fa-bold" />
      </div>
    );
  }
}

export default TextColor;
