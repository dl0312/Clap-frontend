import * as React from "react";
import styled from "styled-components";
import { Value, Change, Schema } from "slate";
import { RenderNodeProps, RenderMarkProps, Editor, Plugin } from "slate-react";

interface ITextContainerProps {
  textColor: { r: string; g: string; b: string; a: string };
  textAlign: "left" | "center" | "right";
}

const TextContainer = styled<ITextContainerProps, any>("div")`
  color: ${props =>
    `rgba(${props.textColor.r}, ${props.textColor.g}, ${props.textColor.b}, ${
      props.textColor.a
    })`};
  text-align: ${props => props.textAlign};
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
    textColor?: { r: string; g: string; b: string; a: string };
    backgroundColor?: { r: string; g: string; b: string; a: string };
    hoverColor?: { r: string; g: string; b: string; a: string };
  };
  index: number[];
  value: Value;
  schema: Schema;
  plugins: Plugin[];
  active: boolean;
  handleOnChange: any;
  renderNode: RenderNodeProps;
  renderMark: RenderMarkProps;
}

const Text: React.SFC<IProps> = ({
  item,
  value,
  schema,
  plugins,
  handleOnChange,
  index,
  renderNode,
  renderMark
}) => {
  return (
    <TextContainer
      textColor={item.textColor}
      textAlign={item.textAlign ? item.textAlign : "left"}
      className="markdown-body"
    >
      <Editor
        style={{
          color: "rgba(0,0,0,1)",
          fontFamily: "Nanum Gotic",
          wordBreak: "break-word"
        }}
        schema={schema}
        value={value}
        readOnly={false}
        onChange={(change: Change) => {
          handleOnChange(change, index, "TEXT", "TEXT_CHANGE");
        }}
        renderNode={(props: RenderNodeProps) => renderNode}
        renderMark={(props: RenderMarkProps) => renderMark}
        autoCorrect={false}
        spellCheck={false}
        plugins={plugins}
      />
    </TextContainer>
  );
};

export default Text;
