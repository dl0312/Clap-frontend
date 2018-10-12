import * as React from "react";
import styled from "styled-components";
import EmptyContainer from "../EmptyContainer";
import Container from "../Container";
import { Color } from "csstype";
import { RenderNodeProps, RenderMarkProps } from "slate-react";
import EditorDefaults from "../../EditorDefaults";

interface IColumnProps {
  hasBlock: boolean;
  bgc: Color;
}

const Column = styled<IColumnProps, any>("div")`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => (props.hasBlock ? "flex-start" : "center")};
  outline: ${props =>
    props.hasBlock
      ? `0px solid transparent`
      : `1px dashed ${EditorDefaults.MAIN_TEXT_COLOR}`};
  background-color: ${props => props.bgc};
`;

interface IProps {
  contentWidth: number;
  cards: any[];

  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number[]
  ) => void;
  selectedIndex: number | number[] | null;
  hoveredIndex: number | number[] | null;
  index: number[];
  handleOnChange: any;
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
  masterCallback: any;
  moveCard: any;
  handleDrop: (hoverItem: any, hoverIndex: number[]) => void;
  onDrag: "content" | "columnList";
}

class ColumnItem extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    // 기본상태의 에디터화면 id=container, id=body
    const { contentWidth, cards } = this.props;
    const backgroundColor = cards.length === 1 ? "transparent" : "transparent";
    return (
      <Column hasBlock={cards.length !== 0} bgc={backgroundColor}>
        {cards.map((item: any, index: number) => {
          return (
            <Container
              key={index}
              /* Action to Parent Component */
              callbackfromparent={this.props.callbackfromparent}
              masterCallback={this.props.masterCallback}
              moveCard={this.props.moveCard}
              handleDrop={this.props.handleDrop}
              index={this.props.index.concat(index)}
              handleOnChange={this.props.handleOnChange}
              /* For Content Render */
              selectedIndex={this.props.selectedIndex}
              hoveredIndex={this.props.hoveredIndex}
              item={item}
              onDrag={this.props.onDrag}
              contentWidth={contentWidth}
              renderNode={this.props.renderNode}
              renderMark={this.props.renderMark}
            />
          );
        })}
        {cards.length !== 0 ? null : (
          <EmptyContainer
            index={this.props.index}
            masterCallback={this.props.masterCallback}
            moveCard={this.props.moveCard}
            handleDrop={this.props.handleDrop}
            onDrag={this.props.onDrag}
          />
        )}
      </Column>
    );
  }
}

export default ColumnItem;
