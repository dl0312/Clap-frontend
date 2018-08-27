import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { addPost, addPostVariables } from "../../types/api";
// import Editor from "../../components/Editor";
import AddPostPresenter from "./AddPostPresenter";
import { ADD_POST } from "./AddPostQueries";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  title: string;
  body: {
    rightMenu: number | null;
    view: "EDIT" | "USER" | "JSON";
    color: { r: string; g: string; b: string; a: string };
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

class AddPostContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: "",
      body: {
        rightMenu: null,
        view: "EDIT",
        contentWidth: 600,
        color: { r: "", g: "", b: "", a: "" },
        font: "",
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
    const { title, body } = this.state;
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
        {(AddPost, { data, loading, error }) => {
          return <AddPostPresenter title={title} body={body} />;
        }}
      </AddPostQuery>
    );
  }
}

export default AddPostContainer;
