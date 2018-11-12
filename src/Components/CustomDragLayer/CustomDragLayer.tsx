import * as React from "react";
import { DragLayer, XYCoord } from "react-dnd";
// import ItemTypes from "../../ItemTypes";
import CardDragPreiview from "../CardDragPreview";

const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 1000,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function getItemStyles(props: ICustomDragLayerProps) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }
  console.log(initialOffset, currentOffset);
  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

export interface ICustomDragLayerProps {
  comp: any;
  item?: any;
  itemType?: string;
  initialOffset?: XYCoord;
  currentOffset?: XYCoord;
  isDragging?: boolean;
}

class CustomDragLayer extends React.Component<ICustomDragLayerProps, any> {
  constructor(props: ICustomDragLayerProps) {
    super(props);
  }
  public renderItem = (comp: any, itemType: any) => {
    return (
      this.props.itemType !== undefined && (
        <CardDragPreiview comp={comp} itemType={itemType} />
      )
    );
  };

  public render() {
    console.log(this.props);
    const { isDragging, comp, itemType } = this.props;
    if (!isDragging) {
      return null;
    }
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(comp, itemType)}
        </div>
      </div>
    );
  }
}

export default DragLayer<ICustomDragLayerProps>(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialClientOffset(),
  currentOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer);
