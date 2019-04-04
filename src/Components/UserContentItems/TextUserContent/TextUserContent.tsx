import * as React from "react";
import styled from "styled-components";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin from "draft-js-mention-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionComponent: (mentionProps: any) => {
    console.log(mentionProps);
    const { name } = mentionProps.mention;
    return (
      <GetCategoryById
        query={CATEGORY}
        fetchPolicy={"cache-and-network"}
        variables={{ categoryId: mentionProps.mention.id }}
      >
        {({ loading, data, error }) => {
          if (loading)
            return (
              <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                {name}
              </ClapImageText>
            );
          if (error) return `${error.message}`;
          if (data !== undefined) {
            const { category } = data.GetCategoryById;
            return (
              category &&
              category.topWikiImage && (
                <Popover
                  placement="leftTop"
                  content={
                    `ekko`
                    // <HoverView
                    //   json={JSON.parse(
                    //     category.topWikiImage.hoverImage
                    //   )}
                    // />
                  }
                  title={
                    <>
                      <ClapImage
                        src={category.topWikiImage.shownImage}
                        alt={"hover"}
                      />
                      <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                        {category.name}
                      </ClapImageText>
                    </>
                  }
                  trigger="hover"
                >
                  <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                    {mentionProps.children}
                  </ClapImageText>
                </Popover>
              )
            );
          } else return null;
        }}
      </GetCategoryById>
    );
  }
});
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true
});
import _ from "lodash";
import { getCategoryById, getCategoryByIdVariables } from "src/types/api";
import { Query } from "react-apollo";
import { CATEGORY } from "src/sharedQueries";
import { Popover } from "antd";
import EditorDefaults from "src/EditorDefaults";

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

interface IClapImageProps {
  selected: boolean;
}

const ClapImage = styled<IClapImageProps, any>("img")`
  width: 20px;
  margin-left: 2px;
  margin-right: 2px;
  max-width: 100%;
  max-height: 20em;
  margin-bottom: -4px;
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

const ClapImageText = styled.span`
  font-weight: bolder;
  color: ${props => props.color};
`;

interface ITextContentWrapperProps {
  textColor: { r: string; g: string; b: string; a: string };
  textAlign: "left" | "center" | "right";
}

const TextContentWrapper = styled<ITextContentWrapperProps, any>("div")`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
  text-align: ${props => props.textAlign};
  width: 100%;
  cursor: auto;
  line-height: 1.9;
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

class GetCategoryById extends Query<
  getCategoryById,
  getCategoryByIdVariables
> {}

interface IProps {
  contents: ITextContents;
}

class TextUserContent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {
      contents: { editorState, style }
      // plugins,
    } = this.props;
    console.log(editorState, style);

    return (
      <TextContentWrapper textAlign={"left"} className={"markdown-body"}>
        <EditorWrapper id={"editor_wrapper"} textStyle={style}>
          <Editor
            customStyleMap={customStyleMap}
            readOnly={true}
            editorState={editorState}
            plugins={plugins}
            onEditorStateChange={(editorState: any) => editorState}
            // onBlur={() => {
            //   console.log(`onblur`);
            //   // this.setState({ isWriteMode: false });
            // }}
          />
        </EditorWrapper>
      </TextContentWrapper>
    );
  }
}

export default TextUserContent;
