import React from "react";
import styled from "styled-components";
import VideoModal from "../VideoModal";

const ModalContainer = styled.div`
  position: fixed;
  text-align: center;
  overflow: auto;
  z-index: 100;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  :before {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
`;

const DisableBackground = styled.div`
  background-color: hsla(0, 0%, 100%, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
`;

const ModalWrapper = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  margin: 30px 0;
  animation-name: se-popup-interaction-enter;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.12);
`;

interface IProps {
  handleSetState: any;
  handleDrop: any;
  selectedIndex: number | null;
  targetIndex: number | null;
  cards: any;
}

class CustomModal extends React.Component<IProps, any> {
  public render() {
    const {
      handleSetState,
      handleDrop,
      selectedIndex,
      targetIndex,
      cards
    } = this.props;
    return (
      <ModalContainer>
        <DisableBackground />
        <ModalWrapper>
          <VideoModal
            handleSetState={handleSetState}
            handleDrop={handleDrop}
            selectedIndex={selectedIndex}
            targetIndex={targetIndex}
            cards={cards}
          />
        </ModalWrapper>
      </ModalContainer>
    );
  }
}

export default CustomModal;
