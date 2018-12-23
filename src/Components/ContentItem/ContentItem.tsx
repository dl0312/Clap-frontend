import React, { Component } from "react";
import ItemTypes from "../../ItemTypes";
import EditorDefaults from "../../EditorDefaults";
import {
  DragSource,
  ConnectDragSource,
  DragSourceMonitor,
  DragSourceConnector,
  ConnectDragPreview
} from "react-dnd";
import styled from "styled-components";
import { getEmptyImage } from "react-dnd-html5-backend";
import { EditorState } from "draft-js";

interface IItemProps {
  opacity: number;
}

const Item = styled<IItemProps, any>("li")`
  cursor: pointer;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  opacity: ${props => props.opacity};
  &:hover {
    color: #00bcd4;
  }
`;

const Icon = styled.i`
  font-size: 25px;
  width: 38px;
  height: 34px;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 100;
`;

const itemSource = {
  beginDrag(props: IProps, monitor: DragSourceMonitor) {
    props.masterCallback("isDragging", true);
    // default block content src, text etc...
    const item: {
      type: "Text" | "Image" | "Video" | "Divider" | "Table";
      contents: {
        editorState?: any;
        imageUrl?: string | null;
        videoUrl?: string | null;
        style?: string | null;
      };
    } = {
      type: props.item.name,
      contents: {
        editorState: null,
        imageUrl: null,
        videoUrl: null,
        style: null
      }
    };
    switch (props.item.name) {
      case "Image":
        break;
      case "Video":
        break;
      case "Text":
        item.contents.editorState = EditorState.createEmpty();
        break;
      default:
        break;
    }

    return { type: props.item.name, contents: item.contents };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component: ContentItem) {
    const item = {
      type: "Text",
      contents: props.item.name
    };
    props.masterCallback("isDragging", false);
    return item;
  }
};

interface IProps {
  key: number;
  item: {
    icon: string;
    name: "Text" | "Image" | "Video" | "Divider" | "Table";
  };
  icon: any;
  name: any;
  masterCallback: any;
  onClickPushNewBlock: any;
}

interface IDnDProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

class ContentItem extends Component<IProps & IDnDProps> {
  constructor(props: IProps & IDnDProps) {
    super(props);
  }

  public componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }
  public handleInputImage = () => {
    console.log(`input image`);
  };
  public handleInputVideo = () => {
    console.log(`input video`);
  };

  public contentItem = (name: any) => {
    switch (name) {
      case "Image":
        this.handleInputImage();
        return {
          alt: "Image"
        };
      case "Video":
        this.handleInputVideo();
        return null;
      case "Button":
        return {
          textColor: EditorDefaults.BUTTON_TEXT_COLOR,
          backgroundColor: EditorDefaults.BUTTON_BACKGROUND_COLOR,
          hoverColor: EditorDefaults.BUTTON_HOVER_COLOR,
          link: "http://localhost:3000",
          editorState: EditorState.createEmpty()
        };
      case "Text":
        return EditorDefaults.DEFAULT_TEXT_BLOCK.contents;
      case "Html":
        return {
          value: EditorState.createEmpty()
        };
      case "Table":
        return EditorDefaults.DEFAULT_TABLE_BLOCK.contents;
      case "Divider":
        return EditorDefaults.DEFAULT_DIVIDER_BLOCK.contents;
      default:
        return null;
    }
  };

  public render() {
    const { icon, name, connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    return (
      connectDragSource &&
      connectDragSource(
        <div>
          <Item
            opacity={opacity}
            onClick={() =>
              this.props.onClickPushNewBlock({
                type: name,
                contents: this.contentItem(name)
              })
            }
          >
            <Icon className={icon} />
            <Title>{name}</Title>
          </Item>
        </div>
      )
    );
  }
}

export default DragSource<IProps, IDnDProps>(
  ItemTypes.CONTENT,
  itemSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  })
)(ContentItem);
