import * as React from "react";
import styled from "styled-components";
import { Value } from "slate";
import { RenderNodeProps, RenderMarkProps, Editor, Plugin } from "slate-react";
import EditorDefaults from "../../../EditorDefaults";

interface ITextContainerProps {
  textColor: { r: string; g: string; b: string; a: string };
  textAlign: "left" | "center" | "right";
}

const TextContainer = styled<ITextContainerProps, any>("div")`
  text-align: ${props => props.textAlign};
  width: 100%;
  cursor: auto;
  line-height: 140%;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
`;

interface IProps {
  item: {
    type: string;
    content:
      | "BUTTON"
      | "DIVIDER"
      | "HTML"
      | "IMAGE"
      | "TEXT"
      | "VIDEO"
      | "SOCIAL";
    value?: any;
    align?: "left" | "center" | "right";
    textAlign?: "left" | "center" | "right";
    backgroundColor?: { r: string; g: string; b: string; a: string };
    hoverColor?: { r: string; g: string; b: string; a: string };
  };
  index?: number[];
  value: Value;
  plugins: Plugin[];
  handleOnChange?: any;
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
}

const Text: React.SFC<IProps> = ({
  item,
  value,
  plugins,
  handleOnChange,
  index,
  renderNode,
  renderMark
}) => {
  return (
    <TextContainer
      textAlign={item.textAlign ? item.textAlign : "left"}
      className="markdown-body"
    >
      {handleOnChange !== undefined ? (
        <Editor
          style={{
            wordBreak: "break-word",
            fontSize: "16px",
            color: EditorDefaults.MAIN_TEXT_COLOR
          }}
          value={value}
          readOnly={false}
          onChange={(change: any) => {
            handleOnChange(change, index, "TEXT", "TEXT_CHANGE");
          }}
          placeholder={"Text"}
          renderNode={renderNode}
          renderMark={renderMark}
          autoCorrect={false}
          spellCheck={false}
          plugins={plugins}
        />
      ) : (
        <Editor
          style={{
            wordBreak: "break-word",
            fontSize: "16px",
            color: EditorDefaults.MAIN_TEXT_COLOR
          }}
          value={value}
          readOnly={true}
          renderNode={renderNode}
          renderMark={renderMark}
          autoCorrect={false}
          spellCheck={false}
          plugins={plugins}
        />
      )}
    </TextContainer>
  );
};

export default Text;
