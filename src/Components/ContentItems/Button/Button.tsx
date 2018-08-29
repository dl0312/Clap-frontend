import * as React from "react";
import styled from "styled-components";
import { Value, Change, Mark } from "slate";
import { RenderNodeProps, RenderMarkProps, Editor } from "slate-react";

interface IButtonContainerProps {
  textColor: { r: string; g: string; b: string; a: string };
  backgroundColor: { r: string; g: string; b: string; a: string };
}

const ButtonContainer = styled<IButtonContainerProps, any>("div")`
  color: ${props =>
    `rgba(${props.textColor.r}, ${props.textColor.g}, ${props.textColor.b}, ${
      props.textColor.a
    })`};
  background-color: ${props =>
    `rgba(${props.backgroundColor.r}, ${props.backgroundColor.g}, ${
      props.backgroundColor.b
    }, ${props.backgroundColor.a})`};
  text-align: center;
  line-height: 120%;
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  border-radius: 4px;
  padding-top: 10px;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
  pointer-events: text;
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
    textColor?: { r: string; g: string; b: string; a: string };
    backgroundColor?: { r: string; g: string; b: string; a: string };
    hoverColor?: { r: string; g: string; b: string; a: string };
  };
  index?: number[];
  value: Value;
  handleOnChange?: any;
  renderNode: (
    props: {
      attributes: any;
      children: any;
      node: {
        type: any;
        data: any;
      };
      isFocused: boolean;
    }
  ) => JSX.Element | null;
  renderMark: (
    props: {
      children: any;
      mark: Mark;
      attributes: any;
    }
  ) => JSX.Element | undefined;
}

const Button: React.SFC<IProps> = ({
  item,
  value,
  handleOnChange,
  index,
  renderNode,
  renderMark
}) => {
  return (
    <ButtonContainer
      textColor={item.textColor}
      backgroundColor={item.backgroundColor}
      hoverColor={item.hoverColor}
    >
      <Editor
        value={value}
        readOnly={false}
        onChange={(change: Change) =>
          handleOnChange(change, index, "BUTTON", "TEXT_CHANGE")
        }
        renderNode={(props: RenderNodeProps) => renderNode}
        renderMark={(props: RenderMarkProps) => renderMark}
        autoCorrect={false}
        spellCheck={false}
      />
    </ButtonContainer>
  );
};

export default Button;
