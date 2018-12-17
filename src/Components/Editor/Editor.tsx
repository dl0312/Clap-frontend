import * as React from "react";
import EditorSideBar from "../EditorSideBar";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import styled from "styled-components";
import EditorDefaults from "../../EditorDefaults";
// import JsonView from "../JsonView";
// import UserView from "../UserView";
// import BlockOptions from "../BlockOptions";
// import EmptyCard from "../EmptyCard";
import { POST, POSTS, GET_CATEGORIES_BY_GAME_ID } from "../../sharedQueries";
import update from "immutability-helper";
// import isEqual from "lodash.isequal";
// import cloneDeep from "lodash.clonedeep";
import { MutationFn, Query } from "react-apollo";
import {
  addPost,
  addPostVariables,
  getCategoriesByGameIdVariables,
  getCategoriesByGameId
} from "../../types/api";
import Textarea from "../Textarea";
import Template from "../Template";
// import Builder from "../Builder";
import ImageButton from "../ImageButton";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomDragLayer from "../CustomDragLayer";
import { Select, Button, Icon, Slider } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import Container from "../Container";
import Builder from "../Builder";
import { media } from "src/config/_mixin";
import WikiWindow from "../WikiWindow";
import CustomModal from "../CustomModal";
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

const EditorNavTwo = styled.div`
  height: 43px;
  background-color: ${EditorDefaults.MAIN_BACKGROUND_COLOR};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;

const EditorContentSection = styled.div`
  overflow: hidden;
  position: absolute;
  top: 88px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 80;
`;

const TitleFrame = styled.div`
  position: relative;
`;

interface ITitleWrapperProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const TitleWrapper = styled<ITitleWrapperProps, any>("div")`
  margin-left: ${props => (props.device === "PHONE" ? "0" : null)};
  margin-right: ${props => (props.device === "PHONE" ? "0" : null)};
  margin-bottom: ${props => (props.device === "PHONE" ? "25px" : null)};
  margin-top: 0;
  position: relative;
  margin-bottom: 40px;
  padding: 0;
`;

interface ITitleContainer {
  titleImg: string;
  titleImgUploading: boolean;
  titleImgPos: number;
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const TitleContainer = styled<ITitleContainer, any>("div")`
  width: auto;
  max-width: ${props => (props.device === "PHONE" ? "640px" : "886px")};
  padding-top: 83px;
  padding-bottom: ${props => (props.device === "PHONE" ? "25px" : "31px")};
  cursor: auto;
  padding-right: 0;
  padding-left: 0;
  margin: 0 auto;
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
  titleImg: string;
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
  background-color: transparent;
  border: none;
  border-bottom: ${props =>
    !props.titleImg ? "1px solid rgba(0,0,0,0.1)" : "none"};
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${props => (props.titleImg ? "white" : null)};
    opacity: 0.5;
  }
`;

const EditorContentLayer = styled.div`
  position: absolute;
  top: 0;
  left: 246px;
  right: 0;
  bottom: 0;
  height: 100%;
  min-width: 360px;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  overflow-y: auto;
  min-height: 100%;
  transform-origin: right, top;
  transform: translate3d(0, 0, 0);
  transition-property: left, right;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
`;

const EditorContentFrameLayer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: block;
  min-width: 1024px;
  min-height: 100%;
  overflow: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
`;

interface IEditorContentCanvasProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const EditorContentCanvas = styled<IEditorContentCanvasProps, any>("div")`
  display: block;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  border: 0;
  max-width: ${props =>
    props.device === "PHONE"
      ? "425px"
      : props.device === "TABLET"
      ? "768px"
      : "100%"};
  min-width: ${props => (props.device === "DESKTOP" ? "778px" : null)};
  transform: translate3d(0, 0, 0);
  transition-property: all;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  overflow-x: hidden;
  overflow-y: auto;
`;

const EditorContentFrame = styled.div`
  height: 100%;
`;

const EditorContentContainer = styled.div`
  min-width: 320px;
  transition: 0.3s;
  height: 100%;
  font-size: 14px;
  word-break: break-all;
  ${media.tablet`
    padding: 0 0 0 40px;
  `}
`;

const EditorContentWrapper = styled.div`
  min-height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
  background-color: #fff;
`;

interface IEditorCanvasProps {
  device: "PHONE" | "TABLET" | "DESKTOP";
}

const EditorCanvas = styled<IEditorCanvasProps, any>("div")`
  min-height: ${props => (props.device === "PHONE" ? "551px" : "662px")};
  padding-bottom: 80px;
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
  selectedIndex: number | null;
  hoveredIndex: number | null;
  selectedContent: any;
  hoverImgJson: any;
  onImage: boolean;
  exShownImg: { url: string; id: string };
  pos: { x: number; y: number };
  title: string;
  cards: any[];
  cardbuilderpositions: any[];
  targetIndex: number | null;
  titleImg: string;
  titleImgUploading: boolean;
  titleImgPos: number;
  tags: any[];
  isTitlePosDraggable: boolean;
  isDragging: boolean;
  imageLibrary: any;
  isVideoModalOpen: boolean;
}

class Editor extends React.Component<IProps, IState, any> {
  inputElement: any;
  titleImageButton: any;
  handler: any;
  wikiRef: any;
  scrollWrapperRef: any;
  activeEditorRef: any;
  constructor(props: IProps) {
    super(props);
    this.scrollWrapperRef = React.createRef();
    this.wikiRef = React.createRef();
    this.activeEditorRef = React.createRef();
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
      targetIndex: null,
      titleImg: null,
      titleImgUploading: false,
      titleImgPos: 50,
      tags: [],
      inputVisible: false,
      inputValue: "",
      isTitlePosDraggable: false,
      isDragging: false,
      imageLibrary: [],
      isVideoModalOpen: false,
      ...props.state
    };
  }

  public onUnload = (event: any) => {
    // the method that will be used for both add and remove event
    event.returnValue = "Hellooww";
  };

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  public handleScrollFn = (e: any) => {
    console.log(e);
  };

  public buttonCallback = (
    type: "mouseover" | "mouseleave" | "select" | "delete" | "duplicate",
    dataFromChild: number
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
        if (selectedIndex === dataFromChild) {
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
        this.setState(
          {
            selectedIndex: dataFromChild,
            selectedContent: this.showSelected(dataFromChild),
            rightMenu: null
          },
          () => console.log(this.state.selectedIndex)
        );
      }
    } else if (type === "delete") {
      // frame
      this.setState({ selectedIndex: null, selectedContent: null });
      if (this.state.cards.length === 1) {
        this.setState(
          update(this.state, {
            cards: {
              $splice: [[dataFromChild, 1]]
            }
          }),
          () =>
            this.setState({
              cards: EditorDefaults.DEFAULT_EDITOR_BLOCK
            })
        );
      } else {
        this.setState(
          update(this.state, {
            cards: {
              $splice: [[dataFromChild, 1]]
            }
          })
        );
      }
    } else if (type === "duplicate") {
      const targetCard = JSON.parse(JSON.stringify(cards[dataFromChild]));
      this.setState(
        update(this.state, {
          cards: {
            $splice: [[dataFromChild, 0, targetCard]]
          }
        })
      );
    }
  };

  // 오른쪽 버튼 Drop Here에 놨을 때
  public handleDrop = (dragItem: any, targetIndex: number) => {
    // on column
    console.log(dragItem, targetIndex);
    // on frame
    if (!!dragItem) {
      this.setState(
        update(this.state, {
          cards: {
            $splice: [[targetIndex, 0, dragItem]]
          }
        })
      );
      this.setState({ isDragging: false, targetIndex: null });
    }
  };

  // 이동
  // block on column -> block on column ([1,2,1] > [3,1,1])
  // frame -> frame (5 > 7)
  public moveCard = (dragIndex: number, hoverIndex: number) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];
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
      console.log(dragIndex, hoverIndex);
      this.setState(
        update(this.state, {
          cards: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
          }
        })
      );
    }
  };

  public masterCallback = (
    type:
      | "title"
      | "view"
      | "isDragging"
      | "unselect"
      | "shownImage"
      | "targetIndex"
      | "selectedIndex"
      | "hoveredIndex",
    dataFromChild?: any,
    secondDataFromChild?: any
  ) => {
    console.log(dataFromChild, type);
    if (type === "title") {
      this.setState({ title: dataFromChild });
    } else if (type === "view") {
      this.setState({ view: dataFromChild });
    } else if (type === "targetIndex") {
      this.setState({ targetIndex: dataFromChild });
    } else if (type === "selectedIndex") {
      console.log(`select ${dataFromChild}`);
      this.setState({ selectedIndex: dataFromChild });
    } else if (type === "hoveredIndex") {
      this.setState({ hoveredIndex: dataFromChild });
    } else if (type === "unselect") {
      console.log(`unselect`);
      this.setState({
        selectedIndex: null,
        selectedContent: null
      });
    } else if (type === "shownImage") {
      this.setState({
        exShownImg: { url: dataFromChild, id: secondDataFromChild }
      });
    } else if (type === "isDragging") {
      this.setState({ isDragging: dataFromChild });
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

  public showSelected = (index: number | null) => {
    const { cards } = this.state;
    if (index !== null) {
      return cards[index];
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
      selectedContent,
      device,
      pos,
      titleImg,
      titleImgUploading,
      titleImgPos,
      tags,
      isTitlePosDraggable,
      targetIndex,
      isDragging
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
            {/* <EditorUtilButtonContainer>
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
            </EditorUtilButtonContainer> */}
            <Template
              onTemplateClick={this.onTemplateClick}
              handleSetState={this.handleSetState}
            />
          </EditorNavTwo>
          <EditorContentSection>
            <CustomDragLayer />
            <EditorSideBar
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
              imageLibrary={this.state.imageLibrary}
            />
            <EditorContentLayer>
              <EditorContentFrameLayer>
                <EditorContentCanvas
                  device={device}
                  innerRef={this.scrollWrapperRef}
                >
                  <EditorContentFrame>
                    <EditorContentContainer>
                      <EditorContentWrapper id="container">
                        <EditorCanvas device={device}>
                          <TitleFrame>
                            <TitleWrapper device={device}>
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
                                  titleImg={titleImg}
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
                                      <ImageButton
                                        withText={true}
                                        onChange={this.onInputImageChange}
                                      />
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
                                      <Button style={{ padding: "0 8px" }}>
                                        <ImageButton
                                          withText={false}
                                          onChange={this.onInputImageChange}
                                        />
                                      </Button>
                                      <Button icon="cloud-upload" />
                                      <Button icon="edit" />
                                      <Button
                                        onClick={() => {
                                          this.setState({
                                            isTitlePosDraggable: true
                                          });
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
                                          this.onInputChange(
                                            "titleImgPos",
                                            value
                                          )
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
                                          this.setState({
                                            isTitlePosDraggable: false
                                          })
                                        }
                                      >
                                        Ok
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </TitleContainer>
                            </TitleWrapper>
                          </TitleFrame>
                          {cards.length !== 0 ? (
                            <React.Fragment>
                              <Builder
                                index={0}
                                state={
                                  isDragging
                                    ? 0 === targetIndex
                                      ? "ISOVER"
                                      : "ONDRAG"
                                    : "NOTHING"
                                }
                                handleDrop={this.handleDrop}
                              />
                              {cards.map((item, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <Container
                                      callbackfromparent={this.buttonCallback}
                                      masterCallback={this.masterCallback}
                                      moveCard={this.moveCard}
                                      handleDrop={this.handleDrop}
                                      handleOnChange={this.handleOnChange}
                                      index={index}
                                      type={item.type}
                                      contents={item.contents}
                                      setTargetIndex={this.setTargetIndex}
                                      pushPresentBlockToTargetIndex={
                                        this.pushPresentBlockToTargetIndex
                                      }
                                      pushNewBlockToTargetIndex={
                                        this.pushNewBlockToTargetIndex
                                      }
                                      hoveredIndex={this.state.hoveredIndex}
                                      selectedIndex={this.state.selectedIndex}
                                      handleOnClickImageChange={
                                        this.handleOnClickImageChange
                                      }
                                      setInitialImageContents={
                                        this.setInitialImageContents
                                      }
                                      changeImageSizeFromCurrentToTarget={
                                        this.changeImageSizeFromCurrentToTarget
                                      }
                                      gameId={gameId}
                                      device={device}
                                      wikiRef={this.wikiRef}
                                      scrollWrapperRef={this.scrollWrapperRef}
                                      activeEditorRef={this.activeEditorRef}
                                    />
                                    <Builder
                                      index={index + 1}
                                      state={
                                        isDragging
                                          ? index + 1 === targetIndex
                                            ? "ISOVER"
                                            : "ONDRAG"
                                          : "NOTHING"
                                      }
                                      handleDrop={this.handleDrop}
                                    />
                                  </React.Fragment>
                                );
                              })}
                            </React.Fragment>
                          ) : null}
                        </EditorCanvas>
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
                                          filterOption={(
                                            input,
                                            option: any
                                          ) => {
                                            return (
                                              option.props.children.props.children[1].props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >=
                                              0
                                            );
                                          }}
                                        >
                                          {categories &&
                                            categories.map(
                                              (category, index) => {
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
                                                              category
                                                                .topWikiImage
                                                                .shownImage
                                                            }
                                                          />
                                                        )}
                                                        <span
                                                          style={{
                                                            padding: "0 7px"
                                                          }}
                                                        >
                                                          {category.name}
                                                        </span>
                                                      </span>
                                                    </Option>
                                                  )
                                                );
                                              }
                                            )}
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
                      </EditorContentWrapper>
                    </EditorContentContainer>
                  </EditorContentFrame>
                </EditorContentCanvas>
                <div ref={el => (this.wikiRef = el)}>
                  <WikiWindow
                    handleOnChange={this.handleOnChange}
                    selectedIndex={selectedIndex}
                    selectedContent={selectedContent}
                    activeEditorRef={this.activeEditorRef}
                  />
                </div>
              </EditorContentFrameLayer>
            </EditorContentLayer>
          </EditorContentSection>
        </EditorContainer>
        <input
          type="file"
          accept="image/*"
          ref={el => (this.inputElement = el)}
          // multiple={true}
        />
        {this.state.isVideoModalOpen && (
          <CustomModal
            handleSetState={this.handleSetState}
            handleDrop={this.handleDrop}
            selectedIndex={selectedIndex}
cards={cards}
          />
        )}
      </React.Fragment>
    );
  }

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

  public onBlockOptionDownClick = () => {
    console.log("out");
    this.setState({
      selectedIndex: null,
      hoveredIndex: null,
      selectedContent: null
    });
  };

  public setTargetIndex = (
    hoverIndex: number,
    dropPosition: "over" | "under"
  ) => {
    if (dropPosition === "over") {
      const targetIndex = hoverIndex;
      console.log(this.state.targetIndex);
      if (targetIndex !== this.state.targetIndex) {
        this.setState({ targetIndex });
      }
    } else if (dropPosition === "under") {
      const targetIndex = hoverIndex + 1;
      console.log(this.state.targetIndex);
      if (targetIndex !== this.state.targetIndex) {
        this.setState({ targetIndex });
      }
    }
  };

  public pushPresentBlockToTargetIndex = (dragIndex: any) => {
    this.masterCallback("isDragging", false);
    console.log(this.state.targetIndex);
    if (this.state.targetIndex !== null) {
      this.moveCard(dragIndex, this.state.targetIndex);
    } else {
      console.log(`타겟 인덱스가 없으요`);
    }
  };

  public pushNewBlockToTargetIndex = async (dragItem: any) => {
    this.masterCallback("isDragging", false);
    if (this.state.targetIndex !== null) {
      if (dragItem.type === "Image") {
        this.handler = (e: any) => this.handleInputNewImage(e, dragItem);
        this.inputElement.addEventListener("change", this.handler);
        await this.inputElement.click();
      } else if (dragItem.type === "Video") {
        this.setState({ isVideoModalOpen: true });
      } else {
        this.handleDrop(dragItem, this.state.targetIndex);
      }
    } else {
      console.log(`타겟 인덱스가 없으요`);
    }
  };

  public onClickPushNewBlock = (dragItem: any) => {
    if (this.state.selectedIndex !== null) {
      if (dragItem.type === "Image") {
        this.handler = (e: any) => this.handleInputNewImage(e, dragItem);
        this.inputElement.addEventListener("change", this.handler);
        this.inputElement.click();
      } else if (dragItem.type === "Video") {
        this.setState({ isVideoModalOpen: true });
      } else {
        this.handleDrop(dragItem, this.state.selectedIndex + 1);
      }
    } else {
      this.setState({ targetIndex: this.state.cards.length });
      if (dragItem.type === "Image") {
        this.handler = (e: any) => this.handleInputNewImage(e, dragItem);
        this.inputElement.addEventListener("change", this.handler);
        this.inputElement.click();
      } else if (dragItem.type === "Video") {
        console.log(`isVideoModalOpen`);
        this.setState({ isVideoModalOpen: true });
      } else {
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

  public handleInputNewImage = async (event: any, dragItem: any) => {
    const {
      target: { files }
    } = event;
    if (files) {
      console.log(dragItem, this.state);
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
        await this.setState({
          imageLibrary: [...this.state.imageLibrary, secure_url]
        });
      }
      dragItem.contents.libraryIndex = this.state.imageLibrary.length - 1;
      dragItem.contents.imageUrl = this.state.imageLibrary[
        dragItem.contents.libraryIndex
      ];
      dragItem.contents.style = "alignLeft";
      console.log(this.state.targetIndex);
      if (this.state.targetIndex !== null) {
        this.handleDrop(dragItem, this.state.targetIndex);
      }
      this.inputElement.removeEventListener("change", this.handler);
    }
  };

  public handleInputImageOnChange = async (
    event: any,
    index: number,
    libraryIndex: number
  ) => {
    const {
      target: { name, value, files }
    } = event;
    console.log(name, value, files);
    if (files) {
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
        this.handleOnChange(secure_url, index, "imageUrl");
        this.handleOnChange(secure_url, libraryIndex, "imageLibrary");
      }
      this.inputElement.removeEventListener("change", this.handler);
    }
  };

  public handleOnClickImageChange = async (
    index: number,
    libraryIndex: number
  ) => {
    this.handler = (e: any) =>
      this.handleInputImageOnChange(e, index, libraryIndex);
    this.inputElement.addEventListener("change", this.handler);
    await this.inputElement.click();
  };

  public handleSetState = (stateName: string, value: any) => {
    this.setState({ [stateName]: value } as any);
  };

  public setInitialImageContents = (
    naturalImageWidth: number,
    naturalImageHeight: number,
    style: "fullWidth" | "alignLeft",
    index: number
  ) => {
    this.setState(
      update(this.state, {
        cards: {
          [index]: {
            contents: {
              naturalImageWidth: { $set: naturalImageWidth },
              naturalImageHeight: { $set: naturalImageHeight },
              currentImageWidth: { $set: naturalImageWidth },
              currentImageHeight: { $set: naturalImageHeight },
              style: { $set: style }
            }
          }
        }
      })
    );
  };

  public changeImageSizeFromCurrentToTarget = (
    currentImageWidth: number,
    currentImageHeight: number,
    index: number
  ) => {
    this.setState(
      update(this.state, {
        cards: {
          [index]: {
            contents: {
              currentImageWidth: { $set: currentImageWidth },
              currentImageHeight: { $set: currentImageHeight }
            }
          }
        }
      })
    );
  };

  public handleOnChange = (
    value: any,
    index: number,
    type:
      | "editorState"
      | "description"
      | "imageUrl"
      | "videoUrl"
      | "link"
      | "imageLibrary"
      | "style"
      | "libraryIndex"
      | "naturalImageWidth"
      | "naturalImageHeight"
      | "currentImageWidth"
      | "currentImageHeight"
  ) => {
    // console.log(value, index, type);
    if (type === "editorState") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                editorState: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "naturalImageWidth") {
      console.log(value, index, type);
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                naturalImageWidth: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "naturalImageHeight") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                naturalImageHeight: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "currentImageWidth") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                currentImageWidth: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "currentImageHeight") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                currentImageHeight: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "description") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                description: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "imageUrl") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                imageUrl: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "videoUrl") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                videoUrl: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "link") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                link: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "libraryIndex") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                libraryIndex: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "style") {
      this.setState(
        update(this.state, {
          cards: {
            [index]: {
              contents: {
                style: { $set: value }
              }
            }
          }
        })
      );
    } else if (type === "imageLibrary") {
      this.setState(
        update(this.state, {
          imageLibrary: {
            [index]: { $set: value }
          }
        })
      );
    }
  };

  // public handleOnChange = (value: any, index: number, contentName: string) => {
  //   this.setState(
  //     update(this.state, {
  //       cards: {
  //         [index]: {
  //           contents: {
  //             [contentName]: { $set: value }
  //           }
  //         }
  //       }
  //     })
  //   );
  // };
}

export default DragDropContext(HTML5Backend)(Editor);
