import * as React from "react";
import styled from "styled-components";
import EditorDefaults from "../../../EditorDefaults";
import Sketch from "../../../Uility/Sketch";

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
  view: "EDIT" | "USER" | "JSON";
  masterCallback: any;
}

interface IState {
  displayFontFamily: boolean;
  displayViews: boolean;
  view: "EDIT" | "USER" | "JSON";
  contentWidth: number;
  font: string;
}

class Body extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      displayFontFamily: false,
      displayViews: false,
      view: this.props.view,
      contentWidth: EditorDefaults.WIDTH,
      font: EditorDefaults.FONT
    };
  }

  public handleOnChange = () => {
    this.props.masterCallback("width", this.state.contentWidth);
  };

  public handleOnClick = (type: "FontFamily" | "View") => {
    if (type === "FontFamily") {
      this.setState({ displayFontFamily: !this.state.displayFontFamily });
    } else if (type === "View") {
      this.setState({ displayViews: !this.state.displayViews });
    }
  };

  public handleOperatorOnClick = (operator: "-" | "+") => {
    if (operator === "-") {
      if (this.state.contentWidth > 200) {
        this.setState(
          {
            contentWidth: this.state.contentWidth - 50
          },
          () => this.handleOnChange()
        );
      }
    } else if (operator === "+") {
      if (this.state.contentWidth < 800) {
        this.setState(
          {
            contentWidth: this.state.contentWidth + 50
          },
          () => this.handleOnChange()
        );
      }
    }
  };

  public handleOnClickFont = () => {
    this.props.masterCallback("font", this.state.font);
  };

  public handleOnClickView = (view: "EDIT" | "USER" | "JSON") => {
    this.setState({ view }, () =>
      this.props.masterCallback("view", this.state.view)
    );
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
              type="BodyBackgroundColor"
              color={EditorDefaults.BACKGROUND_COLOR}
            />
          </Item>
          <Item>
            Content Width
            <div>
              <Operator onClick={() => this.handleOperatorOnClick("-")}>
                -
              </Operator>
              <Indicator value={this.state.contentWidth} readOnly={true} />
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
                  <SwatchFont fontFamily={this.state.font}>
                    {this.state.font}
                  </SwatchFont>
                </Swatch>
                {this.state.displayFontFamily ? (
                  <PopOver>
                    <FontColumn>
                      {fontFamily.map(font => (
                        <FontColumnItem
                          onClick={() =>
                            this.setState(
                              {
                                font
                              },
                              () => this.handleOnClickFont()
                            )
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
