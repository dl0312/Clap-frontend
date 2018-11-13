import * as React from "react";
import styled from "styled-components";
import { Value } from "slate";
import { RenderNodeProps, RenderMarkProps, Editor, Plugin } from "slate-react";
import EditorDefaults from "../../../EditorDefaults";

// import { Row, Col } from "antd";
import { AlignCenter, AlignLeft, AlignRight } from "@canner/slate-icon-align";
import Blockquote from "@canner/slate-icon-blockquote";
import Bold from "@canner/slate-icon-bold";
// import Clean from "@canner/slate-icon-clean";
// import Code from "@canner/slate-icon-code";
// import CodeBlock from "@canner/slate-icon-codeblock";
// import Emoji, {EmojiPlugin} from '@canner/slate-icon-emoji';
import FontBgColor from "@canner/slate-icon-fontbgcolor";
import FontColor from "@canner/slate-icon-fontcolor";
import { Header1, Header2 } from "@canner/slate-icon-header";
import Hr from "@canner/slate-icon-hr";
// import Image from "@canner/slate-icon-image";
// import { Indent, Outdent } from "@canner/slate-icon-indent";
import Italic from "@canner/slate-icon-italic";
import Table from "@canner/slate-icon-table";
import Link from "@canner/slate-icon-link";
// import { OlList, UlList } from "@canner/slate-icon-list";
import StrikeThrough from "@canner/slate-icon-strikethrough";
import Underline from "@canner/slate-icon-underline";
import Undo from "@canner/slate-icon-undo";
import Redo from "@canner/slate-icon-redo";
import Video from "@canner/slate-icon-video";

// select
// import FontSize from "@canner/slate-select-fontsize";
// import LetterSpacing from "@canner/slate-select-letterspacing";
// import LineHeight from "@canner/slate-select-lineheight";

// plugins
import "prismjs/themes/prism.css";

// const selectors = [FontSize, LetterSpacing, LineHeight];
const icons = [
  Header1,
  Header2,

  Bold,
  Italic,
  Underline,
  StrikeThrough,
  FontBgColor,
  FontColor,

  AlignLeft,
  AlignCenter,
  AlignRight,
  Blockquote,

  // Clean,
  // Code,
  // CodeBlock,
  // Emoji,
  Hr,
  // Image,
  Video,
  // Indent,
  // Outdent,
  Link,
  // OlList,
  // UlList,
  Table,

  Undo,
  Redo
];

const TextEditorButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px 2px 0 0;
  line-height: 0px !important;
  background-color: #fff;
  position: absolute;
  z-index: 100;
  top: -38px;
  left: -1.5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

interface ITextEditorButtonProps {
  index: number;
}

const TextEditorButton = styled<ITextEditorButtonProps, any>("div")`
  &:hover {
    background-color: #ebebeb;
  }
  border-right: ${props =>
    props.index === 1 ||
    props.index === 7 ||
    props.index === 11 ||
    props.index === 15
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : null};
`;

interface ITextContainerProps {
  textColor: { r: string; g: string; b: string; a: string };
  textAlign: "left" | "center" | "right";
}

const TextContainer = styled<ITextContainerProps, any>("div")`
  text-align: ${props => props.textAlign};
  width: 100%;
  cursor: auto;
  line-height: 1.9;
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
  selected?: boolean;
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
}

const TextContent: React.SFC<IProps> = ({
  item,
  value,
  plugins,
  handleOnChange,
  index,
  renderNode,
  renderMark,
  selected
}) => {
  return (
    <TextContainer
      textAlign={item.textAlign ? item.textAlign : "left"}
      className="markdown-body"
    >
      {handleOnChange !== undefined ? (
        <React.Fragment>
          <div className="toolbar">
            <TextEditorButtonContainer>
              {icons.map((Type, i) => {
                return (
                  selected && (
                    <TextEditorButton key={i} index={i}>
                      <Type
                        change={value.change()}
                        onChange={(change: any) => {
                          handleOnChange(change, index, "TEXT", "TEXT_CHANGE");
                        }}
                        key={i}
                        className="toolbar-item"
                        activeClassName="toolbar-item-active"
                        disableClassName="toolbar-item-disable"
                        activeStrokeClassName="ql-stroke-active"
                        activeFillClassName="ql-fill-active"
                        activeThinClassName="ql-thin-active"
                        activeEvenClassName="ql-even-active"
                      />
                    </TextEditorButton>
                  )
                );
              })}
            </TextEditorButtonContainer>
          </div>
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
            autoFocus={true}
            spellCheck={false}
            plugins={plugins}
          />
        </React.Fragment>
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

export default TextContent;
