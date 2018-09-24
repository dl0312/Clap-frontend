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
import Clean from "@canner/slate-icon-clean";
import Code from "@canner/slate-icon-code";
import CodeBlock from "@canner/slate-icon-codeblock";
// import Emoji, {EmojiPlugin} from '@canner/slate-icon-emoji';
import FontBgColor from "@canner/slate-icon-fontbgcolor";
import FontColor from "@canner/slate-icon-fontcolor";
import { Header1, Header2 } from "@canner/slate-icon-header";
import Hr from "@canner/slate-icon-hr";
import Image from "@canner/slate-icon-image";
import { Indent, Outdent } from "@canner/slate-icon-indent";
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
import FontSize from "@canner/slate-select-fontsize";
import LetterSpacing from "@canner/slate-select-letterspacing";
import LineHeight from "@canner/slate-select-lineheight";

// plugins
import "prismjs/themes/prism.css";

// rules
import "github-markdown-css";

const selectors = [FontSize, LetterSpacing, LineHeight];
const icons = [
  AlignLeft,
  AlignCenter,
  AlignRight,
  Blockquote,
  Bold,
  Clean,
  Code,
  CodeBlock,
  // Emoji,
  FontBgColor,
  FontColor,
  Hr,
  Header1,
  Header2,
  Image,
  Video,
  Indent,
  Outdent,
  Italic,
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

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  flex-direction: row;
  overflow: hidden;
  position: ${props =>
    props.type === "WIKIIMAGE_ADD" || props.type === "WIKIIMAGE_EDIT"
      ? null
      : "absolute"};
  top: ${props =>
    props.type === "WIKIIMAGE_ADD" || props.type === "WIKIIMAGE_EDIT"
      ? "80%"
      : "100px"};
  bottom: 0px;
  right: 0;
  left: 0;

  border-top: 2px solid #eee;
`;

interface IEditorLeftContainerProps {
  bodyBackgroundColor: { r: number; g: number; b: number; a: number };
}

const EditorLeftContainer = styled<IEditorLeftContainerProps, any>("div")`
  position: relative;
  width: 75%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${props =>
    `rgba(${props.bodyBackgroundColor.r}, ${props.bodyBackgroundColor.g}, ${
      props.bodyBackgroundColor.b
    }, ${props.bodyBackgroundColor.a})`};
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  transition: width 0.5s ease;
  ${media.tablet`width: 100%;`};
  ${media.phone`width: 100%;`};
`;

const EditorRightContainer = styled.div`
  background-color: white;
  outline: 0.05px solid rgb(172, 172, 172);
  transition: width 1s ease;
  width: 25%;
  min-width: 400px;
  ${media.tablet`display: none;`};
  ${media.phone`display: none;`};
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

const PostButton = styled.div`
  background-color: white;
  color: black;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
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
      cards: []
    };
    this.state = { ...props.state };
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

  public render() {
    const { type } = this.props;
    const {
      cards,
      selectedIndex,
      hoveredIndex,
      contentWidth,
      view,
      pos,
      hoverImgJson,
      onImage
    } = this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        {this.props.type === "POST_ADD" ? (
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
        ) : this.props.type === "POST_EDIT" ? (
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
        ) : this.props.type === "WIKIIMAGE_ADD" ? (
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
                    shownImage: this.state.exShownImg.id,
                    hoverImage: JSON.stringify(filteredState)
                  }
                });
              }}
            >
              SEND
            </PostButton>
          </React.Fragment>
        ) : this.props.type === "WIKIIMAGE_EDIT" ? (
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
        ) : null}
        <EditorContainer type={type}>
          <EditorLeftContainer
            view={view}
            bodyBackgroundColor={this.state.bodyBackgroundColor}
          >
            {view === "EDIT" ? (
              <React.Fragment>
                <Row>
                  <Col style={{ minHeight: "100vh" }}>
                    <div className="toolbar">
                      <FlexBox>
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
                      </FlexBox>
                      <FlexBox>
                        {icons.map((Type, i) => {
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
                                className="toolbar-item"
                                activeClassName="toolbar-item-active"
                                disableClassName="toolbar-item-disable"
                                activeStrokeClassName="ql-stroke-active"
                                activeFillClassName="ql-fill-active"
                                activeThinClassName="ql-thin-active"
                                activeEvenClassName="ql-even-active"
                              />
                            );
                          } else {
                            return null;
                          }
                        })}
                      </FlexBox>
                    </div>
                  </Col>
                </Row>
                <EditorLeft
                  bodyBackgroundColor={this.state.bodyBackgroundColor}
                  contentWidth={this.state.contentWidth}
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
            />
          </EditorRightContainer>
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
                    src={`http://localhost:4000/uploads/${representSrc}`}
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
                  src={`http://localhost:4000/uploads/${representSrc}`}
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
}

export default DragDropContext(HTML5Backend)(Editor);
