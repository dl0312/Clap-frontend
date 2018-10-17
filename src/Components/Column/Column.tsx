import React, { Component } from "react";
import ColumnItem from "../ColumnItem";
import { RenderNodeProps, RenderMarkProps } from "slate-react";

interface IProps {
  columnArray: number[];
  // contentWidth: number;
  columnListArray: any[];
  index: number[];
  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number[]
  ) => void;
  handleDrop: (hoverItem: any, hoverIndex: number[]) => void;
  moveCard: any;
  handleOnChange: any;
  renderNode: (props: RenderNodeProps) => JSX.Element | undefined;
  renderMark: (props: RenderMarkProps) => JSX.Element | undefined;
  selectedIndex: number | number[] | null;
  hoveredIndex: number | number[] | null;
  onDrag: any;
  masterCallback: any;
  targetIndex: any;
  setTargetIndex: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
}

class Column extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    let totalRatio = 0;
    this.props.columnArray.map(column => (totalRatio += column));
    const columnListStyle = {
      width: "800px",
      display: "grid",
      gridGap: "0px",
      // gridTemplateColumns: this.props.columnArray.join("fr ") + "fr"
      gridTemplateColumns:
        this.props.columnArray
          .map((columnRatio, index) => (30 * columnRatio) / totalRatio)
          .join("fr ") + "fr"
    };
    const { targetIndex, setTargetIndex } = this.props;
    return (
      <div className="columnList" style={columnListStyle}>
        {this.props.columnListArray.map((columnList: any, index: any) => (
          <ColumnItem
            key={index}
            cards={columnList}
            index={this.props.index.slice(0, 1).concat(index)}
            callbackfromparent={this.props.callbackfromparent}
            handleDrop={this.props.handleDrop}
            moveCard={this.props.moveCard}
            handleOnChange={this.props.handleOnChange}
            renderNode={this.props.renderNode}
            renderMark={this.props.renderMark}
            selectedIndex={this.props.selectedIndex}
            hoveredIndex={this.props.hoveredIndex}
            onDrag={this.props.onDrag}
            masterCallback={this.props.masterCallback}
            targetIndex={targetIndex}
            setTargetIndex={setTargetIndex}
            pushPresentBlockToTargetIndex={
              this.props.pushPresentBlockToTargetIndex
            }
            pushNewBlockToTargetIndex={this.props.pushNewBlockToTargetIndex}
          />
        ))}
      </div>
    );
  }
}

export default Column;
