import React from "react";
import styled from "styled-components";
import { InputNumber } from "antd";

const ButtonIcon = styled.i`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SizeContainer = styled.div`
  display: flex;
  visibility: visible;
  width: 100px;
  left: 0;
  padding: 6px 8px;
  box-sizing: border-box;
  z-index: 1000;
  position: absolute;
  top: 31px;
  left: 31px;
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

interface IProps {
  index: number;
  contents: any;
  width: number;
  height: number;
  handleImageWidth: any;
  handleImageHeight: any;
}

interface IState {
  isSizeChangeWindowOpen: boolean;
  targetWidth: number;
  targetHeight: number;
}

class SizeChange extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSizeChangeWindowOpen: false,
      targetWidth: 0,
      targetHeight: 0
    };
  }
  public adjustTargetSizeToImage = () => {
    this.props.handleImageWidth(this.state.targetWidth);
    this.props.handleImageHeight(this.state.targetHeight);
  };

  public toggleSizeChangeWindow = () => {
    this.setState({
      isSizeChangeWindowOpen: !this.state.isSizeChangeWindowOpen
    });
  };

  public render() {
    const {
      //   index,
      //   contents,
      width,
      height
    } = this.props;
    const { isSizeChangeWindowOpen } = this.state;
    return (
      <div>
        <ButtonIcon
          onClick={this.toggleSizeChangeWindow}
          className="fas fa-expand-arrows-alt"
        />
        {isSizeChangeWindowOpen ? (
          <SizeContainer>
            <SizeWrapper>
              <InputContainer>
                <InputNumber
                  style={{ width: 65 }}
                  size="small"
                  prefix={"W"}
                  defaultValue={width}
                  onChange={(value: number) =>
                    this.setState({ targetWidth: value })
                  }
                />
                <InputNumber
                  style={{ width: 65 }}
                  size="small"
                  prefix={"H"}
                  defaultValue={height}
                  onChange={(value: number) =>
                    this.setState({ targetHeight: value })
                  }
                />
              </InputContainer>
            </SizeWrapper>
            <ButtonContainer>
              <i className="fas fa-undo-alt" />
              <i
                onClick={this.adjustTargetSizeToImage}
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
