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
import { Value } from "slate";
import styled from "styled-components";
import Plain from "slate-plain-serializer";
import { getEmptyImage } from "react-dnd-html5-backend";

interface IItemProps {
  opacity: number;
}

const Item = styled<IItemProps, any>("li")`
  cursor: -webkit-grab;
  border: 0.5px solid #d8d8d8;
  border-radius: 5px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.2s ease;
  opacity: ${props => props.opacity};
  background-color: white;
  &:hover {
    -webkit-box-shadow: 0 6px 10px rgba(0, 0, 0, 0.35);
    -moz-box-shadow: 0 6px 10px rgba(0, 0, 0, 0.35);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.35);
  }
`;

const Icon = styled.i`
  font-size: 25px;
  margin-bottom: 3px;
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 100;
`;

const itemSource = {
  beginDrag(props: IProps, monitor: DragSourceMonitor) {
    props.masterCallback("onDrag", "content");
    const item: {
      type: "content" | null;
      onDrag: "content" | null;
      content: string;
      // Image
      imageSrc?: string;
      fullWidth?: boolean;
      alt?: string;
      // Button
      textColor?: { r: string; g: string; b: string; a: string };
      backgroundColor?: { r: string; g: string; b: string; a: string };
      hoverColor?: { r: string; g: string; b: string; a: string };
      link?: string;
      value?: Value;
    } = {
      type: "content",
      onDrag: "content",
      content: props.item.name
    };
    // default block content src, text etc...
    switch (props.item.name) {
      case "IMAGE":
        item.fullWidth = false;
        item.alt = "Image";
        break;
      case "VIDEO":
        break;
      case "BUTTON":
        item.textColor = EditorDefaults.BUTTON_TEXT_COLOR;
        item.backgroundColor = EditorDefaults.BUTTON_BACKGROUND_COLOR;
        item.hoverColor = EditorDefaults.BUTTON_HOVER_COLOR;
        item.link = "http://localhost:3000";
        item.value = Value.fromJSON({
          object: "value",
          document: {
            object: "document",
            data: {},
            nodes: [
              {
                object: "block",
                type: "paragraph",
                isVoid: false,
                data: {},
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "BUTTON",
                        marks: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        });
        break;
      case "TEXT":
        item.value = Plain.deserialize("");
        break;
      case "HTML":
        item.value = Value.fromJSON({
          object: "value",
          document: {
            object: "document",
            data: {},
            nodes: [
              {
                object: "block",
                type: "paragraph",
                isVoid: false,
                data: {},
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        object: "leaf",
                        text: "this is html code",
                        marks: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        });
        break;
      default:
        break;
    }

    return item;
  },
  endDrag(props: IProps, monitor: DragSourceMonitor, component: ContentItem) {
    props.masterCallback("onDrag", null);
    props.masterCallback("targetIndex", null);
    const item = {
      type: "content",
      onDrag: "content",
      content: props.item.name
    };
    return item;
  }
};

interface IProps {
  key: number;
  item: { icon: string; name: string };
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

  public contentItem = (name: any) => {
    switch (name) {
      case "IMAGE":
        return {
          fullWidth: false,
          alt: "Image"
        };
      case "VIDEO":
        return null;
      case "BUTTON":
        return {
          textColor: EditorDefaults.BUTTON_TEXT_COLOR,
          backgroundColor: EditorDefaults.BUTTON_BACKGROUND_COLOR,
          hoverColor: EditorDefaults.BUTTON_HOVER_COLOR,
          link: "http://localhost:3000",
          value: Value.fromJSON({
            object: "value",
            document: {
              object: "document",
              data: {},
              nodes: [
                {
                  object: "block",
                  type: "paragraph",
                  isVoid: false,
                  data: {},
                  nodes: [
                    {
                      object: "text",
                      leaves: [
                        {
                          object: "leaf",
                          text: "BUTTON",
                          marks: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          })
        };
      case "TEXT":
        return { value: Plain.deserialize("") };
      case "HTML":
        return {
          value: Plain.deserialize("html code")
        };
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
              this.props.onClickPushNewBlock(
                {
                  type: "columnList",
                  onDrag: "columnList",
                  content: [1],
                  columnListArray: [
                    [
                      {
                        type: "content",
                        onDrag: "content",
                        content: name,
                        ...this.contentItem(name)
                      }
                    ]
                  ]
                },
                "CONTENT"
              )
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
