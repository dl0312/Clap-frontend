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
import { Value } from "slate";
import EmptyCard from "../EmptyCard";
import { RenderNodeProps, RenderMarkProps } from "slate-react";
import {
  POST,
  POSTS,
  CATEGORY,
  GET_CATEGORIES_BY_GAME_ID
} from "../../sharedQueries";

import update from "immutability-helper";
import isEqual from "lodash.isequal";
import cloneDeep from "lodash.clonedeep";
import { MutationFn, Query } from "react-apollo";
import {
  addPost,
  addPostVariables,
  getCategoryById,
  getCategoryByIdVariables,
  getCategoriesByGameIdVariables,
  getCategoriesByGameId
} from "../../types/api";
import Textarea from "../Textarea";
import Template from "../Template";
import Builder from "../Builder";
import ImageButton from "../ImageButton";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomDragLayer from "../CustomDragLayer";
import { Popover, Select, Button, Icon, Slider } from "antd";
import HoverView from "../HoverView";
import ButtonGroup from "antd/lib/button/button-group";
const Option = Select.Option;

interface IEditorContainerProps {
  type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT";
}

const EditorContainer = styled<IEditorContainerProps, any>("div")`
  width: 100%;
  height: ${props =>
    props.type === "WIKIIMAGE_ADD" || props.type === "WIKIIMAGE_EDIT"
      ? null
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

const EditorButtonContainer = styled.div``;

const EditorUtilButtonContainer = styled.div`
  justify-self: auto;
  position: absolute;
  top: 49px;
  left: 50%;
  height: 34px;
  width: 200px;
  margin-left: -136px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
  overflow: hidden;
  position: absolute;
  top: 88px;
  bottom: 0px;
  right: 0px;
  left: 0px;
`;

const EditorLeftOuterContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  ${media.tablet`width: 100%;`};
  ${media.phone`width: 100%;`};

  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #e5e5e5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
`;

interface IEditorLeftContainerProps {
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  transition: width 0.2s ease;
`;

interface ITitleContainer {
  titleImg: string;
  titleImgUploading: boolean;
  titleImgPos: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const TitleContainer = styled<ITitleContainer, any>("div")`
  width: 100%;
  padding-top: 116px;
  padding-bottom: ${props => (props.device === "PHONE" ? "40px" : "70px")};
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  background-image: ${props =>
    props.titleImg &&
    `linear-gradient(
    rgba(20, 20, 20, 0.3),
    rgba(20, 20, 20, 0.3)
  ),
 url(${props.titleImg});`};
  background-position: ${props => `50% ${props.titleImgPos}%`};
  background-size: 100% auto;

  color: ${props => (props.titleImg ? "white" : null)};
`;

interface ITitleInputProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const TitleInput = styled<ITitleInputProps, any>(Textarea)`
  width: 100%;
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  cursor: text;
  overflow: hidden;
  font-size: ${props => (props.device === "PHONE" ? "26px" : "32px")};
  line-height: ${props => (props.device === "PHONE" ? "36px" : "42px")};
  font-weight: 400;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  margin: 0 30px;
  background-color: transparent;
`;

const EditorRightContainer = styled.div`
  background-color: white;
  transition: width 1s ease;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 20%;
  min-width: 300px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #e5e5e5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
  ${media.tablet`width: 0%;  min-width: 0px;
`};
  ${media.phone`width: 0%;`};
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

const ClapImageText = styled.span`
  font-weight: bolder;
  color: ${props => props.color};
`;

interface IViewIconProps {
  isSelected: boolean;
}

const ViewIcon = styled<IViewIconProps, any>("i")`
  font-size: 18px;
  width: 25px;
  transition: opacity 0.5s ease;
  opacity: ${props => (props.isSelected ? "1" : "0.2")};
  color: black;
  margin: 0 13px;
  &:hover {
    opacity: ${props => (props.isSelected ? null : "0.5")};
  }
`;

interface ITagContainerProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const TagContainer = styled<ITagContainerProps, any>("div")`
  width: 100%;
  padding-bottom: 120px;
  background-color: ${EditorDefaults.MAIN_BACKGROUND_COLOR};
  padding-left: ${props => (props.device === "DESKTOP" ? null : "20px")};
  padding-right: ${props => (props.device === "DESKTOP" ? null : "20px")};
  transition: 0.2s ease;
`;

const InnerTagContainer = styled.div`
  max-width: 886px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const TagLabel = styled.span`
  display: inline-block;
  padding: 2px 0;
  width: 35px;
  vertical-align: top;
  color: #000;
  font-size: 16px;
  font-weight: bolder;
`;

const TagArea = styled.span`
  display: inline-block;
  width: 100%;
  vertical-align: top;
  text-align: left;
  margin-top: -1px;
`;

const TagInputHolder = styled.span`
  display: inline-block;
  width: 100%;
  color: #bfbfbf;
  font-size: 15px;
`;

// const ImageInput = styled.input`
//   position: absolute;
//   color: white;
//   opacity: 0;
//   height: 0px;
//   &:focus {
//     outline: none;
//   }
// `;

class GetCategoryById extends Query<
  getCategoryById,
  getCategoryByIdVariables
> {}

class GetCategoriesByGameIdQuery extends Query<
  getCategoriesByGameId,
  getCategoriesByGameIdVariables
> {}

interface IProps {
  type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT" | "POST_ADD" | "POST_EDIT";
  gameId: number;
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
  onDrag: "content" | "columnList" | null;
  selectedIndex: number | number[] | null;
  hoveredIndex: number | number[] | null;
  selectedContent: any;
  hoverImgJson: any;
  onImage: boolean;
  exShownImg: { url: string; id: string };
  pos: { x: number; y: number };
  title: string;
  cards: any[];
  cardbuilderpositions: any[];
  targetIndex: any;
  titleImg: string;
  titleImgUploading: boolean;
  titleImgPos: number;
  comp: any;
  tags: any[];
  isTitlePosDraggable: boolean;
}

class Editor extends React.Component<IProps, IState, any> {
  constructor(props: IProps) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.onUnload = this.onUnload.bind(this);
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
      cards: [],
      cardbuilderpositions: [],
      targetIndex: [],
      titleImg: null,
      titleImgUploading: false,
      titleImgPos: 50,
      comp: null,
      tags: [],
      inputVisible: false,
      inputValue: "",
      isTitlePosDraggable: false,
      ...props.state
    };
  }

  public onUnload = (event: any) => {
    // the method that will be used for both add and remove event
    event.returnValue = "Hellooww";
  };

  public componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
  }

  public componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

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
    console.log(hoverItem, hoverIndex);
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
    console.log(dragIndex, hoverIndex);
    if (!Array.isArray(dragIndex) && !Array.isArray(hoverIndex)) {
      // frame => frame
      const { cards } = this.state;
      const dragCard = cards[dragIndex];
      console.log(dragIndex);
      console.log(hoverIndex);
      this.setState({ selectedIndex: null, selectedContent: null });
      if (dragIndex < hoverIndex) {
        if (dragIndex !== hoverIndex - 1) {
          this.setState(
            update(this.state, {
              cards: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
              }
            })
          );
        }
      } else if (dragIndex > hoverIndex) {
        this.setState(
          update(this.state, {
            cards: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
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
          if (
            dragIndex[0] === hoverIndex[0] &&
            dragIndex[1] === hoverIndex[1] &&
            dragIndex[2] !== hoverIndex[2]
          ) {
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
                          $splice: [[hoverIndex[2], 0, dragCard]]
                        }
                      }
                    }
                  }
                })
              );
            }
          } else if (
            dragIndex[0] !== hoverIndex[0] ||
            dragIndex[1] !== hoverIndex[1]
          ) {
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
                        $splice: [[hoverIndex[2], 0, dragCard]]
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
      | "title"
      | "view"
      | "onDrag"
      | "rightMenu"
      | "shownImage"
      | "targetIndex"
      | "selectedIndex"
      | "hoveredIndex",
    dataFromChild?: any,
    secondDataFromChild?: any
  ) => {
    if (type === "title") {
      this.setState({ title: dataFromChild });
    } else if (type === "view") {
      this.setState({ view: dataFromChild });
    } else if (type === "onDrag") {
      this.setState({ onDrag: dataFromChild });
    } else if (type === "targetIndex") {
      this.setState({ targetIndex: dataFromChild });
    } else if (type === "selectedIndex") {
      this.setState({ selectedIndex: dataFromChild });
    } else if (type === "hoveredIndex") {
      this.setState({ hoveredIndex: dataFromChild });
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
    } else if (type === "deselect") {
      this.setState({
        selectedIndex: null,
        hoveredIndex: null,
        selectedContent: null
      });
    } else if (type === "setComp") {
      this.setState({ comp: dataFromChild });
    }
  };

  public OnChangeCards = (index: number[], props: any, value: any) => {
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
        <Button
          type="primary"
          style={{ margin: "0 5px" }}
          onClick={(e: any) => {
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
                titleImg: this.state.titleImg,
                titleImgPos: this.state.titleImgPos,
                tags: this.state.tags,
                body: JSON.stringify(filteredState),
                gameId: this.props.gameId
              }
            });
          }}
        >
          SEND
        </Button>
      );
    } else if (type === "POST_EDIT") {
      return (
        <Button
          type="primary"
          style={{ margin: "0 5px" }}
          onClick={(e: any) => {
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
            filteredState.targetIndex = null;

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
                titleImg: this.state.titleImg,
                titleImgPos: this.state.titleImgPos,
                tags: this.state.tags,
                body: JSON.stringify(filteredState),
                gameId: this.props.gameId
              }
            });
          }}
        >
          SEND
        </Button>
      );
    } else {
      return null;
    }
  };

  public render() {
    const { type, gameId } = this.props;
    const {
      cards,
      selectedIndex,
      hoveredIndex,
      view,
      device,
      pos,
      onDrag,
      targetIndex,
      titleImg,
      titleImgUploading,
      titleImgPos,
      tags,
      isTitlePosDraggable
    } = this.state;

    return (
      <React.Fragment>
        <EditorContainer type={type}>
          <EditorNavOne>
            <Link to={"/"}>
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
            </Link>
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
              <Button icon="save" style={{ margin: "0 5px" }}>
                SAVE
              </Button>
              {this.sendButton(type, pos)}
              <Button
                style={{ margin: "0 5px" }}
                shape="circle"
                icon="question"
              />
              <Button
                style={{ margin: "0 5px" }}
                shape="circle"
                icon="ellipsis"
              />
            </EditorButtonContainer>
          </EditorNavOne>
          <EditorNavTwo>
            <div />
            <EditorUtilButtonContainer>
              <ViewIcon
                onClick={() => this.setState({ view: "EDIT" })}
                isSelected={view === "EDIT"}
                className="fas fa-edit"
              />
              <ViewIcon
                onClick={() => this.setState({ view: "USER" })}
                isSelected={view === "USER"}
                className="fas fa-eye"
              />
              <ViewIcon
                onClick={() => this.setState({ view: "JSON" })}
                isSelected={view === "JSON"}
                className="fas fa-file-alt"
              />
            </EditorUtilButtonContainer>
            <Template
              onTemplateClick={this.onTemplateClick}
              handleSetState={this.handleSetState}
            />
          </EditorNavTwo>
          <EditorContentContainer>
            <CustomDragLayer comp={this.state.comp} />
            <EditorRightContainer>
              {!this.state.selectedContent ? (
                <EditorRight
                  masterCallback={
                    this.masterCallback // func
                  }
                  rightMenu={
                    this.state.rightMenu // values
                  }
                  cards={this.state.cards}
                  view={this.state.view}
                  title={this.state.title}
                  onClickPushNewBlock={this.onClickPushNewBlock}
                />
              ) : (
                <BlockOptions
                  type={this.props.type}
                  handleOnChange={this.handleOnChange}
                  selectedIndex={selectedIndex}
                  selectedContent={this.showSelected(selectedIndex)}
                  OnChangeCards={this.OnChangeCards}
                  onBlockOptionDownClick={this.onBlockOptionDownClick}
                  buttonCallback={this.buttonCallback}
                />
              )}
            </EditorRightContainer>
            <EditorLeftOuterContainer>
              <EditorLeftContainer view={view} device={device}>
                {view === "EDIT" ? (
                  <React.Fragment>
                    <EditorLeft view="EDIT" device={device}>
                      <TitleContainer
                        titleImg={titleImg}
                        titleImgUploading={titleImgUploading}
                        titleImgPos={titleImgPos}
                        device={device}
                      >
                        <TitleInput
                          type={"text"}
                          value={this.state.title}
                          onChange={(e: any) =>
                            this.onInputChange("title", e.target.value)
                          }
                          placeholder="Title"
                          name={"title"}
                          device={device}
                        />
                        {!titleImg ? (
                          <ButtonGroup
                            style={{
                              position: "absolute",
                              right: 20,
                              top: 20
                            }}
                          >
                            <Button style={{ padding: "0 8px" }}>
                              <ImageButton onChange={this.onInputImageChange} />
                              <span style={{ marginLeft: 5 }}>Title Image</span>
                            </Button>
                          </ButtonGroup>
                        ) : (
                          !isTitlePosDraggable && (
                            <ButtonGroup
                              style={{
                                position: "absolute",
                                right: 20,
                                top: 20
                              }}
                            >
                              {/* <ImageInput
                              id={"newPhoto"}
                              type="file"
                              accept="image/*"
                              onChange={this.onInputImageChange}
                            />
                            <label htmlFor="newPhoto">
                              <Button
                                onClick={() => this.onInputImageChange}
                                icon="picture"
                              />
                            </label> */}
                              <Button style={{ padding: "0 8px" }}>
                                <ImageButton
                                  onChange={this.onInputImageChange}
                                />
                              </Button>
                              <Button icon="cloud-upload" />
                              <Button icon="edit" />
                              <Button
                                onClick={() => {
                                  this.setState({ isTitlePosDraggable: true });
                                }}
                                icon="drag"
                              />
                              <Button
                                onClick={() => {
                                  this.setState({
                                    titleImg: "",
                                    isTitlePosDraggable: false,
                                    titleImgPos: 0
                                  });
                                }}
                                icon="delete"
                              />
                            </ButtonGroup>
                          )
                        )}
                        {isTitlePosDraggable && (
                          <>
                            <div
                              style={{
                                right: "15px",
                                top: "40px",
                                height: "100px",
                                position: "absolute"
                              }}
                            >
                              <Slider
                                defaultValue={titleImgPos}
                                vertical={true}
                                onChange={(value: any) =>
                                  this.onInputChange("titleImgPos", value)
                                }
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                position: "absolute",
                                right: "20px",
                                bottom: "20px"
                              }}
                            >
                              <Button
                                style={{ margin: "0 5px" }}
                                type="primary"
                                onClick={() =>
                                  this.setState({ isTitlePosDraggable: false })
                                }
                              >
                                Ok
                              </Button>
                            </div>
                          </>
                        )}
                      </TitleContainer>
                      {cards.length !== 0 ? (
                        <React.Fragment>
                          <Builder
                            index={0}
                            type={"columnList"}
                            state={
                              onDrag === "columnList"
                                ? 0 === targetIndex
                                  ? "ISOVER"
                                  : "ONDRAG"
                                : "NOTHING"
                            }
                            handleDrop={this.handleDrop}
                          />
                          {cards.map((item, index) => {
                            if (item.type === "columnList") {
                              return (
                                <React.Fragment key={index}>
                                  <Card
                                    cards={this.state.cards.length}
                                    key={index}
                                    index={index}
                                    moveCard={this.moveCard}
                                    handleDrop={this.handleDrop}
                                    onDrag={onDrag}
                                    callbackfromparent={this.buttonCallback}
                                    selectedIndex={selectedIndex}
                                    hoveredIndex={hoveredIndex}
                                    masterCallback={this.masterCallback}
                                    handleSetState={this.handleSetState}
                                    pushPresentBlockToTargetIndex={
                                      this.pushPresentBlockToTargetIndex
                                    }
                                    pushNewBlockToTargetIndex={
                                      this.pushNewBlockToTargetIndex
                                    }
                                    setTargetIndex={this.setTargetIndex}
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
                                      selectedIndex={selectedIndex}
                                      hoveredIndex={hoveredIndex}
                                      onDrag={onDrag}
                                      masterCallback={this.masterCallback}
                                      targetIndex={targetIndex}
                                      setTargetIndex={this.setTargetIndex}
                                      pushPresentBlockToTargetIndex={
                                        this.pushPresentBlockToTargetIndex
                                      }
                                      pushNewBlockToTargetIndex={
                                        this.pushNewBlockToTargetIndex
                                      }
                                    />
                                  </Card>
                                  <Builder
                                    index={index + 1}
                                    type={"columnList"}
                                    state={
                                      onDrag === "columnList"
                                        ? index + 1 === targetIndex
                                          ? "ISOVER"
                                          : "ONDRAG"
                                        : "NOTHING"
                                    }
                                    handleDrop={this.handleDrop}
                                  />
                                </React.Fragment>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </React.Fragment>
                      ) : (
                        <EmptyCard
                          index={0}
                          masterCallback={this.masterCallback}
                          moveCard={this.moveCard}
                          handleDrop={this.handleDrop}
                          onDrag={this.state.onDrag}
                        />
                      )}
                    </EditorLeft>
                    <TagContainer>
                      <InnerTagContainer>
                        <Icon
                          style={{ fontSize: 16, marginRight: 5 }}
                          type="tags"
                        />
                        <TagLabel>Tag</TagLabel>
                        <TagArea>
                          <TagInputHolder>
                            <GetCategoriesByGameIdQuery
                              query={GET_CATEGORIES_BY_GAME_ID}
                              variables={{ gameId }}
                            >
                              {({ loading, error, data }) => {
                                if (loading) {
                                  return (
                                    <Select
                                      mode="tags"
                                      style={{ width: "100%" }}
                                      placeholder="Tags Mode"
                                      onChange={(value: any) =>
                                        console.log(`selected ${value}`)
                                      }
                                    />
                                  );
                                }
                                if (error) return `${error}`;
                                if (data !== undefined) {
                                  console.log(data);
                                  const {
                                    categories
                                  } = data.GetCategoriesByGameId;
                                  return (
                                    <Select
                                      mode="tags"
                                      allowClear={true}
                                      style={{ width: "100%" }}
                                      placeholder="Tags"
                                      onChange={(values: any) => {
                                        console.log(values);
                                        this.setState({
                                          tags: values.map(
                                            (value: any) => value
                                          )
                                        });
                                      }}
                                      value={tags.map((tag: any) => {
                                        return tag;
                                      })}
                                      optionFilterProp="Tags"
                                      filterOption={(input, option: any) => {
                                        return (
                                          option.props.children.props.children[1].props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                        );
                                      }}
                                    >
                                      {categories &&
                                        categories.map((category, index) => {
                                          return (
                                            category && (
                                              <Option
                                                value={category.name}
                                                key={JSON.stringify(
                                                  category.id
                                                )}
                                              >
                                                <span
                                                  style={{
                                                    display: "flex",
                                                    justifyContent:
                                                      "flex-start",
                                                    alignItems: "center",
                                                    verticalAlign: "top"
                                                  }}
                                                >
                                                  {category.topWikiImage && (
                                                    <img
                                                      style={{
                                                        height: "20px",
                                                        borderRadius: 4
                                                      }}
                                                      src={
                                                        category.topWikiImage
                                                          .shownImage
                                                      }
                                                    />
                                                  )}
                                                  <span
                                                    style={{ padding: "0 7px" }}
                                                  >
                                                    {category.name}
                                                  </span>
                                                </span>
                                              </Option>
                                            )
                                          );
                                        })}
                                    </Select>
                                  );
                                } else {
                                  return null;
                                }
                              }}
                            </GetCategoriesByGameIdQuery>
                          </TagInputHolder>
                        </TagArea>
                      </InnerTagContainer>
                    </TagContainer>
                  </React.Fragment>
                ) : view === "USER" ? (
                  <UserView json={this.state} />
                ) : view === "JSON" ? (
                  <JsonView json={this.state} />
                ) : null}
              </EditorLeftContainer>
            </EditorLeftOuterContainer>
          </EditorContentContainer>
        </EditorContainer>
      </React.Fragment>
    );
  }
  public renderNode = (props: RenderNodeProps): JSX.Element | undefined => {
    const { attributes, children, node, isSelected } = props;

    if (node.object === "block" || node.object === "inline") {
      switch (node.type) {
        case "block-quote":
          return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
          return <ul {...attributes}>{children}</ul>;
        case "list-item":
          return <li {...attributes}>{children}</li>;
        case "numbered-list":
          return <ol {...attributes}>{children}</ol>;
        case "clap-image": {
          const name = node.data.get("name");
          const type = node.data.get("type");
          const id = node.data.get("id");
          console.log(id);
          switch (type) {
            case "TEXT":
              return (
                <GetCategoryById
                  query={CATEGORY}
                  fetchPolicy={"cache-and-network"}
                  variables={{ categoryId: id }}
                >
                  {({ loading, data, error }) => {
                    if (loading)
                      return (
                        <ClapImageText
                          color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                        >
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
                              <HoverView
                                json={JSON.parse(
                                  category.topWikiImage.hoverImage
                                )}
                              />
                            }
                            title={
                              <>
                                <ClapImage
                                  small={true}
                                  src={category.topWikiImage.shownImage}
                                  alt={"hover"}
                                  selected={isSelected}
                                  {...attributes}
                                />
                                <ClapImageText
                                  color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                                >
                                  {name}
                                </ClapImageText>
                              </>
                            }
                            trigger="hover"
                          >
                            <Link
                              target="_blank"
                              style={{
                                textDecoration: "none"
                              }}
                              rel="noopener noreferrer"
                              to={`/category/read/${category.id}`}
                            >
                              <ClapImageText
                                color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                              >
                                {name}
                              </ClapImageText>
                            </Link>
                          </Popover>
                        )
                      );
                    } else {
                      return null;
                    }
                  }}
                </GetCategoryById>
              );
            case "MINI_IMG":
              return (
                <GetCategoryById
                  query={CATEGORY}
                  fetchPolicy={"cache-and-network"}
                  variables={{ categoryId: id }}
                >
                  {({ loading, data, error }) => {
                    if (loading)
                      return (
                        <ClapImageText
                          color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                        >
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
                              <HoverView
                                json={JSON.parse(
                                  category.topWikiImage.hoverImage
                                )}
                              />
                            }
                            title={
                              <>
                                <ClapImage
                                  small={true}
                                  src={category.topWikiImage.shownImage}
                                  alt={"hover"}
                                  selected={isSelected}
                                  {...attributes}
                                />
                                <ClapImageText
                                  color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                                >
                                  {name}
                                </ClapImageText>
                              </>
                            }
                            trigger="hover"
                          >
                            <Link
                              target="_blank"
                              style={{
                                textDecoration: "none"
                              }}
                              rel="noopener noreferrer"
                              to={`/category/read/${category.id}`}
                            >
                              <ClapImage
                                small={true}
                                src={category.topWikiImage.shownImage}
                                alt={"hover"}
                                selected={isSelected}
                                {...attributes}
                              />
                              <ClapImageText
                                color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                              >
                                {name}
                              </ClapImageText>
                            </Link>
                          </Popover>
                        )
                      );
                    } else {
                      return null;
                    }
                  }}
                </GetCategoryById>
              );
            case "NORMAL_IMG":
              return (
                <GetCategoryById
                  query={CATEGORY}
                  fetchPolicy={"cache-and-network"}
                  variables={{ categoryId: id }}
                >
                  {({ loading, data, error }) => {
                    if (loading)
                      return (
                        <ClapImageText
                          color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                        >
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
                              <HoverView
                                json={JSON.parse(
                                  category.topWikiImage.hoverImage
                                )}
                              />
                            }
                            title={
                              <>
                                <ClapImage
                                  small={true}
                                  src={category.topWikiImage.shownImage}
                                  alt={"hover"}
                                  selected={isSelected}
                                  {...attributes}
                                />
                                <ClapImageText
                                  color={EditorDefaults.CLAP_IMG_TEXT_COLOR}
                                >
                                  {name}
                                </ClapImageText>
                              </>
                            }
                            trigger="hover"
                          >
                            <Link
                              target="_blank"
                              style={{
                                height: "100%",
                                textDecoration: "none",
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",

                                verticalAlign: "top"
                              }}
                              rel="noopener noreferrer"
                              to={`/category/read/${category.id}`}
                            >
                              <ClapImage
                                src={category.topWikiImage.shownImage}
                                alt={"hover"}
                                selected={isSelected}
                                {...attributes}
                              />
                            </Link>
                          </Popover>
                        )
                      );
                    } else {
                      return null;
                    }
                  }}
                </GetCategoryById>
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

    switch (mark.type) {
      default:
        return;
    }
  };

  public handleDevice = (device: "PHONE" | "TABLET" | "DESKTOP") => {
    this.setState({ device });
  };

  public onInputChange = async (name: string, value: any) => {
    // const {
    //   target: { name, value }
    // } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onTemplateClick = (templateContent: any) => {
    this.setState({
      selectedIndex: null,
      hoveredIndex: null,
      selectedContent: null,
      cards: templateContent
    });
  };

  public handleSetState = (name: string, value: any) => {
    this.setState({ [name]: value } as any);
  };

  public onBlockOptionDownClick = () => {
    console.log("out");
    this.setState({
      selectedIndex: null,
      hoveredIndex: null,
      selectedContent: null
    });
  };

  public setTargetIndex = (
    onDrag: "content" | "columnList",
    hoverIndex: any,
    dropPosition: "over" | "under"
  ) => {
    if (onDrag === "columnList") {
      if (dropPosition === "over") {
        const targetIndex = hoverIndex;
        if (targetIndex !== this.state.targetIndex) {
          this.setState({ targetIndex });
        }
      } else if (dropPosition === "under") {
        const targetIndex = hoverIndex + 1;
        if (targetIndex !== this.state.targetIndex) {
          this.setState({ targetIndex });
        }
      }
    } else if (onDrag === "content") {
      // console.log(hoverIndex, this.state.targetIndex);
      if (dropPosition === "over") {
        const targetIndex = hoverIndex;
        if (!isEqual(targetIndex, this.state.targetIndex)) {
          this.setState({ targetIndex });
        }
      } else if (dropPosition === "under") {
        const tempIndex = cloneDeep(hoverIndex);
        tempIndex[2] += 1;
        const targetIndex = tempIndex;
        // console.log(targetIndex, this.state.targetIndex);
        if (!isEqual(targetIndex, this.state.targetIndex)) {
          this.setState({ targetIndex });
        }
      }
    }
  };

  public pushPresentBlockToTargetIndex = (dragIndex: any) => {
    this.masterCallback("onDrag", null);
    this.moveCard(dragIndex, this.state.targetIndex);
  };

  public pushNewBlockToTargetIndex = (dragItem: any) => {
    this.masterCallback("onDrag", null);
    this.handleDrop(dragItem, this.state.targetIndex);
  };

  public onClickPushNewBlock = (dragItem: any, type: "ROW" | "CONTENT") => {
    if (this.state.selectedIndex) {
      console.log(this.state.selectedIndex, this.state.cards);
      this.handleDrop(dragItem, this.state.selectedIndex[0] + 1);
    } else {
      if (type === "ROW") {
        this.handleDrop(dragItem, this.state.cards.length);
      } else if (type === "CONTENT") {
        this.handleDrop(dragItem, this.state.cards.length);
      }
    }
  };

  public onInputImageChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value, files }
    } = event;
    if (files) {
      this.setState({
        titleImgUploading: true
      });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "811881451928618");
      formData.append("upload_preset", "tqecb16q");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/djjpx4ror/image/upload",
        formData
      );
      if (secure_url) {
        this.setState({
          titleImg: secure_url,
          titleImgUploading: false
        });
      }
    }
    this.setState({
      [name]: value
    } as any);
  };
}

export default DragDropContext(HTML5Backend)(Editor);
