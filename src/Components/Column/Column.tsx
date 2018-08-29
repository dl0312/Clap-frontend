import React, { Component } from "react";
import ColumnItem from "../ColumnItem";
import { Mark } from "slate";

interface IProps {
  columnArray: number[];
  contentWidth: number;
  columnListArray: any[];
  index: number[];
  callbackfromparent: (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromchild: number[]
  ) => void;
  handleDrop: (hoverItem: any, hoverIndex: number[]) => void;
  moveCard: any;
  handleOnChange: any;
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
  selectedIndex: number | number[] | null;
  hoveredIndex: number | number[] | null;
  onDrag: any;
  masterCallback: any;
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
      width: this.props.contentWidth,
      display: "grid",
      gridGap: "0px",
      // gridTemplateColumns: this.props.columnArray.join("fr ") + "fr"
      gridTemplateColumns:
        this.props.columnArray
          .map(
            (columnRatio, index) =>
              (this.props.contentWidth * columnRatio) / totalRatio
          )
          .join("px ") + "px"
    };
    return (
      <div className="columnList" style={columnListStyle}>
        {this.props.columnListArray.map((columnList, index) => (
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
            contentWidth={this.props.contentWidth}
            onDrag={this.props.onDrag}
            masterCallback={this.props.masterCallback}
          />
        ))}
      </div>
    );
  }
}

export default Column;
