import * as React from "react";
import { Helmet } from "react-helmet";
import { MutationFn } from "react-apollo";
import { addPost, addPostVariables } from "../../types/api";
import Editor from "../../Components/Editor";

interface IProps {
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
  AddPost: MutationFn<addPost, addPostVariables>;
}

const AddPostPresenter: React.SFC<IProps> = ({ body, AddPost }) => (
  <React.Fragment>
    <Helmet>
      <title>Add Post | CLAP</title>
    </Helmet>
    <Editor state={body} type="POST_ADD" AddPost={AddPost} />
  </React.Fragment>
);

export default AddPostPresenter;
