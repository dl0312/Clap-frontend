import React from "react";
import { SketchPicker, RGBColor } from "react-color";
import styled from "styled-components";

interface IFontColorProps {
  color: { r: string; g: string; b: string; a: string };
}

const FontColor = styled<IFontColorProps, any>("i")`
  padding: 13px 10px;
  color: ${props =>
    `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${
      props.color.a
    })`};
`;

interface IColorProps {
  color: { r: string; g: string; b: string; a: string };
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
  type: "BodyBackgroundColor" | "font-color";
  color: { r: number; g: number; b: number };
  masterCallback: any;
  OnChangeCards?: any;
  onChange?: any;
  selectedIndex?: number | number[];
}

interface IState {
  displayColorPicker: boolean;
  color: { r: number; g: number; b: number };
}

export default class Sketch extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { displayColorPicker: false, color: this.props.color };
  }

  public componentWillReceiveProps = (nextprops: any) => {
    this.setState({ color: nextprops.color });
  };

  public handleOnClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
    if (this.props.type === "BodyBackgroundColor") {
      this.props.masterCallback(this.props.type, this.state.color);
    } else {
      this.props.OnChangeCards(
        this.props.selectedIndex,
        this.props.type,
        this.state.color
      );
    }
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
    if (this.props.type === "BodyBackgroundColor") {
      this.setState({ color: color.rgb }, () =>
        this.props.masterCallback(this.props.type, this.state.color)
      );
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
    if (this.props.type === "font-color") {
      return (
        <div>
          <FontColor
            className="fas fa-font"
            onMouseDown={this.handleFontOnClick}
          />
          {this.state.displayColorPicker ? (
            <Popover>
              <Cover onMouseDown={this.handleClose} />
              <SketchPicker
                color={this.state.color}
                onChange={this.handleFontChange}
              />
            </Popover>
          ) : null}
        </div>
      );
    }
    return (
      <div>
        <Swatch onClick={this.handleOnClick}>
          <Color />
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
