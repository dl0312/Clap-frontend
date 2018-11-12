import * as React from "react";
import { findDOMNode } from "react-dom";
import styled from "styled-components";
// import UserContainer from "../UserContainer";

// const styles = {
//   display: "inline-block",
//   border: "2px solid grey"
// };

const ItemTypeContainer = styled.div`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  width: "100%";
  height: "100%";
  font-size: 20;
`;

interface ICardDragPreviewProps {
  comp: any;
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
      tickTock: true
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
    const { comp, itemType } = this.props;
    const { tickTock } = this.state;
    const node =
      comp && comp.isCurrentlyMounted
        ? (findDOMNode(this.props.comp) as Element)
        : null;
    const rect = node ? (node.getBoundingClientRect() as DOMRect) : null;
    console.log(tickTock);
    return (
      itemType && (
        <div
          style={{
            transition: "0.2s ease",
            width: rect
              ? tickTock
                ? "0px"
                : rect.width / 2
              : tickTock
              ? "0px"
              : "100px",
            height: rect
              ? tickTock
                ? "0px"
                : rect.height / 2
              : tickTock
              ? "0px"
              : "100px",
            transform: rect
              ? tickTock
                ? "0px"
                : `translate(${(-1 * rect.width) / 4}px, ${(-1 * rect.height) /
                    4}px)`
              : tickTock
              ? "0px"
              : `translate(-50px, -50px)`,
            textTransform: "uppercase",
            backgroundColor: "white",
            border: "2px solid black",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ItemTypeContainer>{itemType}</ItemTypeContainer>
        </div>
      )
    );
  }
}

export default CardDragPreiview;
