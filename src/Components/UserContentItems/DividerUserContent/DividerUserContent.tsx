import * as React from "react";
import styled from "styled-components";

const DividerContentWrapper = styled.div`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IDividerContainerProps {
  DividerStyle:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
  currentDividerWidth: number;
  currentDividerHeight: number;
}

const DividerContainer = styled<IDividerContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  padding: 5px 0;
`;

const DividerLine = styled.hr`
  width: 100%;
  border-top: 1px solid grey;
`;

interface IDividerContents {
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

interface IProps {
  contents: IDividerContents;
}

class DividerContent extends React.Component<IProps, {}> {
  dragSource: any;
  wrapperRef: any;
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {
      contents: { style }
    } = this.props;
    return (
      <DividerContentWrapper>
        <DividerContainer className="content" DividerStyle={style}>
          <DividerLine />
        </DividerContainer>
      </DividerContentWrapper>
    );
  }
}

export default DividerContent;
