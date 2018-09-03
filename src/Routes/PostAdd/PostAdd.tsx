import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { addPost, addPostVariables } from "../../types/api";
import { ADD_POST } from "../../sharedQueries";
import { Helmet } from "react-helmet";
import Editor from "../../Components/Editor";
import EditorDefaults from "../../EditorDefaults";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  body: {
    rightMenu: number | null;
    view: "EDIT" | "USER" | "JSON";
    bodyBackgroundColor: { r: number; g: number; b: number; a: number };
    contentWidth: number | null;
    font: string;
    selectedIndex: number | null;
    hoveredIndex: number | number[] | null;
    selectedContent: any;
    hoverImgJson: {
      cards: any[];
      color: { r: string; g: string; b: string; a: string };
      contentWidth: number;
      font: string;
    };
    onImage: boolean;
    pos: { x: number; y: number };
    title: string;
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
        bodyBackgroundColor: EditorDefaults.BACKGROUND_COLOR,
        contentWidth: EditorDefaults.WIDTH,
        font: EditorDefaults.FONT,
        selectedIndex: null,
        hoveredIndex: null,
        selectedContent: null,
        hoverImgJson: {
          cards: [],
          color: { r: "", g: "", b: "", a: "" },
          contentWidth: 600,
          font: ""
        },
        onImage: false,
        pos: { x: 0, y: 0 },
        title: "",
        category: [],
        cards: []
      }
    };
  }

  public render() {
    const { history } = this.props;
    const { body } = this.state;
    return (
      <AddPostQuery
        mutation={ADD_POST}
        onCompleted={data => {
          const { AddPost } = data;
          if (AddPost.ok) {
            toast.success("Place added!");
            setTimeout(() => {
              history.push("/places");
            }, 2000);
          } else {
            toast.error(AddPost.error);
          }
          history.push(`/guide`);
        }}
      >
        {AddPost => {
          return (
            <React.Fragment>
              <Helmet>
                <title>Add Post | CLAP</title>
              </Helmet>
              <Editor state={body} type="POST_ADD" AddPost={AddPost} />
            </React.Fragment>
          );
        }}
      </AddPostQuery>
    );
  }
}

export default PostAdd;
