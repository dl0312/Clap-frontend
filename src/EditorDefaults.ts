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
  BUILDER_NOTHING: "rgba(0,0,0,0.1)",
  BUILDER_ONDRAG_COLOR: "#c9abd8",
  BUILDER_ISOVER_COLOR: "#7158e2",
  BORDER_SELECT_COLOR: "#000",
  BORDER_ISOVER_COLOR: "#bbb",
  CLAP_IMG_TEXT_COLOR: "GoldenRod",
  DEFAULT_EDITOR_BLOCK: [
    {
      type: "columnList",
      onDrag: "columnList",
      content: [1],
      columnListArray: [
        [
          {
            type: "content",
            onDrag: "content",
            content: "TEXT",
            value: {
              object: "value",
              document: {
                object: "document",
                data: {},
                nodes: [
                  {
                    object: "block",
                    type: "line",
                    isVoid: false,
                    data: {},
                    nodes: [
                      {
                        object: "text",
                        leaves: [
                          {
                            object: "leaf",
                            text: "",
                            marks: []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
      ]
    }
  ],

  HANDLE_COLOR: "#000"
};
