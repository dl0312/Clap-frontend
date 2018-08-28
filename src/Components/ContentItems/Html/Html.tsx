import * as React from "react";
import styled from "styled-components";
import { Value, Change } from "slate";
import { RenderNodeProps, RenderMarkProps, Editor } from "slate-react";

const HtmlContainer = styled.div`
  color: #373a3c;
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
`;

interface IProps {
  index: number[];
  value: Value;
  handleOnChange: any;
  renderNode: RenderNodeProps;
  renderMark: RenderMarkProps;
}

const Html: React.SFC<IProps> = ({
  value,
  handleOnChange,
  index,
  renderNode,
  renderMark
}) => {
  return (
    <HtmlContainer className="content">
      <Editor
        value={value}
        readOnly={false}
        onChange={(change: Change) =>
          handleOnChange(change, index, "BUTTON", "TEXT_CHANGE")
        }
        renderNode={(props: RenderNodeProps) => renderNode}
        renderMark={(props: RenderMarkProps) => renderMark}
      />
    </HtmlContainer>
  );
};

export default Html;
