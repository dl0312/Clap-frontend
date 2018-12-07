import * as React from "react";
import { DragLayer, XYCoord } from "react-dnd";
// import ItemTypes from "../../ItemTypes";
import CardDragPreiview from "../CardDragPreview";
import styled from "src/typed-components";

function getItemStyles(props: ICustomDragLayerProps) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }
  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

const DragLayerContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export interface ICustomDragLayerProps {
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
  public renderItem = (Comp: any, itemType: any) => {
    return (
      this.props.itemType !== undefined && (
        <CardDragPreiview Comp={Comp} itemType={itemType} />
      )
    );
  };

  public render() {
    const { isDragging, itemType, item } = this.props;
    if (!isDragging) {
      return null;
    }
    return (
      <DragLayerContainer style={getItemStyles(this.props)}>
        {item.Comp && this.renderItem(item.Comp, itemType)}
      </DragLayerContainer>
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
