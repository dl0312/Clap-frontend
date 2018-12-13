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
}

class StrikeThrough extends React.Component<IProps, any> {
  onStrikeThroughClick = () => {
    this.props.handleOnChange(
      RichUtils.toggleInlineStyle(this.props.editorState, "STRIKETHROUGH"),
      this.props.index,
      "editorState"
    );
  };

  public render() {
    const active = this.props.editorState
      .getCurrentInlineStyle()
      .has("STRIKETHROUGH");

    return (
      <div title={"StrikeThrough"} onClick={this.onStrikeThroughClick}>
        <ButtonIcon active={active} className="fas fa-strikethrough" />
      </div>
    );
  }
}

export default StrikeThrough;
