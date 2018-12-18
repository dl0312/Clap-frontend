import React from "react";
import styled from "styled-components";
import { InputNumber } from "antd";

interface IButtonIconProps {
  isSizeChangeWindowOpen: boolean;
}

const ButtonIcon = styled<IButtonIconProps, any>("i")`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.isSizeChangeWindowOpen ? "#00bcd4" : null)};
  cursor: pointer;
  opacity: ${props => (props.isSizeChangeWindowOpen ? "1" : "0.65")};
  transition: 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

const SizeContainer = styled.div`
  display: flex;
  visibility: visible;
  width: 100px;
  padding: 6px 8px;
  box-sizing: border-box;
  z-index: 1000;
  position: absolute;
  top: 31px;
  left: -1px;
  background-color: #fafafa;
  border: 1px solid #cecece;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: left;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
`;

const SizeWrapper = styled.div``;
const InputContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const WindowButtonIcon = styled.i`
  cursor: pointer;
  &:hover {
    color: #00bcd4;
  }
`;

interface IProps {
  index: number;
  contents: any;
  changeImageSizeFromCurrentToTarget: any;
}

interface IState {
  isSizeChangeWindowOpen: boolean;
  targetImageWidth: number;
  targetImageHeight: number;
}

class SizeChange extends React.Component<IProps, IState> {
  wrapperRef: any;
  constructor(props: IProps) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      isSizeChangeWindowOpen: false,
      targetImageWidth: this.props.contents.currentImageWidth,
      targetImageHeight: this.props.contents.currentImageHeight
    };
  }

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  handleClickOutside(event: any) {
    console.log(this.wrapperRef);
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isSizeChangeWindowOpen: false }, () =>
        document.removeEventListener("mousedown", this.handleClickOutside)
      );
    }
  }

  public toggleSizeChangeWindow = () => {
    if (!this.state.isSizeChangeWindowOpen) {
      this.setState({
        isSizeChangeWindowOpen: true
      });
      document.addEventListener("mousedown", this.handleClickOutside);
    } else {
      this.setState({
        isSizeChangeWindowOpen: false
      });
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  };

  public validate = (event: any) => {
    const theEvent = event || window.event;
    let key: any;
    // Handle paste
    if (theEvent.type === "paste") {
      key = event.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  public render() {
    const { index, contents } = this.props;
    const {
      isSizeChangeWindowOpen,
      targetImageWidth,
      targetImageHeight
    } = this.state;
    const { naturalImageWidth, naturalImageHeight } = contents;
    const ratio = naturalImageWidth / naturalImageHeight;
    return (
      <div ref={(instance: any) => this.setWrapperRef(instance)}>
        <ButtonIcon
          onClick={this.toggleSizeChangeWindow}
          isSizeChangeWindowOpen={isSizeChangeWindowOpen}
          className="fas fa-expand-arrows-alt"
        />
        {isSizeChangeWindowOpen ? (
          <SizeContainer>
            <SizeWrapper>
              <InputContainer>
                <InputNumber
                  min={0}
                  max={naturalImageWidth > 886 ? undefined : 886}
                  style={{ width: 65 }}
                  size="small"
                  prefix={"W"}
                  value={targetImageWidth}
                  onChange={(value: number) => {
                    this.setState({
                      targetImageWidth: value,
                      targetImageHeight: Math.floor(value / ratio)
                    });
                  }}
                  onKeyPress={this.validate}
                />
                <InputNumber
                  min={0}
                  max={
                    naturalImageWidth > 886
                      ? undefined
                      : Math.floor(886 / ratio)
                  }
                  style={{ width: 65 }}
                  size="small"
                  prefix={"H"}
                  value={targetImageHeight}
                  onChange={(value: number) =>
                    this.setState({
                      targetImageHeight: value,
                      targetImageWidth: Math.floor(value * ratio)
                    })
                  }
                  onKeyPress={this.validate}
                />
              </InputContainer>
            </SizeWrapper>
            <ButtonContainer>
              <WindowButtonIcon
                onClick={() => {
                  this.props.changeImageSizeFromCurrentToTarget(
                    naturalImageWidth,
                    naturalImageHeight,
                    index
                  );
                  this.setState({
                    targetImageWidth: naturalImageWidth,
                    targetImageHeight: naturalImageHeight,
                    isSizeChangeWindowOpen: false
                  });
                }}
                className="fas fa-undo-alt"
              />
              <WindowButtonIcon
                onClick={() => {
                  this.props.changeImageSizeFromCurrentToTarget(
                    targetImageWidth,
                    targetImageHeight,
                    index
                  );
                  this.toggleSizeChangeWindow();
                }}
                className="fas fa-check"
              />
            </ButtonContainer>
          </SizeContainer>
        ) : null}
      </div>
    );
  }
}

export default SizeChange;
