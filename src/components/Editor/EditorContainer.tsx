import * as React from "react";
import EditorLeft from "./EditorLeft";
import EditorRight from "./EditorRight";
import { DragDropContext } from "react-dnd";
import HTML5Backend, { NativeTypes } from "react-dnd-html5-backend";
import Card from "./Card";
import Column from "./Column";
import { Button } from "./Components";
import styled from "styled-components";
import EditorDefaults from "./EditorDefaults";
import JsonView from "./JsonView";
import UserView from "./UserView";
import BlockOptions from "./BlockOptions";
import { media } from "../../config/_mixin";
import ImagePopup from "../../utility/ImagePopup";
import Pos from "../../utility/Pos";
import { Value } from "slate";
import EmptyCard from "./EmptyCard";
import Upload from "utility/Upload";
import { POST, WIKIIMAGE, POSTS } from "../../queries";
import { Row, Col, Tabs } from "antd";
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
import "github-markdown.css";

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

const TabPane = Tabs.TabPane;
import  update from "immutability-helper";
const DEFAULT_NODE = "paragraph";

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditorContainer = styled.div`
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

const EditorLeftContainer = styled.div`
  position: relative;
  width: 75%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${props =>
        `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${
        props.color.a
        })`};
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  transition: width 0.5s ease;
  ${media.tablet`width: 100%;`};
  ${media.phone`width: 100%;`};
`;

const TextEditor = styled.div`
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease;
  background-color: white;
  margin-top: 1px;
  position: absolute;
  right: 0px;
  left: 0px;
  z-index: 200;
  opacity: ${props => props.opacity};
`;

const EditorRightContainer = styled.div`
  outline: 0.05px solid rgb(172, 172, 172);
  transition: width 1s ease;
  width: 25%;
  min-width: 400px;
  ${media.tablet`display: none;`};
  ${media.phone`display: none;`};
`;

// function isImage(url) {
//   return !!imageExtensions.find(url.endsWith);
// }

const ClapImage = styled.img`
  width: ${props => (props.small ? "20px" : null)};
  margin-left: ${props => (props.small ? "2px" : null)};
  margin-right: ${props => (props.small ? "2px" : null)};
  max-width: 100%;
  max-height: 20em;
  margin-bottom: ${props => (props.small ? "-4px" : null)};
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

const ClapImageContainer = styled.span`
  margin-left: ${props => (props.small ? "2px" : null)};
  margin-right: ${props => (props.small ? "2px" : null)};
  cursor: pointer;
`;

const ClapImageText = styled.span`
  font-weight: bolder;
  color: ${props => props.color};
`;

const MarkListContainer = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  top: 42.5px;
  background-color: white;
  margin-left: ${props => (props.type === "font-size" ? "-25px" : "-10px")};
  border: ${props =>
        props.isActive ? "1px solid #eee" : "1px solid transparent"};
  overflow: hidden;
  transition: height 0.5s ease, border 0.5s ease;
  height: ${props =>
        props.isActive ? (props.type === "font-size" ? "150px" : "80px") : "0px"};
  color: black;
`;

const Icon = styled.div`
  font-size: 15px;
  letter-spacing: -1px;
  width: ${props => (props.type === "font-family" ? "90px" : null)};
  vertical-align: text-bottom;
`;

const MarkListItem = styled.li`
  list-style: none;
  padding: 5px 10px;
  color: ${props => (props.active ? "black" : null)};
  letter-spacing: -1px;
`;

const PostButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const PostButton = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 200px;
  margin: 10px 0;
  padding: 0 10px;
  height: 30px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

class Editor extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func,
        greedy: PropTypes.bool,
        children: PropTypes.node
    };
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.state = {
            rightMenu: null,
            view: EditorDefaults.VIEW,
            color: EditorDefaults.BACKGROUND_COLOR,
            contentWidth: EditorDefaults.WIDTH,
            font: null,
            OnDrag: null,
            hasDropped: false,
            hasDroppedOnChild: false,
            contentHover: false,
            selectedIndex: null,
            hoveredIndex: null,
            selectedContent: null,
            hoverImgJson: null,
            onImage: false,
            fontStylePopUp: false,
            exShownImg:
                this.props.type === "WIKIIMAGE_EDIT"
                    ? this.props.wikiImage.shownImage
                    : null,
            pos: { x: 0, y: 0 },
            title: "",
            category: [],
            cards: []
        };
        this.state = { ...props.state };
        // this.setstate = {
        //   rightMenu: null,
        //   selectedIndex: null,
        //   selectedContent: null
        // };
        // console.log(props.state);
    }

    addIdToState = (type, category) => {
        console.log(category);
        const found = this.state.category.includes(category.id);
        const hasUnique = this.state.category.length === 1;
        console.log(!found && !hasUnique);
        if (!found && !hasUnique) {
            this.setState({ category: this.state.category.concat(category.id) });
        }
    };

    deleteIdToState = (type, category) => {
        console.log(category);
        const curCategory = this.state.category;
        const index = this.state.category.findIndex(id => id === category.id);
        console.log(index);
        curCategory.splice(index, 1);
        console.log(curCategory);
        this.setState({ category: curCategory });
    };

    getPos = e => {
        const pos = new Pos(e.pageX, e.pageY - 100);
        console.log(pos);
        this.setState({ pos });
    };

    buttonCallback = (type, dataFromChild) => {
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
                    (!Array.isArray(selectedIndex) && selectedIndex === dataFromChild) ||
                    (Array.isArray(selectedIndex) &&
                        (selectedIndex.length === dataFromChild.length &&
                            selectedIndex.every((v, i) => v === dataFromChild[i])))
                ) {
                } else {
                    this.setState({
                        selectedIndex: undefined,
                        selectedContent: undefined,
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
                    selectedIndex: undefined,
                    selectedContent: undefined,
                    rightMenu: null
                });
                this.setState({
                    selectedIndex: dataFromChild,
                    selectedContent: this.showSelected(dataFromChild),
                    rightMenu: null
                });
            }
        } else if (type === "delete") {
            if (dataFromChild.length === 3) {
                // block
                this.setState(
                    {
                        selectedIndex: null,
                        selectedContent: null
                    },
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
            } else if (!Array.isArray(dataFromChild)) {
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
            }
        } else if (type === "duplicate") {
            if (!Array.isArray(dataFromChild)) {
                let targetCard = JSON.parse(JSON.stringify(cards[dataFromChild]));
                this.setState(
                    update(this.state, {
                        cards: {
                            $splice: [[dataFromChild, 0, targetCard]]
                        }
                    })
                );
            } else {
                let targetCard = JSON.parse(
                    JSON.stringify(
                        cards[dataFromChild[0]].columnListArray[dataFromChild[1]][
                        dataFromChild[2]
                        ]
                    )
                );
                if (targetCard.content === "BUTTON" || targetCard.content === "TEXT")
                    targetCard.value = Value.fromJSON(targetCard.value);
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
                // this.setState(
                //   update(this.state, {
                //     cards: {
                //       [dataFromChild[0]]: {
                //         columnListArray: {
                //           [dataFromChild[1]]: {
                //             $set: { [dataFromChild[2] + 1]: targetCard }
                //           }
                //         }
                //       }
                //     }
                //   })
                // );
            }
        }
    };

    // 오른쪽 버튼 Drop Here에 놨을 때
    handleDrop = (hoverItem, hoverIndex) => {
        // on column
        if (hoverIndex.length === 3) {
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
        } else {
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
        }
    };

    // 이동
    // block on column -> block on column ([1,2,1] > [3,1,1])
    // frame -> frame (5 > 7)
    moveCard = (dragIndex, hoverIndex) => {
        if (dragIndex.length === 3 && hoverIndex.length === 3) {
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
            if (
                dragIndex[0] === hoverIndex[0] &&
                dragIndex[1] === hoverIndex[1] &&
                dragIndex[2] === hoverIndex[2]
            ) {
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
        } else if (!Array.isArray(dragIndex) && !Array.isArray(hoverIndex)) {
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
        }
    };

    masterCallback = (type, dataFromChild) => {
        if (type === "BodyBackgroundColor") {
            this.setState({ color: dataFromChild });
        } else if (type === "Title") {
            this.setState({ title: dataFromChild });
        } else if (type === "width") {
            this.setState({ contentWidth: dataFromChild });
        } else if (type === "font") {
            this.setState({ font: dataFromChild });
        } else if (type === "view") {
            this.setState({ view: dataFromChild });
        } else if (type === "OnDrag") {
            this.setState({ OnDrag: dataFromChild });
        } else if (type === "rightMenu") {
            this.setState({
                rightMenu: dataFromChild,
                selectedIndex: null,
                selectedContent: null
            });
        } else if (type === "shownImage") {
            this.setState({ exShownImg: dataFromChild });
        }
    };

    OnChangeCards = (index, props, value) => {
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

    handleOnChange = (value, index, content, type) => {
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

    showSelected = index => {
        const { cards } = this.state;
        if (!Array.isArray(index)) {
            return cards[index];
        } else {
            if (index.length === 2) {
                return cards[index[0]];
            } else if (index.length === 3) {
                return cards[index[0]].columnListArray[index[1]][index[2]];
            }
        }
    };

    render() {
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
        // console.log(this.state);
        return (
            <Fragment>
                {this.props.type === "POST_ADD" ? (
                    <PostButtonContainer>
                        <PostButton
                            onClick={e => {
                                e.preventDefault();
                                const filteredState = this.state;
                                filteredState.rightMenu = null;
                                filteredState.selectedContent = null;
                                filteredState.selectedIndex = null;
                                filteredState.onDrag = null;
                                filteredState.hoverImgJson = null;
                                filteredState.pos = { x: 0, y: 0 };
                                filteredState.onImage = false;
                                filteredState.view = "EDIT";
                                this.props.AddPost({
                                    refetchQueries: [
                                        {
                                            query: POSTS
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
                                const filteredState = this.state;
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
                                const filteredState = this.state;
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
                                    variables: {
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
                ) : this.props.type === "WIKIIMAGE_EDIT" ? (
                    <React.Fragment>
                        <Upload
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
                                const filteredState = this.state;
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
                    </React.Fragment>
                ) : null}
                <EditorContainer type={type}>
                    <EditorLeftContainer view={view} color={this.state.color}>
                        {view === "EDIT" ? (
                            <React.Fragment>
                                <Row>
                                    <Col style={{ minHeight: "100vh" }}>
                                        <div className="toolbar">
                                            <FlexBox>
                                                {selectors.map((Type, i) => {
                                                    if (
                                                        this.state.selectedIndex !== null &&
                                                        (this.state.selectedContent.content === "TEXT" ||
                                                            this.state.selectedContent.content === "BUTTON" ||
                                                            this.state.selectedContent.content === "HTML")
                                                    ) {
                                                        const { value } = this.showSelected(
                                                            this.state.selectedIndex
                                                        );
                                                        console.log(
                                                            this.showSelected(this.state.selectedIndex)
                                                        );
                                                        console.log(value);
                                                        const onChange = value => {
                                                            this.handleOnChange(
                                                                value,
                                                                this.state.selectedIndex,
                                                                "TEXT",
                                                                "TEXT_CHANGE"
                                                            );
                                                        };
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
                                                        (this.state.selectedContent.content === "TEXT" ||
                                                            this.state.selectedContent.content === "BUTTON" ||
                                                            this.state.selectedContent.content === "HTML")
                                                    ) {
                                                        const { value } = this.showSelected(
                                                            this.state.selectedIndex
                                                        );
                                                        console.log(
                                                            this.showSelected(this.state.selectedIndex)
                                                        );
                                                        console.log(value);
                                                        const onChange = value => {
                                                            this.handleOnChange(
                                                                value,
                                                                this.state.selectedIndex,
                                                                "TEXT",
                                                                "TEXT_CHANGE"
                                                            );
                                                        };
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
                                <EditorLeft
                                    color={this.state.color}
                                    contentWidth={this.state.contentWidth}
                                    font={this.state.font}
                                    view="EDIT"
                                >
                                    {cards.map((item, index) => {
                                        if (item.type === "columnList") {
                                            return (
                                                <Card
                                                    inColumn={false}
                                                    cards={this.state.cards.length}
                                                    key={index}
                                                    index={index}
                                                    moveCard={this.moveCard}
                                                    handleDrop={this.handleDrop}
                                                    OnDrag={this.state.OnDrag}
                                                    callbackfromparent={this.buttonCallback}
                                                    selectedIndex={selectedIndex}
                                                    hoveredIndex={hoveredIndex}
                                                    masterCallback={this.masterCallback}
                                                >
                                                    <Column
                                                        columnArray={item.content}
                                                        columnListArray={item.columnListArray}
                                                        index={[index, 0, 0]}
                                                        callbackfromparent={this.buttonCallback}
                                                        handleDrop={this.handleDrop}
                                                        moveCard={this.moveCard}
                                                        handleOnChange={this.handleOnChange.bind(this)}
                                                        renderNode={this.renderNode}
                                                        renderMark={this.renderMark}
                                                        selectedIndex={selectedIndex}
                                                        hoveredIndex={hoveredIndex}
                                                        contentWidth={contentWidth}
                                                        OnDrag={this.state.OnDrag}
                                                        masterCallback={this.masterCallback}
                                                        onDropOrPaste={this.onDropOrPaste}
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
                                            OnDrag={this.state.OnDrag}
                                        />
                                    )}
                                </EditorLeft>
                            </React.Fragment>
                        ) : view === "USER" ? (
                            <UserView
                                renderNode={this.renderNode}
                                renderMark={this.renderMark}
                                json={this.state}
                            />
                        ) : view === "JSON" ? (
                            <JsonView json={this.state} />
                        ) : null}
                    </EditorLeftContainer>
                    <EditorRightContainer>
                        <EditorRight
                            rightMenu={this.state.rightMenu}
                            cards={this.state.cards}
                            view={this.state.view}
                            title={this.state.title}
                            selectedIndex={selectedIndex}
                            selectedContent={this.showSelected(selectedIndex)}
                            masterCallback={this.masterCallback}
                            handleOnChange={this.handleOnChange}
                            showSelected={this.showSelected}
                            OnChangeCards={this.OnChangeCards}
                            category={this.state.category}
                            addIdToState={this.addIdToState}
                            deleteIdToState={this.deleteIdToState}
                        />
                        <BlockOptions
                            type={this.props.type}
                            handleOnChange={this.handleOnChange}
                            selectedIndex={selectedIndex}
                            selectedContent={this.showSelected(selectedIndex)}
                            showSelected={this.showSelected}
                            OnChangeCards={this.OnChangeCards}
                            masterCallback={this.masterCallback}
                        />
                    </EditorRightContainer>
                </EditorContainer>
                <ImagePopup
                    pos={pos}
                    json={hoverImgJson ? hoverImgJson : null}
                    onImage={onImage}
                />
            </Fragment>
        );
    }

    /**
     * Render a Slate node.
     *
     * @param {Object} props
     * @return {Element}
     */

    public renderNode = props => {
        const { attributes, children, node, isFocused } = props;

        switch (node.type) {
            case "block-quote":
                return <blockquote {...attributes}>{children}</blockquote>;
            case "bulleted-list":
                return <ul {...attributes}>{children}</ul>;
            case "list-item":
                return <li {...attributes}>{children}</li>;
            case "numbered-list":
                return <ol {...attributes}>{children}</ol>;
            case "clap-image":
                {
                    const represent_src = node.data.get("represent");
                    const hover_src = node.data.get("hover");
                    const name = node.data.get("name");
                    const type = node.data.get("type");
                    switch (type) {
                        case "TEXT":
                            return (
                                <ClapImageContainer
                                    onMouseOver={() =>
                                        this.setState({
                                            hoverImgJson: hover_src,
                                            onImage: true
                                        })
                                    }
                                    onMouseMove={this.getPos}
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
                                            hoverImgJson: hover_src,
                                            onImage: true
                                        })
                                    }
                                    onMouseMove={this.getPos}
                                    onMouseOut={() => {
                                        this.setState({ onImage: false });
                                    }}
                                    small={true}
                                >
                                    <ClapImage
                                        small={true}
                                        src={`http://localhost:4000/uploads/${represent_src}`}
                                        alt={"hover"}
                                        selected={isFocused}
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
                                    src={`http://localhost:4000/uploads/${represent_src}`}
                                    alt={"hover"}
                                    selected={isFocused}
                                    onMouseOver={() =>
                                        this.setState({
                                            hoverImgJson: hover_src,
                                            onImage: true
                                        })
                                    }
                                    onMouseMove={this.getPos}
                                    onMouseOut={() => {
                                        this.setState({ onImage: false });
                                    }}
                                    {...attributes}
                                />
                            );
                        default:
                            break;
                    }
                }
                break;
            default:
                break;
        }
    };

    /**
     * Render a Slate mark.
     *
     * @param {Object} props
     * @return {Element}
     */

    public renderMark = props => {
        const { children, mark, attributes } = props;
        switch (mark.type) {
            case "bold":
                return <strong {...attributes}>{children}</strong>;
            case "code":
                return <code {...attributes}>{children}</code>;
            case "italic":
                return <em {...attributes}>{children}</em>;
            case "underlined":
                return <u {...attributes}>{children}</u>;
            default:
                return;
        }
    };
}

export default DragDropContext(HTML5Backend)(Editor);
