import * as React from "react";
// import { findDOMNode } from "react-dom";
import ImageContentPreview from "../ContentPreview/ImageContentPreview";
// import styled from "styled-components";
// import UserContainer from "../UserContainer";

// const styles = {
//   display: "inline-block",
//   border: "2px solid grey"
// };

// const ItemTypeContainer = styled.div`
//   text-transform: uppercase;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: "100%";
//   height: "100%";
//   font-size: 20;
// `;

interface ICardDragPreviewProps {
  Comp: any;
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
    // this.interval = setInterval(this.tick, 500);
    // clearInterval(this.interval);
    setTimeout(() => {
      this.setState({ tickTock: false });
    }, 0);
  }

  public render() {
    const { Comp, itemType } = this.props;
    const previewProps = Object.assign({}, Comp.props, Comp.state);
    // const { tickTock } = this.state;

    console.log(Comp);
    if (Comp) {
      // const node = findDOMNode(Comp) as Element;
      // const rect = node ? (node.getBoundingClientRect() as DOMRect) : null;
      // console.log(Comp.props, Comp.state);
      return (
        itemType && (
          <ImageContentPreview {...previewProps} />
          // <div
          //   style={{
          //     transition: "0.2s ease",
          //     width: rect
          //       ? tickTock
          //         ? "0px"
          //         : rect.width
          //       : tickTock
          //       ? "0px"
          //       : "100px",
          //     height: rect
          //       ? tickTock
          //         ? "0px"
          //         : rect.height
          //       : tickTock
          //       ? "0px"
          //       : "100px",
          //     transform: rect
          //       ? tickTock
          //         ? "0px"
          //         : `translate(${(-1 * rect.width) / 2}px, ${(-1 *
          //             rect.height) /
          //             2}px) scale(0.5)`
          //       : tickTock
          //       ? "0px"
          //       : `translate(-50px, -50px)`,
          //     textTransform: "uppercase",
          //     backgroundColor: "transparent",
          //     display: "flex",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     opacity: 0.9
          //   }}
          // >
          //   <ImageContentPreview {...previewProps} />
          // </div>
        )
      );
    } else {
      return null;
    }
  }
}

export default CardDragPreiview;
