import React from "react";
import styled from "styled-components";
import { GithubPicker } from "react-color";
import { Modifier, EditorState, RichUtils } from "draft-js";

const backgroundColorStyleMap = {
  backgroundColorb80000: {
    backgroundColor: "#B80000"
  },
  backgroundColordb3e00: {
    backgroundColor: "#DB3E00"
  },
  backgroundColorfccb00: {
    backgroundColor: "#FCCB00"
  },
  backgroundColor008b02: {
    backgroundColor: "#008B02"
  },
  backgroundColor006b76: {
    backgroundColor: "#006B76"
  },
  backgroundColor1273de: {
    backgroundColor: "#1273DE"
  },
  backgroundColor004dcf: {
    backgroundColor: "#004DCF"
  },
  backgroundColor5300eb: {
    backgroundColor: "#5300EB"
  },
  backgroundColoreb9694: {
    backgroundColor: "#EB9694"
  },
  backgroundColorfad0c3: {
    backgroundColor: "#FAD0C3"
  },
  backgroundColorfef3bd: {
    backgroundColor: "#FEF3BD"
  },
  backgroundColorc1e1c5: {
    backgroundColor: "#C1E1C5"
  },
  backgroundColorbedadc: {
    backgroundColor: "#BEDADC"
  },
  backgroundColorc4def6: {
    backgroundColor: "#C4DEF6"
  },
  backgroundColorbed3f3: {
    backgroundColor: "#BED3F3"
  },
  backgroundColord4c4fb: {
    backgroundColor: "#D4C4FB"
  }
};

const ButtonIcon = styled.i`
  width: 21px;
  height: 21px;
  margin: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
  opacity: 0.65;
  &:hover {
    opacity: 1;
  }
`;

const ColorPickerContainer = styled.div`
  position: absolute;
  left: -2px;
  top: 40px;
`;

interface IProps {
  index: number;
  editorState: EditorState;
  handleOnChange: any;
}

interface IState {
  isBackgroundColorWindowOpen: boolean;
}

class BackgroundColor extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isBackgroundColorWindowOpen: false
    };
  }

  public toggleBackgroundColorChangeWindow = () => {
    this.setState({
      isBackgroundColorWindowOpen: !this.state.isBackgroundColorWindowOpen
    });
  };

  public toggleBackgroundColor = (toggledBackgroundColor: string) => {
    console.log(toggledBackgroundColor);
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(backgroundColorStyleMap).reduce(
      (contentState, backgroundColor) => {
        return Modifier.removeInlineStyle(
          contentState,
          selection,
          backgroundColor
        );
      },
      editorState.getCurrentContent()
    );
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce(
        (state: any, backgroundColor: any) => {
          console.log(state, backgroundColor);
          return RichUtils.toggleInlineStyle(state, backgroundColor);
        },
        nextEditorState
      );
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledBackgroundColor)) {
      console.log(currentStyle.has(toggledBackgroundColor));
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledBackgroundColor
      );
    }
    this.props.handleOnChange(nextEditorState, this.props.index, "editorState");
  };

  public render() {
    const { isBackgroundColorWindowOpen } = this.state;
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    const backgroundColorArray = currentStyle.filter((style: string) =>
      style.includes("backgroundColor")
    );
    const currentFontColor = backgroundColorArray.size
      ? "#" + backgroundColorArray.first().substring(15)
      : null;
    console.log(currentFontColor);
    return (
      <>
        <ButtonIcon
          className="fas fa-font"
          onClick={this.toggleBackgroundColorChangeWindow}
          style={{
            color: currentFontColor ? "white" : "black",
            border: currentFontColor
              ? "transparent"
              : "0.5px solid rgba(0, 0, 0, 0.3)",
            backgroundColor: currentFontColor ? currentFontColor : "transparent"
          }}
        />
        {isBackgroundColorWindowOpen ? (
          <ColorPickerContainer>
            <GithubPicker
              width={"212px"}
              onChange={(color: any) => {
                console.log(color);
                this.toggleBackgroundColor(
                  "backgroundColor" + color.hex.substring(1)
                );
              }}
            />
          </ColorPickerContainer>
        ) : null}
      </>
    );
  }
}

export default BackgroundColor;
