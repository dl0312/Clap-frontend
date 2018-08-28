import * as React from "react";
import styled from "styled-components";
import EmptyContainer from "../EmptyContainer";
import Container from "../Container";
import { Color } from "csstype";
import { RenderNodeProps, RenderMarkProps } from "slate-react";

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
    props.hasBlock ? "0px solid black" : "0.5px dashed #2f3542"};
  background-color: ${props => props.bgc};
`;

interface IProps {
  contentWidth: number;
  cards: any[];

  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number[]
  ) => void;
  selectedIndex: number[];
  hoveredIndex: number[];
  index: number[];
  handleOnChange: any;
  renderNode: RenderNodeProps;
  renderMark: RenderMarkProps;
  masterCallback: any;
  moveCard: any;
  handleDrop: (hoverItem: any, hoverIndex: number[]) => void;
  OnDrag: "content" | "columnList";
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
              item={item}
              callbackfromparent={this.props.callbackfromparent}
              selectedIndex={this.props.selectedIndex}
              hoveredIndex={this.props.hoveredIndex}
              index={this.props.index.concat(index)}
              key={index}
              contentWidth={contentWidth}
              handleOnChange={this.props.handleOnChange}
              renderNode={this.props.renderNode}
              renderMark={this.props.renderMark}
              masterCallback={this.props.masterCallback}
              moveCard={this.props.moveCard}
              handleDrop={this.props.handleDrop}
              OnDrag={this.props.OnDrag}
            />
          );
        })}
        {cards.length !== 0 ? null : (
          <EmptyContainer
            index={this.props.index}
            masterCallback={this.props.masterCallback}
            moveCard={this.props.moveCard}
            handleDrop={this.props.handleDrop}
            OnDrag={this.props.OnDrag}
          />
        )}
      </Column>
    );
  }
}

export default ColumnItem;
