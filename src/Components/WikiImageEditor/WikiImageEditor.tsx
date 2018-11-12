import * as React from "react";
import WikiImageEditorLeft from "../WikiImageEditorLeft";
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
import { RenderNodeProps, RenderMarkProps } from "slate-react";
import { WIKIIMAGE, CATEGORIES_KEYWORD } from "../../sharedQueries";

import update from "immutability-helper";
import isEqual from "lodash.isequal";
import cloneDeep from "lodash.clonedeep";
import { GetPos } from "../../Utility/GetPos";
import { MutationFn } from "react-apollo";
import { addPost, addPostVariables } from "../../types/api";
import { Button } from "../../sharedStyle";
import Template from "../Template";
import Builder from "../Builder";
import { Link } from "react-router-dom";
import Upload from "../Upload";
import { Popover, Tooltip, Icon } from "antd";
import HoverView from "../HoverView";

interface IEditorContainerProps {
  type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT";
}

const EditorContainer = styled<IEditorContainerProps, any>("div")`
  width: 100%;
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
  top: 5px;
  left: 50%;
  height: 34px;
  width: 200px;
  margin-left: -136px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IDeviceProps {
  selected: boolean;
}

const Size = styled<IDeviceProps, any>("div")`
  margin: 0px 15px;
  cursor: pointer;
  fill: ${props => (props.selected ? "#7158e2" : "black")};
  opacity: ${props => (props.selected ? "1" : "0.5")};
  transition: opacity 0.2s ease, fill 0.2s ease;
  font-size: 21px;
  font-weight: bolder;
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
  position: absolute;
  top: 88px;
  bottom: 0px;
  right: 0px;
  left: 0px;
`;

const WikiImageContainer = styled.div`
  width: 40%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ShownImageContainer = styled.div`
  margin-top: 10px;
`;

const EditorLeftOuterContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #e5e5e5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  }

  ${media.tablet`width: 100%;`};
  ${media.phone`width: 100%;`};
`;

interface IEditorLeftContainerProps {
  size: "SMALL" | "MEDIUM" | "LARGE";
}

const EditorLeftContainer = styled<IEditorLeftContainerProps, any>("div")`
  position: relative;
  width: ${props =>
    props.size === "SMALL"
      ? "200px"
      : props.size === "MEDIUM"
      ? "300px"
      : props.size === "LARGE"
      ? "400px"
      : "100%"};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  transition: width 0.2s ease;
`;

const EditorRightContainer = styled.div`
  background-color: white;
  transition: width 1s ease;
  width: 20%;
  min-width: 250px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
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

interface IProps {
  type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT";
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
  size: "SMALL" | "MEDIUM" | "LARGE";
  templatePopUp: boolean;
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
  cardbuilderpositions: any[];
  targetIndex: any;
}

class WikiImageEditor extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.onUnload = this.onUnload.bind(this);
    this.state = {
      rightMenu: null,
      view: "EDIT",
      device: "LARGE",
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
      cardbuilderpositions: [],
      targetIndex: [],
      titleImg: null,
      titleImgUploading: false,
      titleImgPos: 50,
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
      | "font"
      | "view"
      | "onDrag"
      | "rightMenu"
      | "shownImage"
      | "targetIndex"
      | "selectedIndex"
      | "hoveredIndex",
    dataFromChild: any,
    secondDataFromChild?: any
  ) => {
    if (type === "title") {
      this.setState({ title: dataFromChild });
    } else if (type === "font") {
      this.setState({ font: dataFromChild });
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

  public sendButton = (type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT", pos: any) => {
    if (type === "WIKIIMAGE_ADD") {
      return (
        <PostButtonContainer>
          {this.state.exShownImg.url ? (
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
          ) : null}
        </PostButtonContainer>
      );
    } else if (type === "WIKIIMAGE_EDIT") {
      return (
        <PostButtonContainer>
          {this.state.exShownImg.url ? (
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
          ) : null}
        </PostButtonContainer>
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
      view,
      size,
      pos,
      hoverImgJson,
      onImage,
      onDrag,
      targetIndex
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
              <Size
                onClick={() => this.handleDevice("SMALL")}
                selected={size === "SMALL"}
              >
                S
              </Size>
              <Size
                onClick={() => this.handleDevice("MEDIUM")}
                selected={size === "MEDIUM"}
              >
                M
              </Size>
              <Size
                onClick={() => this.handleDevice("LARGE")}
                selected={size === "LARGE"}
              >
                L
              </Size>
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

            <EditorLeftOuterContainer>
              <EditorLeftContainer view={view} size={size}>
                {view === "EDIT" ? (
                  <React.Fragment>
                    <WikiImageEditorLeft font={this.state.font} view="EDIT">
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
                    </WikiImageEditorLeft>
                  </React.Fragment>
                ) : view === "USER" ? (
                  <UserView json={this.state} />
                ) : view === "JSON" ? (
                  <JsonView json={this.state} />
                ) : null}
              </EditorLeftContainer>
            </EditorLeftOuterContainer>

            <WikiImageContainer>
              <div style={{ fontSize: 20, fontWeight: "bolder" }}>
                WIKIIMAGE PREVIEW
                <Tooltip title="You can preview wikiImage">
                  <Icon style={{ marginLeft: 5 }} type="question-circle-o" />
                </Tooltip>
              </div>
              <Popover
                placement="left"
                content={
                  <HoverView json={JSON.parse(JSON.stringify(this.state))} />
                }
                trigger="hover"
              >
                <ShownImageContainer>
                  <Upload
                    type={"WIKIIMAGE"}
                    exShownImg={this.state.exShownImg}
                    masterCallback={this.masterCallback}
                  />
                </ShownImageContainer>
              </Popover>
            </WikiImageContainer>
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

    switch (mark.type) {
      default:
        return;
    }
  };

  public handleDevice = (size: "SMALL" | "MEDIUM" | "LARGE") => {
    this.setState({ size });
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
          console.log("over", targetIndex);
        }
      } else if (dropPosition === "under") {
        const tempIndex = cloneDeep(hoverIndex);
        tempIndex[2] += 1;
        const targetIndex = tempIndex;
        // console.log(targetIndex, this.state.targetIndex);
        if (!isEqual(targetIndex, this.state.targetIndex)) {
          this.setState({ targetIndex });
          console.log("under", targetIndex);
        }
      }
    }
  };

  public pushPresentBlockToTargetIndex = (dragIndex: any) => {
    this.masterCallback("onDrag", null);
    this.moveCard(dragIndex, this.state.targetIndex);
  };

  public pushNewBlockToTargetIndex = (dragItem: any) => {
    console.log(this.state.targetIndex);
    this.masterCallback("onDrag", null);
    this.handleDrop(dragItem, this.state.targetIndex);
  };
}

export default DragDropContext(HTML5Backend)(WikiImageEditor);
