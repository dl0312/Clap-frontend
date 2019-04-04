import React from "react";
// import styled from "styled-components";
import { EditorState } from "draft-js";
// interface IButtonIconProps {
//   active: boolean;
// }

// const ButtonIcon = styled<IButtonIconProps, any>("i")`
//   width: 31px;
//   height: 31px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: 0.2s ease;
//   color: ${props => (props.active ? "#00bcd4" : null)};
//   opacity: ${props => (props.active ? "1" : "0.65")};
//   &:hover {
//     opacity: 1;
//   }
// `;

interface IProps {
  handleOnChange: any;
  index: number;
  editorState: EditorState;
  plugins: any;
}

class Bold extends React.Component<IProps, any> {
  public render() {
    const { EmojiSuggestions, EmojiSelect } = this.props.plugins[1];
    return (
      <div title={"Emoji"}>
        <EmojiSuggestions />
        <EmojiSelect />
      </div>
    );
  }
}

export default Bold;
