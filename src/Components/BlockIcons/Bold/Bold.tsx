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

class Bold extends React.Component<IProps, any> {
  onBoldClick = () => {
    this.props.handleOnChange(
      RichUtils.toggleInlineStyle(this.props.editorState, "BOLD"),
      this.props.index,
      "editorState"
    );
  };

  public render() {
    const active = this.props.editorState.getCurrentInlineStyle().has("BOLD");
    return (
      <div title={"Bold"} onClick={this.onBoldClick}>
        <ButtonIcon active={active} className="fas fa-bold" />
      </div>
    );
  }
}

export default Bold;
