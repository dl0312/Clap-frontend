import * as React from "react";
import EditorLeft from "../EditorLeft";
import EditorRight from "../EditorRight";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Card from "../Card";
import Column from "../Column";
import styled from "styled-components";
import EditorDefaults from "../../EditorDefaults";
import JsonView from "../JsonView";
import UserView from "../UserView";
import BlockOptions from "../BlockOptions";
import { media } from "../../config/_mixin";
import ImagePopup from "../ImagePopup";
import { Value } from "slate";
import EmptyCard from "../EmptyCard";
import Upload from "../Upload";
import { RenderNodeProps, RenderMarkProps } from "slate-react";
import {
  POST,
  POSTS,
  WIKIIMAGE,
  CATEGORIES_KEYWORD
} from "../../sharedQueries";

import { Row, Col } from "antd";
import { AlignCenter, AlignLeft, AlignRight } from "@canner/slate-icon-align";
import Blockquote from "@canner/slate-icon-blockquote";
import Bold from "@canner/slate-icon-bold";
// import Clean from "@canner/slate-icon-clean";
// import Code from "@canner/slate-icon-code";
// import CodeBlock from "@canner/slate-icon-codeblock";
// import Emoji, {EmojiPlugin} from '@canner/slate-icon-emoji';
import FontBgColor from "@canner/slate-icon-fontbgcolor";
import FontColor from "@canner/slate-icon-fontcolor";
import { Header1, Header2 } from "@canner/slate-icon-header";
import Hr from "@canner/slate-icon-hr";
// import Image from "@canner/slate-icon-image";
// import { Indent, Outdent } from "@canner/slate-icon-indent";
import Italic from "@canner/slate-icon-italic";
import Table from "@canner/slate-icon-table";
import Link from "@canner/slate-icon-link";
import { OlList, UlList } from "@canner/slate-icon-list";
import StrikeThrough from "@canner/slate-icon-strikethrough";
import Underline from "@canner/slate-icon-underline";
import Undo from "@canner/slate-icon-undo";
import Redo from "@canner/slate-icon-redo";
import Video from "@canner/slate-icon-video";

// select
// import FontSize from "@canner/slate-select-fontsize";
// import LetterSpacing from "@canner/slate-select-letterspacing";
// import LineHeight from "@canner/slate-select-lineheight";

// plugins
import "prismjs/themes/prism.css";

// const selectors = [FontSize, LetterSpacing, LineHeight];
const icons = [
  AlignLeft,
  AlignCenter,
  AlignRight,
  Blockquote,
  Bold,
  Italic,
  // Clean,
  // Code,
  // CodeBlock,
  // Emoji,
  FontBgColor,
  FontColor,
  Hr,
  Header1,
  Header2,
  // Image,
  Video,
  // Indent,
  // Outdent,
  Link,
  OlList,
  UlList,
  Table,
  StrikeThrough,
  Underline,
  Undo,
  Redo
];

import update from "immutability-helper";
import { GetPos } from "../../Utility/GetPos";
import { MutationFn } from "react-apollo";
import { addPost, addPostVariables } from "../../types/api";
import { Button } from "../../sharedStyle";
import Textarea from "../Textarea";
import Template from "../Template";
import CategorySelection from "../CategorySelection";

interface IEditorContainerProps {
  type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT";
}

const EditorContainer = styled<IEditorContainerProps, any>("div")`
  width: 100%;
  height: ${props =>
    props.type === "WIKIIMAGE_ADD" || props.type === "WIKIIMAGE_EDIT"
      ? "700px"
      : null};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: ${EditorDefaults.MAIN_TEXT_COLOR};
`;

const EditorNavOne = styled.div`
  height: 45px;
  background-color: ${EditorDefaults.MAIN_BACKGROUND_COLOR};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;

const LogoContainer = styled.div``;

const Logo = styled.div`
  text-align: center;
  padding: 9px 30px;
  color: white;
  text-decoration: none;
  font-family: "Raleway";
  font-weight: 100;
  letter-spacing: 10px;
  font-size: 15px;
  color: ${EditorDefaults.MAIN_TEXT_COLOR};
`;

const DeviceSelectorContainer = styled.div`
  justify-self: auto;
  position: absolute;
  top: 10px;
  left: 50%;
  height: 34px;
  width: 200px;
  margin-left: -136px;
  text-align: center;
`;

interface IDeviceProps {
  selected: boolean;
}

const Device = styled<IDeviceProps, any>("svg")`
  margin: 0px 15px;
  cursor: pointer;
  fill: ${props => (props.selected ? "#7158e2" : "black")};
  opacity: ${props => (props.selected ? "1" : "0.5")};
  transition: opacity 0.2s ease, fill 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

const EditorButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveButton = Button.extend`
  border-radius: 100px;
`;

const QestionButton = Button.extend`
  padding: 10px 13px;
  border-radius: 100%;
  font-weight: bolder;
`;

const MoreOptionButton = styled.i`
  font-size: 15px;
  margin: 0 5px;
`;

const TemplateButtonContainer = styled.div``;

const TemplateButton = Button.extend``;

const EditorUtilButtonContainer = styled.div`
  justify-self: auto;
  position: absolute;
  top: 60px;
  left: 50%;
  height: 34px;
  width: 200px;
  margin-left: -136px;
  text-align: center;
`;

const EditorNavTwo = styled.div`
  height: 43px;
  background-color: ${EditorDefaults.MAIN_BACKGROUND_COLOR};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;

const EditorContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 88px;
  bottom: 0px;
  right: 0px;
  left: 0px;
`;

// const EditorContainer = styled<IEditorContainerProps, any>("div")`
//   width: 100%;
//   height: ${props =>
//     props.type === "WIKIIMAGE_ADD" || props.type === "WIKIIMAGE_EDIT"
//       ? "700px"
//       : null};
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   overflow: hidden;
//   position: ${props =>
//     props.type === "WIKIIMAGE_ADD" || props.type === "WIKIIMAGE_EDIT"
//       ? null
//       : "absolute"};
//   top: ${props =>
//     props.type === "WIKIIMAGE_ADD" || props.type === "WIKIIMAGE_EDIT"
//       ? "80%"
//       : "100px"};
//   bottom: 0px;
//   right: 0;
//   left: 0;
// `;

// const RealEditorContainer = styled.div`
//   width: 1200px;
//   padding: 15px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   background-color: #555;
// `;

const EditorLeftOuterContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  ${media.tablet`width: 100%;`};
  ${media.phone`width: 100%;`};
`;

interface IEditorLeftContainerProps {
  bodyBackgroundColor: { r: number; g: number; b: number; a: number };
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const EditorLeftContainer = styled<IEditorLeftContainerProps, any>("div")`
  position: relative;
  width: ${props =>
    props.device === "PHONE"
      ? "425px"
      : props.device === "TABLET"
        ? "767px"
        : props.device === "DESKTOP"
          ? "100%"
          : "100%"};
  /* overflow-y: hidden; */
  background-color: ${props =>
    `rgba(${props.bodyBackgroundColor.r}, ${props.bodyBackgroundColor.g}, ${
      props.bodyBackgroundColor.b
    }, ${props.bodyBackgroundColor.a})`};

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  /* border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2); */
  transition: width 0.5s ease;
`;

const TitleContainer = styled.div`
  max-width: 800px;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const TitleInput = styled(Textarea)`
  width: 100%;
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  cursor: text;
  overflow: hidden;
  font-size: 32px;
  line-height: 42px;
  font-weight: 400;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  margin: 0 10px;
`;

const CategoryButton = styled.i`
  position: absolute;
  right: 20px;
  top: 70px;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

const CategorySelectionContainer = styled.div`
  position: absolute;
  z-index: 999;
  width: 400px;
  height: 500px;
  right: 10px;
  top: 100px;
  background-color: transparent;
`;

const EditorRightContainer = styled.div`
  background-color: white;
  transition: width 1s ease;
  width: 25%;
  min-width: 400px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  ${media.tablet`width: 0%;  min-width: 0px;
`};
  ${media.phone`width: 0%;`};
`;

const TextEditorButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px 2px 0 0;
  line-height: 0px !important;
  background-color: #fff;
`;

const TextEditorButton = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #ebebeb;
  }
`;

interface IClapImageProps {
  small: boolean;
  selected: boolean;
}

const ClapImage = styled<IClapImageProps, any>("img")`
  width: ${props => (props.small ? "20px" : null)};
  margin-left: ${props => (props.small ? "2px" : null)};
  margin-right: ${props => (props.small ? "2px" : null)};
  max-width: 100%;
  max-height: 20em;
  margin-bottom: ${props => (props.small ? "-4px" : null)};
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

interface IClapImageContainerProps {
  small: boolean;
}

const ClapImageContainer = styled<IClapImageContainerProps, any>("span")`
  margin-left: ${props => (props.small ? "2px" : null)};
  margin-right: ${props => (props.small ? "2px" : null)};
  cursor: pointer;
`;

const ClapImageText = styled.span`
  font-weight: bolder;
  color: ${props => props.color};
`;

const PostButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const PostButton = Button.extend`
  border-radius: 100px;
  background-color: #7158e2;
  color: white;
`;

interface IProps {
  type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT" | "POST_ADD" | "POST_EDIT";
  postId?: number;
  wikiImage?: any;
  state?: any;
  AddPost?: MutationFn<addPost, addPostVariables>;
  EditPost?: any;
  AddWikiImage?: any;
  EditWikiImage?: any;
  categoryId?: number;
}

interface IState {
  rightMenu: number | null;
  view: "EDIT" | "USER" | "JSON";
  device: "PHONE" | "TABLET" | "DESKTOP";
  templatePopUp: boolean;
  categoryPopUp: boolean;
  bodyBackgroundColor: { r: number; g: number; b: number; a: number };
  contentWidth: number;
  font: string;
  onDrag: "content" | "columnList" | null;
  selectedIndex: number | number[] | null;
  hoveredIndex: number | number[] | null;
  selectedContent: any;
  hoverImgJson: any;
  onImage: boolean;
  exShownImg: { url: string; id: string };
  pos: { x: number; y: number };
  title: string;
  category: number[];
  cards: any[];
}

class Editor extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      rightMenu: null,
      view: "EDIT",
      device: "DESKTOP",
      templatePopUp: false,
      categoryPopUp: false,
      bodyBackgroundColor: EditorDefaults.BACKGROUND_COLOR,
      contentWidth: EditorDefaults.WIDTH,
      font: EditorDefaults.FONT,
      onDrag: null,
      selectedIndex: null,
      hoveredIndex: null,
      selectedContent: null,
      hoverImgJson: null,
      onImage: false,
      exShownImg:
        this.props.type === "WIKIIMAGE_EDIT"
          ? this.props.wikiImage.shownImage
          : { url: null, id: null },
      pos: { x: 0, y: 0 },
      title: "",
      category: [],
      cards: [],
      ...props.state
    };
    // this.state = { ...props.state };
  }

  public addIdToState = (
    type: "parent" | "child" | null,
    category: { id: number }
  ): void => {
    console.log(type);
    console.log(category);
    const found = this.state.category.indexOf(category.id) !== -1;
    const hasUnique = this.state.category.length === 1;
    console.log(found);
    console.log(hasUnique);
    if (!found && !hasUnique) {
      this.setState({ category: this.state.category.concat(category.id) });
    }
  };

  public deleteIdToState = (
    type: "parent" | "child" | null,
    category: { id: number }
  ): void => {
    const curCategory = this.state.category;
    const index = this.state.category.findIndex(id => id === category.id);
    curCategory.splice(index, 1);
    this.setState({ category: curCategory });
  };

  public buttonCallback = (
    type: "mouseover" | "mouseleave" | "select" | "delete",
    dataFromChild: number | number[]
  ) => {
    const { cards, hoveredIndex, selectedIndex } = this.state;
    if (type === "mouseover") {
      this.setState({ hoveredIndex: dataFromChild });
    } else if (type === "mouseleave") {
      if (hoveredIndex === dataFromChild) {
        this.setState({ hoveredIndex: null });
      }
    } else if (type === "select") {
      if (selectedIndex !== null) {
        if (
          !Array.isArray(selectedIndex) &&
          !Array.isArray(dataFromChild) &&
          selectedIndex === dataFromChild
        ) {
          console.log("same index");
        } else if (
          Array.isArray(selectedIndex) &&
          Array.isArray(dataFromChild) &&
          selectedIndex.every((v, i) => v === dataFromChild[i])
        ) {
          console.log("same index");
        } else {
          this.setState({
            selectedIndex: null,
            selectedContent: null,
            rightMenu: null
          });
          this.setState({
            selectedIndex: dataFromChild,
            selectedContent: this.showSelected(dataFromChild),
            rightMenu: null
          });
        }
      } else {
        this.setState({
          selectedIndex: null,
          selectedContent: null,
          rightMenu: null
        });
        this.setState({
          selectedIndex: dataFromChild,
          selectedContent: this.showSelected(dataFromChild),
          rightMenu: null
        });
      }
    } else if (type === "delete") {
      if (!Array.isArray(dataFromChild)) {
        // frame
        if (selectedIndex === dataFromChild) {
          this.setState({ selectedIndex: null, selectedContent: null });
        }
        this.setState(
          update(this.state, {
            cards: {
              $splice: [[dataFromChild, 1]]
            }
          })
        );
      } else if (dataFromChild.length === 3) {
        // block
        this.setState(
          {
            selectedIndex: null,
            selectedContent: null
          },
          (): void =>
            this.setState(
              update(this.state, {
                cards: {
                  [dataFromChild[0]]: {
                    columnListArray: {
                      [dataFromChild[1]]: {
                        $splice: [[dataFromChild[2], 1]]
                      }
                    }
                  }
                }
              })
            )
        );
      }
    } else if (type === "duplicate") {
      if (!Array.isArray(dataFromChild)) {
        const targetCard = JSON.parse(JSON.stringify(cards[dataFromChild]));
        this.setState(
          update(this.state, {
            cards: {
              $splice: [[dataFromChild, 0, targetCard]]
            }
          })
        );
      } else {
        const targetCard = JSON.parse(
          JSON.stringify(
            cards[dataFromChild[0]].columnListArray[dataFromChild[1]][
              dataFromChild[2]
            ]
          )
        );
        if (targetCard.content === "BUTTON" || targetCard.content === "TEXT") {
          targetCard.value = Value.fromJSON(targetCard.value);
        }
        this.setState(
          update(this.state, {
            cards: {
              [dataFromChild[0]]: {
                columnListArray: {
                  [dataFromChild[1]]: {
                    $splice: [[dataFromChild[2], 0, targetCard]]
                  }
                }
              }
            }
          })
        );
      }
    }
  };

  // 오른쪽 버튼 Drop Here에 놨을 때
  public handleDrop = (hoverItem: any, hoverIndex: number | number[]) => {
    // on column
    if (!Array.isArray(hoverIndex)) {
      // on frame
      if (!!hoverItem) {
        this.setState(
          update(this.state, {
            cards: {
              $splice: [[hoverIndex, 0, hoverItem]]
            }
          })
        );
      }
    } else if (hoverIndex.length === 3) {
      if (!!hoverItem) {
        if (hoverIndex[2] === -1) {
          hoverIndex[2] = 0;
        }
        this.setState(
          update(this.state, {
            cards: {
              [hoverIndex[0]]: {
                columnListArray: {
                  [hoverIndex[1]]: {
                    $splice: [[hoverIndex[2], 0, hoverItem]]
                  }
                }
              }
            }
          })
        );
      }
    } else if (hoverIndex.length === 2) {
      if (!!hoverItem) {
        this.setState(
          update(this.state, {
            cards: {
              [hoverIndex[0]]: {
                columnListArray: {
                  [hoverIndex[1]]: {
                    $splice: [[0, 0, hoverItem]]
                  }
                }
              }
            }
          })
        );
      }
    }
  };

  // 이동
  // block on column -> block on column ([1,2,1] > [3,1,1])
  // frame -> frame (5 > 7)
  public moveCard = (
    dragIndex: number | number[],
    hoverIndex: number | number[]
  ) => {
    if (!Array.isArray(dragIndex) && !Array.isArray(hoverIndex)) {
      // frame => frame
      const { cards } = this.state;
      const dragCard = cards[dragIndex];
      console.log(dragIndex);
      console.log(hoverIndex);
      this.setState({ selectedIndex: null, selectedContent: null });
      if (dragIndex < hoverIndex) {
        this.setState(
          update(this.state, {
            cards: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
            }
          })
        );
      } else if (dragIndex > hoverIndex) {
        this.setState(
          update(this.state, {
            cards: {
              $splice: [[dragIndex, 1], [hoverIndex + 1, 0, dragCard]]
            }
          })
        );
      }
    } else if (Array.isArray(dragIndex) && Array.isArray(hoverIndex)) {
      if (dragIndex.length === 3 && hoverIndex.length === 3) {
        // block => block
        const { cards } = this.state;
        const dragCard =
          cards[dragIndex[0]].columnListArray[dragIndex[1]][dragIndex[2]];
        this.setState({
          selectedIndex: null,
          selectedContent: null
        });
        if (
          dragIndex[0] === hoverIndex[0] &&
          dragIndex[1] === hoverIndex[1] &&
          dragIndex[2] === hoverIndex[2]
        ) {
          console.log("same index");
        } else {
          if (dragIndex[2] < hoverIndex[2]) {
            this.setState(
              update(this.state, {
                cards: {
                  [dragIndex[0]]: {
                    columnListArray: {
                      [dragIndex[1]]: {
                        $splice: [[dragIndex[2], 1]]
                      }
                    }
                  }
                }
              })
            );
            this.setState(
              update(this.state, {
                cards: {
                  [hoverIndex[0]]: {
                    columnListArray: {
                      [hoverIndex[1]]: {
                        $splice: [[hoverIndex[2] - 1, 0, dragCard]]
                      }
                    }
                  }
                }
              })
            );
          } else {
            this.setState(
              update(this.state, {
                cards: {
                  [dragIndex[0]]: {
                    columnListArray: {
                      [dragIndex[1]]: {
                        $splice: [[dragIndex[2], 1]]
                      }
                    }
                  }
                }
              })
            );
            this.setState(
              update(this.state, {
                cards: {
                  [hoverIndex[0]]: {
                    columnListArray: {
                      [hoverIndex[1]]: {
                        $splice: [[hoverIndex[2] + 1, 0, dragCard]]
                      }
                    }
                  }
                }
              })
            );
          }
        }
      } else if (dragIndex.length === 3 && hoverIndex.length === 2) {
        // block => block
        const { cards } = this.state;
        const dragCard =
          cards[dragIndex[0]].columnListArray[dragIndex[1]][dragIndex[2]];
        console.log(dragIndex);
        console.log(hoverIndex);
        this.setState({
          selectedIndex: null,
          selectedContent: null
        });
        if (!!dragCard) {
          this.setState(
            update(this.state, {
              cards: {
                [dragIndex[0]]: {
                  columnListArray: {
                    [dragIndex[1]]: {
                      $splice: [[dragIndex[2], 1]]
                    }
                  }
                }
              }
            })
          );
          this.setState(
            update(this.state, {
              cards: {
                [hoverIndex[0]]: {
                  columnListArray: {
                    [hoverIndex[1]]: {
                      $splice: [[0, 0, dragCard]]
                    }
                  }
                }
              }
            })
          );
        }
      }
    }
  };

  public masterCallback = (
    type:
      | "bodyBackgroundColor"
      | "title"
      | "contentWidth"
      | "font"
      | "view"
      | "onDrag"
      | "rightMenu",
    dataFromChild: any,
    secondDataFromChild?: any
  ) => {
    if (type === "bodyBackgroundColor") {
      this.setState({ bodyBackgroundColor: dataFromChild });
    } else if (type === "title") {
      this.setState({ title: dataFromChild });
    } else if (type === "contentWidth") {
      this.setState({ contentWidth: dataFromChild });
    } else if (type === "font") {
      this.setState({ font: dataFromChild });
    } else if (type === "view") {
      this.setState({ view: dataFromChild });
    } else if (type === "onDrag") {
      this.setState({ onDrag: dataFromChild });
    } else if (type === "rightMenu") {
      this.setState({
        rightMenu: dataFromChild,
        selectedIndex: null,
        selectedContent: null
      });
    } else if (type === "shownImage") {
      this.setState({
        exShownImg: { url: dataFromChild, id: secondDataFromChild }
      });
    }
  };

  public OnChangeCards = (index: number[], props: any, value: string) => {
    if (value === "toggle") {
      if (index.length === 2) {
        this.setState(
          update(this.state, {
            cards: {
              [index[0]]: {
                [props]: { $set: !this.state.cards[index[0]][props] }
              }
            }
          })
        );
      } else if (index.length === 3) {
        this.setState(
          update(this.state, {
            cards: {
              [index[0]]: {
                columnListArray: {
                  [index[1]]: {
                    [index[2]]: {
                      [props]: {
                        $set: !this.state.cards[index[0]].columnListArray[
                          index[1]
                        ][index[2]][props]
                      }
                    }
                  }
                }
              }
            }
          })
        );
      }
    } else {
      if (index.length === 2) {
        this.setState(
          update(this.state, {
            cards: { [index[0]]: { [props]: { $set: value } } }
          })
        );
      } else if (index.length === 3) {
        this.setState(
          update(this.state, {
            cards: {
              [index[0]]: {
                columnListArray: {
                  [index[1]]: {
                    [index[2]]: {
                      [props]: { $set: value }
                    }
                  }
                }
              }
            }
          })
        );
      }
    }
  };

  public handleOnChange = (
    value: any,
    index: number[],
    content: any,
    type: "TEXT_CHANGE" | "LINK" | "ALT" | "URL"
  ) => {
    if (type === "TEXT_CHANGE") {
      if (index.length === 2) {
        this.setState(
          update(this.state, {
            cards: { [index[0]]: { value: { $set: value.value } } }
          })
        );
      } else if (index.length === 3) {
        this.setState(
          update(this.state, {
            cards: {
              [index[0]]: {
                columnListArray: {
                  [index[1]]: {
                    [index[2]]: {
                      value: { $set: value.value }
                    }
                  }
                }
              }
            }
          })
        );
        // let cards = this.state.cards.slice();
        // cards[index[0]].columnListArray[index[1]][index[2]].value = value;
        // this.setState({ cards });
      }
    } else if (content === "IMAGE") {
      if (type === "URL") {
        if (index.length === 2) {
          this.setState(
            update(this.state, {
              cards: { [index[0]]: { imageSrc: { $set: value } } }
            })
          );
        } else if (index.length === 3) {
          this.setState(
            update(this.state, {
              cards: {
                [index[0]]: {
                  columnListArray: {
                    [index[1]]: {
                      [index[2]]: {
                        imageSrc: { $set: value }
                      }
                    }
                  }
                }
              }
            })
          );
        }
      } else if (type === "ALT") {
        if (index.length === 2) {
          this.setState(
            update(this.state, {
              cards: { [index[0]]: { alt: { $set: value } } }
            })
          );
        } else if (index.length === 3) {
          this.setState(
            update(this.state, {
              cards: {
                [index[0]]: {
                  columnListArray: {
                    [index[1]]: {
                      [index[2]]: {
                        alt: { $set: value }
                      }
                    }
                  }
                }
              }
            })
          );
        }
      }
    } else if (type === "LINK") {
      if (index.length === 2) {
        this.setState(
          update(this.state, {
            cards: { [index[0]]: { link: { $set: value } } }
          })
        );
      } else if (index.length === 3) {
        this.setState(
          update(this.state, {
            cards: {
              [index[0]]: {
                columnListArray: {
                  [index[1]]: {
                    [index[2]]: {
                      link: { $set: value }
                    }
                  }
                }
              }
            }
          })
        );
      }
    } else if (content === "VIDEO") {
      if (type === "URL") {
        if (index.length === 2) {
          this.setState(
            update(this.state, {
              cards: { [index[0]]: { videoSrc: { $set: value } } }
            })
          );
        } else if (index.length === 3) {
          this.setState(
            update(this.state, {
              cards: {
                [index[0]]: {
                  columnListArray: {
                    [index[1]]: {
                      [index[2]]: {
                        videoSrc: { $set: value }
                      }
                    }
                  }
                }
              }
            })
          );
        }
      }
    }
  };

  public showSelected = (index: number | number[] | null) => {
    const { cards } = this.state;
    if (index) {
      if (!Array.isArray(index)) {
        console.log(cards[index]);
        return cards[index];
      } else {
        if (index.length === 2) {
          return cards[index[0]];
        } else if (index.length === 3) {
          return cards[index[0]].columnListArray[index[1]][index[2]];
        }
      }
    }
  };

  public sendButton = (
    type: "POST_ADD" | "POST_EDIT" | "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT",
    pos: any
  ) => {
    if (type === "POST_ADD") {
      return (
        <PostButtonContainer>
          <PostButton
            onClick={e => {
              e.preventDefault();
              const filteredState: IState = this.state;
              filteredState.rightMenu = null;
              filteredState.selectedContent = null;
              filteredState.selectedIndex = null;
              filteredState.onDrag = null;
              filteredState.hoverImgJson = null;
              filteredState.pos = { x: 0, y: 0 };
              filteredState.onImage = false;
              filteredState.view = "EDIT";
              this.props.AddPost!({
                refetchQueries: [
                  {
                    query: POSTS,
                    variables: {
                      limit: 20,
                      type: "createdAt"
                    }
                  }
                ],
                variables: {
                  title: this.state.title,
                  categoryId: this.state.category[0],
                  body: JSON.stringify(filteredState)
                }
              });
            }}
          >
            SEND
          </PostButton>
        </PostButtonContainer>
      );
    } else if (type === "POST_EDIT") {
      return (
        <PostButtonContainer>
          <PostButton
            onClick={e => {
              e.preventDefault();
              const filteredState: IState = this.state;
              filteredState.rightMenu = null;
              filteredState.selectedContent = null;
              filteredState.selectedIndex = null;
              filteredState.onDrag = null;
              filteredState.hoverImgJson = null;
              filteredState.pos = { x: 0, y: 0 };
              filteredState.onImage = false;
              filteredState.view = "EDIT";
              filteredState.hoveredIndex = null;
              this.props.EditPost({
                refetchQueries: [
                  {
                    query: POST,
                    variables: {
                      postId: this.props.postId
                    }
                  }
                ],
                variables: {
                  postId: this.props.postId,
                  title: this.state.title,
                  categoryId: this.state.category[0],
                  body: JSON.stringify(filteredState)
                }
              });
            }}
          >
            SEND
          </PostButton>
        </PostButtonContainer>
      );
    } else if (type === "WIKIIMAGE_ADD") {
      return (
        <React.Fragment>
          <Upload
            type={"WIKIIMAGE_ADD"}
            exShownImg={this.state.exShownImg}
            masterCallback={this.masterCallback}
          />
          <ImagePopup
            pos={pos}
            follow={false}
            json={JSON.stringify(this.state)}
            onImage={true}
          />
          <PostButton
            onClick={e => {
              e.preventDefault();
              const filteredState: IState = this.state;
              filteredState.rightMenu = null;
              filteredState.selectedContent = null;
              filteredState.selectedIndex = null;
              filteredState.onDrag = null;
              filteredState.hoverImgJson = null;
              filteredState.pos = { x: 0, y: 0 };
              filteredState.onImage = false;
              filteredState.view = "EDIT";
              console.log(this.state.exShownImg);
              this.props.AddWikiImage({
                refetchQueries: [
                  {
                    query: CATEGORIES_KEYWORD,
                    variables: {
                      keyword: ""
                    }
                  }
                ],
                variables: {
                  categoryId: this.props.categoryId,
                  name: this.state.title,
                  shownImage: this.state.exShownImg.url,
                  hoverImage: JSON.stringify(filteredState)
                }
              });
            }}
          >
            SEND
          </PostButton>
        </React.Fragment>
      );
    } else if (type === "WIKIIMAGE_EDIT") {
      return (
        <React.Fragment>
          <Upload
            type={"WIKIIMAGE_EDIT"}
            exShownImg={this.state.exShownImg}
            masterCallback={this.masterCallback}
          />
          <ImagePopup
            pos={pos}
            follow={false}
            json={JSON.stringify(this.state)}
            onImage={true}
          />
          <PostButton
            onClick={e => {
              e.preventDefault();
              const filteredState: IState = this.state;
              filteredState.rightMenu = null;
              filteredState.selectedContent = null;
              filteredState.selectedIndex = null;
              filteredState.onDrag = null;
              filteredState.hoverImgJson = null;
              filteredState.pos = { x: 0, y: 0 };
              filteredState.onImage = false;
              filteredState.view = "EDIT";
              console.log("wikiimageedit");
              console.log(filteredState);
              this.props.EditWikiImage({
                refetchQueries: [
                  {
                    query: WIKIIMAGE,
                    variables: {
                      wikiImageId: this.props.wikiImage.id
                    }
                  }
                ],
                variables: {
                  wikiImageId: this.props.wikiImage.id,
                  categoryId: this.props.categoryId,
                  name: this.state.title,
                  shownImageId: this.state.exShownImg.id,
                  hoverImage: JSON.stringify(filteredState)
                }
              });
            }}
          >
            SEND
          </PostButton>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  public render() {
    const { type } = this.props;
    const {
      cards,
      selectedIndex,
      hoveredIndex,
      contentWidth,
      view,
      device,
      pos,
      hoverImgJson,
      onImage,
      categoryPopUp
    } = this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        <EditorContainer type={type}>
          <EditorNavOne>
            <LogoContainer>
              <Logo>
                CLAP
                <div
                  role="img"
                  aria-label="Game"
                  style={{
                    fontFamily: "Open Sans",
                    fontSize: "5px",
                    letterSpacing: "2px"
                  }}
                >
                  🕹️POWERED BY GAMERS🕹️
                </div>
              </Logo>
            </LogoContainer>
            <DeviceSelectorContainer>
              <Device
                onClick={() => this.handleDevice("PHONE")}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                selected={device === "PHONE"}
              >
                <path d="M17.5 2c.276 0 .5.224.5.5v19c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5v-19c0-.276.224-.5.5-.5h11zm2.5 0c0-1.104-.896-2-2-2h-12c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-20zm-9.5 1h3c.276 0 .5.224.5.501 0 .275-.224.499-.5.499h-3c-.275 0-.5-.224-.5-.499 0-.277.225-.501.5-.501zm1.5 18c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-13h10v13z" />
              </Device>
              <Device
                onClick={() => this.handleDevice("TABLET")}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                selected={device === "TABLET"}
              >
                <path d="M19 24c1.104 0 2-.896 2-2v-20c0-1.104-.896-2-2-2h-14c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h14zm-14-3v-18h14v18h-14zm6.5 1.5c0-.276.224-.5.5-.5s.5.224.5.5-.224.5-.5.5-.5-.224-.5-.5z" />
              </Device>
              <Device
                onClick={() => this.handleDevice("DESKTOP")}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                selected={device === "DESKTOP"}
              >
                <path d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z" />
              </Device>
            </DeviceSelectorContainer>
            <EditorButtonContainer>
              <SaveButton>SAVE</SaveButton>
              {this.sendButton(type, pos)}
              <QestionButton>?</QestionButton>
              <MoreOptionButton className="fas fa-ellipsis-v" />
            </EditorButtonContainer>
          </EditorNavOne>
          <EditorNavTwo>
            <div />
            <EditorUtilButtonContainer>UTIL</EditorUtilButtonContainer>
            <TemplateButtonContainer>
              <TemplateButton
                onClick={() =>
                  this.setState({
                    templatePopUp: !this.state.templatePopUp
                  })
                }
              >
                TEMPLATES
              </TemplateButton>
              {this.state.templatePopUp && (
                <Template
                  onTemplateClick={this.onTemplateClick}
                  handleSetState={this.handleSetState}
                />
              )}
            </TemplateButtonContainer>
          </EditorNavTwo>
          <EditorContentContainer>
            <EditorLeftOuterContainer>
              <EditorLeftContainer
                view={view}
                device={device}
                bodyBackgroundColor={this.state.bodyBackgroundColor}
              >
                {view === "EDIT" ? (
                  <React.Fragment>
                    <Row>
                      <Col>
                        <div className="toolbar">
                          {/* <FlexBox>
                        {selectors.map((Type, i) => {
                          if (
                            this.state.selectedIndex !== null &&
                            Array.isArray(this.state.selectedIndex) &&
                            this.state.selectedContent !== undefined &&
                            (this.state.selectedContent.content === "TEXT" ||
                              this.state.selectedContent.content === "BUTTON" ||
                              this.state.selectedContent.content === "HTML")
                          ) {
                            const selected = this.state.selectedIndex;
                            const onChange = ({ value }: any) => {
                              this.handleOnChange(
                                { value },
                                selected,
                                "TEXT",
                                "TEXT_CHANGE"
                              );
                            };
                            const { value } = this.showSelected(selected);
                            return (
                              <Type
                                change={value.change()}
                                onChange={onChange}
                                key={i}
                                className="toolbar-select"
                              />
                            );
                          } else {
                            return null;
                          }
                        })}
                      </FlexBox> */}
                          <TextEditorButtonContainer>
                            {icons.map((Type, i) => {
                              if (
                                this.state.selectedIndex !== null &&
                                Array.isArray(this.state.selectedIndex) &&
                                this.state.selectedContent !== undefined &&
                                (this.state.selectedContent.content ===
                                  "TEXT" ||
                                  this.state.selectedContent.content ===
                                    "BUTTON" ||
                                  this.state.selectedContent.content === "HTML")
                              ) {
                                const selected = this.state.selectedIndex;
                                const onChange = ({ value }: any) => {
                                  this.handleOnChange(
                                    { value },
                                    selected,
                                    "TEXT",
                                    "TEXT_CHANGE"
                                  );
                                };
                                const { value } = this.showSelected(selected);
                                return (
                                  <TextEditorButton>
                                    <Type
                                      change={value.change()}
                                      onChange={onChange}
                                      key={i}
                                      className="toolbar-item"
                                      activeClassName="toolbar-item-active"
                                      disableClassName="toolbar-item-disable"
                                      activeStrokeClassName="ql-stroke-active"
                                      activeFillClassName="ql-fill-active"
                                      activeThinClassName="ql-thin-active"
                                      activeEvenClassName="ql-even-active"
                                    />
                                  </TextEditorButton>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </TextEditorButtonContainer>
                        </div>
                      </Col>
                    </Row>
                    <TitleContainer>
                      <TitleInput
                        type={"text"}
                        value={this.state.title}
                        onChange={this.onInputChange}
                        placeholder="Title"
                        name={"title"}
                      />
                      <CategoryButton
                        className="fas fa-search fa-2x"
                        onClick={() =>
                          this.setState({
                            categoryPopUp: !this.state.categoryPopUp
                          })
                        }
                      />
                      {categoryPopUp && (
                        <CategorySelectionContainer>
                          <CategorySelection
                            type="CATEGORY"
                            addIdToState={this.addIdToState}
                            deleteIdToState={this.deleteIdToState}
                            selectedCategories={this.state.category}
                          />
                        </CategorySelectionContainer>
                      )}
                    </TitleContainer>
                    <EditorLeft
                      bodyBackgroundColor={this.state.bodyBackgroundColor}
                      font={this.state.font}
                      view="EDIT"
                    >
                      {cards.map((item, index) => {
                        if (item.type === "columnList") {
                          return (
                            <Card
                              cards={this.state.cards.length}
                              key={index}
                              index={index}
                              moveCard={this.moveCard}
                              handleDrop={this.handleDrop}
                              onDrag={this.state.onDrag}
                              callbackfromparent={this.buttonCallback}
                              selectedIndex={selectedIndex}
                              hoveredIndex={hoveredIndex}
                              masterCallback={this.masterCallback}
                            >
                              <Column
                                columnListArray={item.columnListArray}
                                columnArray={item.content}
                                index={[index, 0, 0]}
                                callbackfromparent={this.buttonCallback}
                                handleDrop={this.handleDrop}
                                moveCard={this.moveCard}
                                handleOnChange={this.handleOnChange}
                                renderNode={this.renderNode}
                                renderMark={this.renderMark}
                                contentWidth={contentWidth}
                                selectedIndex={selectedIndex}
                                hoveredIndex={hoveredIndex}
                                onDrag={this.state.onDrag}
                                masterCallback={this.masterCallback}
                              />
                            </Card>
                          );
                        } else {
                          return null;
                        }
                      })}
                      {cards.length !== 0 ? null : (
                        <EmptyCard
                          index={0}
                          masterCallback={this.masterCallback}
                          moveCard={this.moveCard}
                          handleDrop={this.handleDrop}
                          onDrag={this.state.onDrag}
                        />
                      )}
                    </EditorLeft>
                  </React.Fragment>
                ) : view === "USER" ? (
                  <UserView json={this.state} />
                ) : view === "JSON" ? (
                  <JsonView json={this.state} />
                ) : null}
              </EditorLeftContainer>
            </EditorLeftOuterContainer>

            <EditorRightContainer>
              <EditorRight
                masterCallback={
                  this.masterCallback // func
                }
                addIdToState={this.addIdToState}
                deleteIdToState={this.deleteIdToState}
                rightMenu={
                  this.state.rightMenu // values
                }
                cards={this.state.cards}
                view={this.state.view}
                title={this.state.title}
                bodyBackgroundColor={this.state.bodyBackgroundColor}
                contentWidth={this.state.contentWidth}
                font={this.state.font}
                category={this.state.category}
              />
              <BlockOptions
                type={this.props.type}
                handleOnChange={this.handleOnChange}
                selectedIndex={selectedIndex}
                selectedContent={this.showSelected(selectedIndex)}
                OnChangeCards={this.OnChangeCards}
                onBlockOptionDownClick={this.onBlockOptionDownClick}
                buttonCallback={this.buttonCallback}
              />
            </EditorRightContainer>
          </EditorContentContainer>
        </EditorContainer>
        <ImagePopup
          pos={pos}
          json={hoverImgJson ? hoverImgJson : null}
          onImage={onImage}
        />
      </React.Fragment>
    );
  }

  public renderNode = (props: RenderNodeProps): JSX.Element | undefined => {
    const { attributes, node, isSelected } = props;
    if (node.object === "block" || node.object === "inline") {
      switch (node.type) {
        case "clap-image": {
          const representSrc = node.data.get("represent");
          const hoverSrc = node.data.get("hover");
          const name = node.data.get("name");
          const type = node.data.get("type");
          switch (type) {
            case "TEXT":
              return (
                <ClapImageContainer
                  onMouseOver={() =>
                    this.setState({
                      hoverImgJson: hoverSrc,
                      onImage: true
                    })
                  }
                  onMouseMove={(e: React.MouseEvent<HTMLImageElement>) =>
                    this.setState({ pos: GetPos(e) })
                  }
                  onMouseOut={() => {
                    this.setState({ onImage: false });
                  }}
                  small={true}
                >
                  <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                    {name}
                  </ClapImageText>
                </ClapImageContainer>
              );
            case "MINI_IMG":
              return (
                <ClapImageContainer
                  onMouseOver={() =>
                    this.setState({
                      hoverImgJson: hoverSrc,
                      onImage: true
                    })
                  }
                  onMouseMove={(e: React.MouseEvent<HTMLImageElement>) =>
                    this.setState({ pos: GetPos(e) })
                  }
                  onMouseOut={() => {
                    this.setState({ onImage: false });
                  }}
                  small={true}
                >
                  <ClapImage
                    small={true}
                    src={representSrc}
                    alt={"hover"}
                    selected={isSelected}
                    {...attributes}
                  />
                  <ClapImageText color={EditorDefaults.CLAP_IMG_TEXT_COLOR}>
                    {name}
                  </ClapImageText>
                </ClapImageContainer>
              );
            case "NORMAL_IMG":
              return (
                <ClapImage
                  src={representSrc}
                  alt={"hover"}
                  selected={isSelected}
                  onMouseOver={() =>
                    this.setState({
                      hoverImgJson: hoverSrc,
                      onImage: true
                    })
                  }
                  onMouseMove={(e: React.MouseEvent<HTMLImageElement>) =>
                    this.setState({ pos: GetPos(e) })
                  }
                  onMouseOut={() => {
                    this.setState({ onImage: false });
                  }}
                  {...attributes}
                />
              );
            default:
              return;
          }
        }
        default:
          return;
      }
    } else {
      return;
    }
  };

  public renderMark = (props: RenderMarkProps): JSX.Element | undefined => {
    const { mark } = props;
    console.log(props);

    switch (mark.type) {
      default:
        return;
    }
  };

  public handleDevice = (device: "PHONE" | "TABLET" | "DESKTOP") => {
    this.setState({ device });
  };

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onTemplateClick = (templateContent: any) => {
    console.log(templateContent);
    this.setState({
      selectedIndex: null,
      hoveredIndex: null,
      selectedContent: null,
      cards: templateContent
    });
  };

  public handleSetState = (state: string, value: any) => {
    this.setState({ [name]: value } as any);
  };

  public onBlockOptionDownClick = () => {
    this.setState({
      selectedIndex: null,
      hoveredIndex: null,
      selectedContent: null
    });
  };
}

export default DragDropContext(HTML5Backend)(Editor);
