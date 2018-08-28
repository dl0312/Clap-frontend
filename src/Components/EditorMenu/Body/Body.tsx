class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFontFamily: false,
      view: this.props.view,
      contentWidth: EditorDefaults.WIDTH,
      font: EditorDefaults.FONT
    };
  }

  handleOnChange = () => {
    this.props.masterCallback("width", this.state.contentWidth);
  };

  handleOnClick = type => {
    if (type === "FontFamily") {
      this.setState({ displayFontFamily: !this.state.displayFontFamily });
    } else if (type === "View") {
      this.setState({ displayViews: !this.state.displayViews });
    }
  };

  handleOperatorOnClick = operator => {
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
      if (this.state.contentWidth < 800)
        this.setState(
          {
            contentWidth: this.state.contentWidth + 50
          },
          () => this.handleOnChange()
        );
    }
  };

  handleOnClickFont = () => {
    this.props.masterCallback("font", this.state.font);
  };

  handleOnClickView = view => {
    this.setState({ view }, () =>
      this.props.masterCallback("view", this.state.view)
    );
  };

  render() {
    const { view } = this.state;
    return (
      <BodyContainer>
        <NavBar>GENERAL</NavBar>
        <BodyColumn>
          <Item>
            Background Color
            <SketchExample
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
              <Indicator value={this.state.contentWidth} readOnly="true" />
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
