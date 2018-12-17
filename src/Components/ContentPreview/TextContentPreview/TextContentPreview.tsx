import * as React from "react";
import styled from "styled-components";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin from "draft-js-mention-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
const mentionPlugin = createMentionPlugin();
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true
});

const plugins = [mentionPlugin, emojiPlugin];

const customStyleMap = {
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
  },
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
  },
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
  },
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

const DragSourceArea = styled.div`
  background-color: rgba(0, 0, 0, 0.08);
  transition-property: opacity, background;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IEditorWrapperProps {
  textStyle: "alignLeft" | "alignCenter" | "alignRight" | "alignJustify";
}

const EditorWrapper = styled<IEditorWrapperProps, any>("div")`
  position: relative;
  z-index: 2;
  text-align: ${props => props.textStyle};
`;

interface ITextContents {
  editorState: EditorState;
  style: "alignLeft" | "alignCenter" | "alignRight" | "alignJustify";
}

interface IProps {
  index: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
  contents: ITextContents;
  selected?: boolean;
  hoveredIndex: number | null;
  selectedIndex: number | null;
  callbackfromparent: any;
  masterCallback: any;
  pushPresentBlockToTargetIndex: any;
  pushNewBlockToTargetIndex: any;
  setTargetIndex: any;
  handleOnChange?: any;
  wikiRef: any;
  scrollWrapperRef: any;
  activeEditorRef: any;
  gameId: any;
}
interface IState {
  toolbarState: "follow" | "sticky" | "blind";
  isWriteMode: boolean;
  suggestions: any;
  mentions: any;
}

class TextContentPreview extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      toolbarState: "follow",
      isWriteMode: false,
      suggestions: [],
      mentions: []
    };
  }

  public render() {
    const {
      contents: { editorState, style }
    } = this.props;
    return (
      <>
        <DragSourceArea />
        <EditorWrapper id={"editor_wrapper"} textStyle={style}>
          <Editor
            customStyleMap={customStyleMap}
            readOnly={true}
            editorState={editorState}
            plugins={plugins}
          />
        </EditorWrapper>
      </>
    );
  }
}

export default TextContentPreview;
