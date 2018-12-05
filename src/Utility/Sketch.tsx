import React from "react";
import { SketchPicker } from "react-color";
import styled from "styled-components";

interface IColorProps {
  color: { r: number; g: number; b: number; a: number };
}

const Color = styled<IColorProps, any>("div")`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${props =>
    `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${
      props.color.a
    })`};
`;

const Swatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

const Popover = styled.div`
  position: absolute;
  margin-top: 5px;
  margin-left: -175px;
  z-index: 2;
`;

const Cover = styled.div`
  position: relative;
  top: 0px;
  right: 100px;
  bottom: 0px;
  left: 0px;
`;

interface IProps {
  type: "bodyBackgroundColor" | "ButtonBackgroundColor" | "ButtonHoverColor";
  color: { r: number; g: number; b: number; a: number };
  masterCallback?: any;
  OnChangeCards?: any;
  onChange?: any;
  selectedIndex: number;
}

interface IState {
  displayColorPicker: boolean;
  color: { r: number; g: number; b: number; a: number };
}

export default class Sketch extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { displayColorPicker: false, color: this.props.color };
  }

  static getDerivedStateFromProps = (nextProps: IProps, prevState: IState) => {
    console.log(nextProps);
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    } else {
      return null;
    }
  };

  public handleOnClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  };

  public handleFontOnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  };

  public handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  public handleChange = (color: { rgb: any }) => {
    console.log(color.rgb);
    if (this.props.type === "bodyBackgroundColor") {
      this.props.masterCallback(this.props.type, color.rgb);
    } else {
      this.setState({ color: color.rgb }, () =>
        this.props.OnChangeCards(
          this.props.selectedIndex,
          this.props.type,
          this.state.color
        )
      );
    }
  };

  public handleFontChange = (color: { rgb: any }) => {
    this.setState({ color: color.rgb }, () =>
      this.props.onChange(event, this.props.type, color)
    );
  };

  public render() {
    console.log(this.state);
    return (
      <div>
        <Swatch onClick={this.handleOnClick}>
          <Color color={this.state.color} />
        </Swatch>
        {this.state.displayColorPicker ? (
          <Popover>
            <Cover onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </Popover>
        ) : null}
      </div>
    );
  }
}
