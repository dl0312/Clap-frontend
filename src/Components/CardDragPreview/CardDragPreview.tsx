import * as React from "react";
import ImageContentPreview from "../ContentPreview/ImageContentPreview";
import TextContentPreview from "../ContentPreview/TextContentPreview";

interface ICardDragPreviewProps {
  Comp: any;
  type: "Text" | "Image";
  itemType: any;
}

interface ICardDragPreviewState {
  tickTock: any;
}

class CardDragPreiview extends React.Component<
  ICardDragPreviewProps,
  ICardDragPreviewState
> {
  constructor(props: ICardDragPreviewProps) {
    super(props);
    this.state = {
      tickTock: false
    };
  }

  // private interval: any;

  public componentDidMount() {
    setTimeout(() => {
      this.setState({ tickTock: false });
    }, 0);
  }

  public render() {
    const { Comp, type, itemType } = this.props;
    const previewProps = Object.assign({}, Comp.props, Comp.state);
    if (Comp) {
      return (
        itemType &&
        (type === "Image" ? (
          <ImageContentPreview {...previewProps} />
        ) : type === "Text" ? (
          <TextContentPreview {...previewProps} />
        ) : null)
      );
    } else {
      return null;
    }
  }
}

export default CardDragPreiview;
