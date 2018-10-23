import * as React from "react";
import styled from "styled-components";
import EmptyContainer from "../EmptyContainer";
import Container from "../Container";
import { Color } from "csstype";
import { RenderNodeProps, RenderMarkProps } from "slate-react";
import EditorDefaults from "../../EditorDefaults";
import Builder from "../Builder";
import isEqual from "lodash.isequal";

interface IColumnProps {
  hasBlock: boolean;
  bgc: Color;
}

const Column = styled<IColumnProps, any>("div")`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => (props.hasBlock ? "flex-start" : "flex-start")};
  border: ${props =>
    props.hasBlock
      ? `1px solid transparent`
      : `1px dashed ${EditorDefaults.MAIN_TEXT_COLOR}`};
  background-color: ${props => props.bgc};
`;

interface IProps {
  // contentWidth: number;
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
  targetIndex: any;
  setTargetIndex: any;

  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
}

class ColumnItem extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    // 기본상태의 에디터화면 id=container, id=body
    const { cards, onDrag, targetIndex, setTargetIndex } = this.props;
    const backgroundColor = cards.length === 1 ? "transparent" : "transparent";
    return (
      <Column hasBlock={cards.length !== 0} bgc={backgroundColor}>
        {cards.length !== 0 ? (
          <React.Fragment>
            <Builder
              index={this.props.index.concat(0)}
              type={"content"}
              state={
                onDrag === "content"
                  ? isEqual(this.props.index.concat(0), targetIndex)
                    ? "ISOVER"
                    : "ONDRAG"
                  : "NOTHING"
              }
            />
            {cards.map((item, i) => (
              <React.Fragment key={i}>
                <Container
                  /* Action to Parent Component */ key={i}
                  callbackfromparent={this.props.callbackfromparent}
                  masterCallback={this.props.masterCallback}
                  moveCard={this.props.moveCard}
                  handleDrop={this.props.handleDrop}
                  index={this.props.index.concat(i)}
                  handleOnChange={this.props.handleOnChange}
                  /* For Content Render */ selectedIndex={
                    this.props.selectedIndex
                  }
                  hoveredIndex={this.props.hoveredIndex}
                  item={item}
                  onDrag={this.props.onDrag}
                  renderNode={this.props.renderNode}
                  renderMark={this.props.renderMark}
                  setTargetIndex={setTargetIndex}
                  pushPresentBlockToTargetIndex={
                    this.props.pushPresentBlockToTargetIndex
                  }
                  pushNewBlockToTargetIndex={
                    this.props.pushNewBlockToTargetIndex
                  }
                />
                <Builder
                  index={this.props.index.concat(i + 1)}
                  type={"content"}
                  state={
                    onDrag === "content"
                      ? isEqual(this.props.index.concat(i + 1), targetIndex)
                        ? "ISOVER"
                        : "ONDRAG"
                      : "NOTHING"
                  }
                />
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : (
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
