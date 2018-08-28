import React, { Component } from "react";
import ItemTypes from "../../ItemTypes";
import EditorDefaults from "../../EditorDefaults";
import { DragSource, ConnectDragSource, DragSourceMonitor } from "react-dnd";
import { Value, ValueJSON } from "slate";
import styled from "styled-components";

interface IItemProps {
  opacity: number;
}

const Item = styled<IItemProps, any>("li")`
  cursor: -webkit-grab;
  border: 0.5px solid #d8d8d8;
  border-radius: 5px;
  height: 115px;
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

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

const itemSource = {
  beginDrag(props: IProps) {
    props.masterCallback("OnDrag", "content");

    const item: {
      type: "content" | null;
      OnDrag: "content" | null;
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
      OnDrag: "content",
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
        item.textColor = EditorDefaults.TEXT_TEXT_COLOR;
        item.backgroundColor = EditorDefaults.TEXT_BACKGROUND_COLOR;
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
                        text: "A line of text in a paragraph.",
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
    props.masterCallback("OnDrag", null);
    const item = {
      type: "content",
      OnDrag: "content",
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
}

interface IDnDProps {
  connectDragSource: ConnectDragSource;
  isDragging: boolean;
}

class ContentItem extends Component<IProps & IDnDProps> {
  constructor(props: IProps & IDnDProps) {
    super(props);
  }

  public render() {
    const { icon, name, connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    return (
      connectDragSource &&
      connectDragSource(
        <div>
          <Item opacity={opacity}>
            <Icon className={icon} />
            <Title>{name}</Title>
          </Item>
        </div>
      )
    );
  }
}

export default DragSource(ItemTypes.CONTENT, itemSource, connect => ({
  connectDragSource: connect.dragSource()
}))(ContentItem);
