import React from "react";
import styled from "styled-components";
import { Modifier, EditorState, RichUtils } from "draft-js";

const FONTSIZES = [
  { label: "TEXT 1", style: "size1" },
  { label: "TEXT 2", style: "size2" },
  { label: "TEXT 3", style: "size3" },
  { label: "TEXT 4", style: "size4" },
  { label: "TEXT 5", style: "size5" }
];

const fontSizeStyleMap = {
  size1: {
    fontSize: "28px"
  },
  size2: {
    fontSize: "19px"
  },
  size3: {
    fontSize: "16px"
  },
  size4: {
    fontSize: "13px"
  },
  size5: {
    fontSize: "11px"
  }
};

interface ICurrentFontSizeProps {
  isFontSizeWindowOpen: boolean;
}

const CurrentFontSize = styled<ICurrentFontSizeProps, any>("div")`
  height: 30px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.isFontSizeWindowOpen ? "#00bcd4" : null)};
  cursor: pointer;
  opacity: ${props => (props.isFontSizeWindowOpen ? "1" : "0.65")};
  transition: 0.2s ease;
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
  width: 110px;
  background: white;
  border-radius: 2px;
  margin: 0;
  padding: 0;
  max-height: 250px;
  padding-top: 8px;
  padding-bottom: 10px;
`;

interface IDropdownItem {
  textStyle: string;
  active: boolean;
}

const DropdownItem = styled<IDropdownItem, any>("li")`
  padding: 5px 14px 5px 7px;
  line-height: 1;
  font-size: ${props =>
    props.textStyle === "size1"
      ? "28px"
      : props.textStyle === "size2"
      ? "19px"
      : props.textStyle === "size3"
      ? "16px"
      : props.textStyle === "size4"
      ? "13px"
      : "11px"};
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
  isFontSizeWindowOpen: boolean;
}

class FontSize extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFontSizeWindowOpen: false
    };
  }

  public toggleSizeChangeWindow = () => {
    this.setState({
      isFontSizeWindowOpen: !this.state.isFontSizeWindowOpen
    });
  };

  public toggleFontSize = (toggledFontSize: string) => {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(fontSizeStyleMap).reduce(
      (contentState, fontSize) => {
        return Modifier.removeInlineStyle(contentState, selection, fontSize);
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
      nextEditorState = currentStyle.reduce((state: any, fontSize: any) => {
        return RichUtils.toggleInlineStyle(state, fontSize);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      toggledFontSize
    );
    this.props.handleOnChange(nextEditorState, this.props.index, "editorState");
  };

  public render() {
    const { isFontSizeWindowOpen } = this.state;
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    const sizeArray = currentStyle.filter((style: string) =>
      style.includes("size")
    );
    const currentFontSize = sizeArray.size
      ? "TEXT " + sizeArray.first().substring(4)
      : "TEXT 3";
    return (
      <>
        <CurrentFontSize
          onClick={this.toggleSizeChangeWindow}
          isFontSizeWindowOpen={isFontSizeWindowOpen}
        >
          {currentFontSize}
        </CurrentFontSize>
        {isFontSizeWindowOpen ? (
          <Dropdown>
            <DropdownItemsContainer>
              {FONTSIZES.map(type => (
                <DropdownItem
                  onClick={(e: any) => {
                    e.preventDefault();
                    this.toggleFontSize(type.style);
                  }}
                  key={type.label}
                  textStyle={type.style}
                  active={currentFontSize === type.label}
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

export default FontSize;
