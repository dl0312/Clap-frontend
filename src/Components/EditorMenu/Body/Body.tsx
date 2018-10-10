import * as React from "react";
import styled from "styled-components";
import Sketch from "../../../Utility/Sketch";

const INTERVAL = 50;

const fontFamily = [
  "Roboto",
  "Oxygen",
  "Times New Roman",
  "Segoe UI",
  "Open Sans",
  "Helvetica Neue",
  "Nanum Gothic",
  "Nanum Myeongjo",
  "Kirang Haerang",
  "Nanum Pen Script",
  "Do Hyeon",
  "Nanum Gothic Coding",
  "Sunflower",
  "Iropke Batang"
];

const BodyContainer = styled.div`
  padding-top: 2px;
`;

const NavBar = styled.div`
  padding: 0 20px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  color: rgb(81, 97, 103);
  background-color: rgb(234, 234, 234);
`;

const BodyColumn = styled.ul`
  height: 0px;
  padding: 0 20px;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  font-weight: 600;
  color: #8f9699;
`;

const Indicator = styled.input`
  height: 30px;
  text-align: center;
  width: 45px;
  border: none;
  border-top: 0.4px solid #d8d8d8;
  border-bottom: 0.4px solid #d8d8d8;
`;

const Operator = styled.button`
  height: 30px;
  width: 25px;
  border: none;
  background-color: #fff;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 0.5px solid #d8d8d8;
  outline: none;
`;

const Swatch = styled.div`
  width: 150px;
  padding: 5px;
  background-color: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

interface ISwatchFontProps {
  fontFamily: string;
}

const SwatchFont = styled<ISwatchFontProps, any>("div")`
  padding: 5px 10px;
  font-family: ${props => props.fontFamily};
`;

const PopOver = styled.div`
  position: absolute;
  margin-top: 5px;
  z-index: 3;
  background-color: white;
`;

const FontColumn = styled.div`
  position: relative;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border: none;
  border-radius: 3px;
  border: 0.4px solid #d8d8d8;
  padding: 5px 0;
`;

interface IFontColumnItemProps {
  fontFamily: string;
}

const FontColumnItem = styled<IFontColumnItemProps, any>("div")`
  cursor: pointer;
  width: 150px;
  padding: 5px 10px;
  font-family: ${props => props.fontFamily};
`;

const ViewsContainer = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface IViewIconProps {
  isSelcted: boolean;
}

const ViewIcon = styled<IViewIconProps, any>("i")`
  font-size: 20px;
  transition: opacity 0.5s ease;
  opacity: ${props => (props.isSelcted ? "1" : "0.2")};
  color: black;
  &:hover {
    opacity: ${props => (props.isSelcted ? null : "0.5")};
  }
`;

interface IProps {
  // callback func
  masterCallback: any;

  bodyBackgroundColor: { r: number; g: number; b: number; a: number };
  view: "EDIT" | "USER" | "JSON";
  contentWidth: number;
  font: string;
}

interface IState {
  // display toggle
  displayFontFamily: boolean;

  bodyBackgroundColor: { r: number; g: number; b: number; a: number };
  view: "EDIT" | "USER" | "JSON";
  contentWidth: number;
  font: string;
}

class Body extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      displayFontFamily: false,
      bodyBackgroundColor: this.props.bodyBackgroundColor,
      view: this.props.view,
      contentWidth: this.props.contentWidth,
      font: this.props.font
    };
  }

  static getDerivedStateFromProps = (nextProps: IProps, prevState: IState) => {
    console.log(nextProps);
    if (nextProps.contentWidth !== prevState.contentWidth) {
      return { contentWidth: nextProps.contentWidth };
    }
    if (nextProps.font !== prevState.font) {
      return { font: nextProps.font };
    }
    if (nextProps.view !== prevState.view) {
      return { view: nextProps.view };
    } else {
      return null;
    }
  };

  public handleOnChange = () => {
    this.props.masterCallback("contentWidth", this.props.contentWidth);
  };

  public handleOnClick = (type: "FontFamily" | "View") => {
    if (type === "FontFamily") {
      this.setState({ displayFontFamily: !this.state.displayFontFamily });
    }
  };

  public handleOperatorOnClick = (operator: "-" | "+") => {
    if (operator === "-") {
      if (this.props.contentWidth > 600) {
        this.props.masterCallback(
          "contentWidth",
          this.props.contentWidth - INTERVAL
        );
      }
    } else if (operator === "+") {
      if (this.props.contentWidth < 950) {
        this.props.masterCallback(
          "contentWidth",
          this.props.contentWidth + INTERVAL
        );
      }
    }
  };

  public handleOnClickView = (view: "EDIT" | "USER" | "JSON") => {
    this.props.masterCallback("view", view);
  };

  public render() {
    const { view } = this.state;
    return (
      <BodyContainer>
        <NavBar>GENERAL</NavBar>
        <BodyColumn>
          <Item>
            Background Color
            <Sketch
              masterCallback={this.props.masterCallback}
              type="bodyBackgroundColor"
              color={this.props.bodyBackgroundColor}
            />
          </Item>
          <Item>
            Content Width
            <div>
              <Operator onClick={() => this.handleOperatorOnClick("-")}>
                -
              </Operator>
              <Indicator value={this.props.contentWidth} readOnly={true} />
              <Operator onClick={() => this.handleOperatorOnClick("+")}>
                +
              </Operator>
            </div>
          </Item>
          <Item>
            Font Family
            <div className="func">
              <div>
                <Swatch onClick={() => this.handleOnClick("FontFamily")}>
                  <SwatchFont fontFamily={this.props.font}>
                    {this.props.font}
                  </SwatchFont>
                </Swatch>
                {this.state.displayFontFamily ? (
                  <PopOver>
                    <FontColumn>
                      {fontFamily.map((font: string, index: number) => (
                        <FontColumnItem
                          key={index}
                          onClick={() =>
                            this.props.masterCallback("font", this.state.font)
                          }
                          fontFamily={font}
                        >
                          {font}
                        </FontColumnItem>
                      ))}
                    </FontColumn>
                  </PopOver>
                ) : null}
              </div>
            </div>
          </Item>
          <Item>
            Editor View
            <ViewsContainer>
              <ViewIcon
                onClick={() => this.handleOnClickView("EDIT")}
                isSelected={view === "EDIT"}
                className="fas fa-edit"
              />
              <ViewIcon
                onClick={() => this.handleOnClickView("USER")}
                isSelected={view === "USER"}
                className="fas fa-eye"
              />
              <ViewIcon
                onClick={() => this.handleOnClickView("JSON")}
                isSelected={view === "JSON"}
                className="fas fa-file-alt"
              />
            </ViewsContainer>
          </Item>
        </BodyColumn>
      </BodyContainer>
    );
  }
}

export default Body;
