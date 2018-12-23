import { EditorState } from "draft-js";

const matrix: any = [];
for (let i = 0; i < 3; i++) {
  matrix[i] = [];
  for (let j = 0; j < 3; j++) {
    matrix[i][j] = {
      width: "33.33%",
      height: "43px",
      editorState: EditorState.createEmpty()
    };
  }
}

export default {
  // Content
  MAIN_TEXT_COLOR: "#000",
  MAIN_BACKGROUND_COLOR: "#fff",
  MAIN_TEXT_MILD_COLOR: "#555",
  MAIN_BACKGROUND_MILD_COLOR: "#999",

  // IMG: "https://media.giphy.com/media/d2Z9QYzA2aidiWn6/giphy.gif",
  // VIDEO: "TRmdXDH9b1s",
  BUTTON: "CLICK ME!",
  BUTTON_TEXT_COLOR: { r: "255", g: "255", b: "255", a: "1" },
  BUTTON_BACKGROUND_COLOR: { r: "58", g: "174", b: "224", a: "1" },
  BUTTON_HOVER_COLOR: { r: "58", g: "174", b: "224", a: "1" },
  TEXT: "A line of text in a paragraph.",
  TEXT_TEXT_COLOR: { r: "255", g: "255", b: "255", a: "1" },
  TEXT_BACKGROUND_COLOR: { r: "255", g: "255", b: "255", a: "0" },
  HTML: "Hello, world!",

  // Body
  VIEW: "EDIT",
  BACKGROUND_COLOR: { r: 255, g: 255, b: 255, a: 1 },
  WIDTH: 800,
  FONT: "Open Sans",
  BUILDER_NOTHING: "rgba(0,0,0,0)",
  BUILDER_ONDRAG_COLOR: "#c9abd8",
  BUILDER_ISOVER_COLOR: "#7158e2",
  BORDER_SELECT_COLOR: "#000",
  BORDER_ISOVER_COLOR: "rgba(0,0,0,.12)",
  CLAP_IMG_TEXT_COLOR: "GoldenRod",
  DEFAULT_TEXT_BLOCK: {
    type: "Text",
    contents: {
      editorState: EditorState.createEmpty(),
      style: "justify"
    }
  },
  DEFAULT_TABLE_BLOCK: {
    type: "Table",
    contents: {
      tableMatrix: matrix,
      style: null
    }
  },
  DEFAULT_DIVIDER_BLOCK: {
    type: "Divider",
    contents: {
      style: null
    }
  },
  DEFAULT_EDITOR_BLOCK: [
    {
      type: "Text",
      contents: {
        editorState: EditorState.createEmpty(),
        style: "justify"
      }
    }
  ],

  HANDLE_COLOR: "#000"
};
