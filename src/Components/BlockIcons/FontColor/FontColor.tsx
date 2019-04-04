import React from "react";
import styled from "styled-components";
import { GithubPicker } from "react-color";
import { Modifier, EditorState, RichUtils } from "draft-js";

// const FONTSIZES = [
//   { label: "TEXT 1", style: "size1" },
//   { label: "TEXT 2", style: "size2" },
//   { label: "TEXT 3", style: "size3" },
//   { label: "TEXT 4", style: "size4" },
//   { label: "TEXT 5", style: "size5" }
// ];

const fontColorStyleMap = {
  colorb80000: {
    color: "#B80000"
  },
  colordb3e00: {
    color: "#DB3E00"
  },
  colorfccb00: {
    color: "#FCCB00"
  },
  color008b02: {
    color: "#008B02"
  },
  color006b76: {
    color: "#006B76"
  },
  color1273de: {
    color: "#1273DE"
  },
  color004dcf: {
    color: "#004DCF"
  },
  color5300eb: {
    color: "#5300EB"
  },
  coloreb9694: {
    color: "#EB9694"
  },
  colorfad0c3: {
    color: "#FAD0C3"
  },
  colorfef3bd: {
    color: "#FEF3BD"
  },
  colorc1e1c5: {
    color: "#C1E1C5"
  },
  colorbedadc: {
    color: "#BEDADC"
  },
  colorc4def6: {
    color: "#C4DEF6"
  },
  colorbed3f3: {
    color: "#BED3F3"
  },
  colord4c4fb: {
    color: "#D4C4FB"
  }
};

const ButtonIcon = styled.i`
  width: 31px;
  height: 31px;
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

const CurrentFontColor = styled.div`
  height: 6px;
  width: 6px;
  right: 6px;
  top: 6px;
  transition: 0.2s ease;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  position: absolute;
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
  isFontColorWindowOpen: boolean;
}

class FontColor extends React.Component<IProps, IState> {
  wrapperRef: any;
  constructor(props: IProps) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      isFontColorWindowOpen: false
    };
  }

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  handleClickOutside(event: any) {
    event.preventDefault();
    if (
      this.wrapperRef &&
      this.wrapperRef.current !== null &&
      !this.wrapperRef.contains(event.target)
    ) {
      this.setState({ isFontColorWindowOpen: false });
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  public toggleFontColorChangeWindow = () => {
    if (!this.state.isFontColorWindowOpen) {
      this.setState({
        isFontColorWindowOpen: true
      });
      document.addEventListener("mousedown", this.handleClickOutside);
    } else {
      this.setState({
        isFontColorWindowOpen: false
      });
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  };

  public toggleFontColor = (toggledFontColor: string) => {
    console.log(toggledFontColor);
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(fontColorStyleMap).reduce(
      (contentState, fontColor) => {
        return Modifier.removeInlineStyle(contentState, selection, fontColor);
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
      nextEditorState = currentStyle.reduce((state: any, fontColor: any) => {
        console.log(state, fontColor);
        return RichUtils.toggleInlineStyle(state, fontColor);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      toggledFontColor
    );
    this.props.handleOnChange(nextEditorState, this.props.index, "editorState");
  };

  public render() {
    const { isFontColorWindowOpen } = this.state;
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    const sizeArray = currentStyle.filter((style: string) =>
      style.includes("color")
    );
    const currentFontColor = sizeArray.size
      ? "#" + sizeArray.first().substring(5)
      : "#000000";
    return (
      <div ref={(instance: any) => this.setWrapperRef(instance)}>
        <ButtonIcon
          className="fas fa-font"
          onClick={this.toggleFontColorChangeWindow}
        >
          <CurrentFontColor style={{ backgroundColor: currentFontColor }} />
        </ButtonIcon>
        {isFontColorWindowOpen ? (
          <ColorPickerContainer>
            <GithubPicker
              width={"212px"}
              onChange={(color: any) => {
                console.log(color);
                this.toggleFontColor("color" + color.hex.substring(1));
                this.setState({ isFontColorWindowOpen: false });
              }}
            />
          </ColorPickerContainer>
        ) : null}
      </div>
    );
  }
}

export default FontColor;
