import React from "react";
import styled from "styled-components";
import { Modifier, EditorState, RichUtils } from "draft-js";

const FONTFAMILYS = [
  { label: "기본서체", style: "fontFamily1" },
  { label: "나눔명조", style: "fontFamily2" },
  { label: "나눔고딕", style: "fontFamily3" },
  { label: "나눔펜", style: "fontFamily4" }
];

const fontFamilyStyleMap = {
  fontFamily1: {
    fontFamily: "Gothic A1, sans-serif"
  },
  fontFamily2: {
    fontFamily: "Nanum Myeongjo, serif"
  },
  fontFamily3: {
    fontFamily: "Nanum Gothic, sans-serif"
  },
  fontFamily4: {
    fontFamily: "Nanum Pen Script, cursive"
  }
};

interface ICurrentFontFamilyProps {
  isFontFamilyWindowOpen: boolean;
  fontStyle: string;
}

const CurrentFontFamily = styled<ICurrentFontFamilyProps, any>("div")`
  height: 30px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.isFontFamilyWindowOpen ? "#00bcd4" : null)};
  cursor: pointer;
  opacity: ${props => (props.isFontFamilyWindowOpen ? "1" : "0.65")};
  transition: 0.2s ease;
  font-family: ${props =>
    props.fontStyle === "기본서체"
      ? "Gothic A1, sans-serif"
      : props.fontStyle === "나눔명조"
      ? "Nanum Myeongjo, serif"
      : props.fontStyle === "나눔고딕"
      ? "Nanum Gothic, sans-serif"
      : props.fontStyle === "나눔펜"
      ? "Nanum Pen Script, cursive"
      : null};
  &:hover {
    opacity: 1;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  left: -1px;
`;

const DropdownItemsContainer = styled.ul`
  z-index: 100;
  position: relative;
  border: 1px solid #cecece;
  background: white;
  border-radius: 2px;
  margin: 0;
  padding: 0;
  max-height: 250px;

  width: 95px;
  padding: 7px 0;
`;

interface IDropdownItem {
  textStyle: string;
  active: boolean;
}

const DropdownItem = styled<IDropdownItem, any>("li")`
  padding: 8px 14px;
  font-size: 13px;
  line-height: 1;
  font-family: ${props =>
    props.textStyle === "fontFamily1"
      ? "Gothic A1, sans-serif"
      : props.textStyle === "fontFamily2"
      ? "Nanum Myeongjo, serif"
      : props.textStyle === "fontFamily3"
      ? "Nanum Gothic, sans-serif"
      : "Noto Sans KR, sans-serif"};
  cursor: pointer;
  color: ${props => (props.active ? "#00bcd4" : null)};
  &:hover {
    background: #f1f1f1;
  }
`;

interface IProps {
  index: number;
  editorState: EditorState;
  handleOnChange: any;
}

interface IState {
  isFontFamilyWindowOpen: boolean;
}

class FontFamily extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFontFamilyWindowOpen: false
    };
  }

  public toggleFontFamilyChangeWindow = () => {
    this.setState({
      isFontFamilyWindowOpen: !this.state.isFontFamilyWindowOpen
    });
  };

  public toggleFontFamily = (toggledFontFamily: string) => {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(fontFamilyStyleMap).reduce(
      (contentState, fontFamily) => {
        return Modifier.removeInlineStyle(contentState, selection, fontFamily);
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
      nextEditorState = currentStyle.reduce((state: any, fontFamily: any) => {
        return RichUtils.toggleInlineStyle(state, fontFamily);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      toggledFontFamily
    );
    this.props.handleOnChange(nextEditorState, this.props.index, "editorState");
  };

  public render() {
    const { isFontFamilyWindowOpen } = this.state;
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    const fontFamilyArray = currentStyle.filter((style: string) =>
      style.includes("fontFamily")
    );
    const currentFontFamily = fontFamilyArray.size
      ? FONTFAMILYS[parseInt(fontFamilyArray.first().substring(10), 10) - 1]
          .label
      : "나눔고딕";
    return (
      <>
        <CurrentFontFamily
          onClick={this.toggleFontFamilyChangeWindow}
          isFontFamilyWindowOpen={isFontFamilyWindowOpen}
          fontStyle={currentFontFamily}
        >
          {currentFontFamily}
        </CurrentFontFamily>
        {isFontFamilyWindowOpen ? (
          <Dropdown>
            <DropdownItemsContainer>
              {FONTFAMILYS.map(type => (
                <DropdownItem
                  onClick={(e: any) => {
                    e.preventDefault();
                    this.toggleFontFamily(type.style);
                  }}
                  key={type.label}
                  textStyle={type.style}
                  active={type.label === currentFontFamily}
                >
                  {type.label}
                </DropdownItem>
              ))}
            </DropdownItemsContainer>
          </Dropdown>
        ) : null}
      </>
    );
  }
}

export default FontFamily;
