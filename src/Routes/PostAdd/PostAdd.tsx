import * as React from "react";
import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import { addPost, addPostVariables } from "../../types/api";
import { ADD_POST } from "../../sharedQueries";
import { Helmet } from "react-helmet";
import Editor from "../../Components/Editor";
import EditorDefaults from "../../EditorDefaults";
import Loading from "src/Components/Loading";

interface IProps {
  history: any;
  location: { state: { gameId: number } };
}

interface IState {
  body: {
    rightMenu: number | null;
    view: "EDIT" | "USER" | "JSON";
    font: string;
    selectedIndex: number | null;
    hoveredIndex: number | number[] | null;
    selectedContent: any;
    hoverImgJson: {
      cards: any[];
      color: { r: string; g: string; b: string; a: string };
      font: string;
    };
    onImage: boolean;
    pos: { x: number; y: number };
    title: string;
    titleImg: string | null;
    titleImgPos: number | null;
    category: number[];
    cards: any[];
  };
}

class AddPostQuery extends Mutation<addPost, addPostVariables> {}

class PostAdd extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      body: {
        rightMenu: null,
        view: "EDIT",
        font: EditorDefaults.FONT,
        selectedIndex: null,
        hoveredIndex: null,
        selectedContent: null,
        hoverImgJson: {
          cards: [],
          color: { r: "", g: "", b: "", a: "" },
          font: ""
        },
        onImage: false,
        pos: { x: 0, y: 0 },
        title: "",
        titleImg: null,
        titleImgPos: null,
        category: [],
        cards: EditorDefaults.DEFAULT_EDITOR_BLOCK
      }
    };
  }

  public confirm = (data: any) => {
    const { AddPost } = data;
    console.log(data);
    if (AddPost.ok) {
      toast.success("Post Add Success");
      this.props.history.push(`/board`);
    } else {
      toast.error(AddPost.error);
    }
  };

  public render() {
    const { body } = this.state;
    console.log(this.props);
    const { gameId } = this.props.location.state;
    return (
      <AddPostQuery
        mutation={ADD_POST}
        onCompleted={data => this.confirm(data)}
      >
        {(AddPost, { loading, error, data }) => {
          if (loading) {
            return <Loading color="#000" />;
          }
          if (error) {
            console.log("error");
            return <div>{error.message}</div>;
          }
          return (
            <React.Fragment>
              <Helmet>
                <title>ADD POST | CLAP</title>
              </Helmet>
              <Editor
                state={body}
                type="POST_ADD"
                AddPost={AddPost}
                gameId={gameId}
              />
            </React.Fragment>
          );
        }}
      </AddPostQuery>
    );
  }
}

export default PostAdd;
