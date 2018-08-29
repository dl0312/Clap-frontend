import * as React from "react";
import { Helmet } from "react-helmet";

interface IProps {
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

const AddPostPresenter: React.SFC<IProps> = ({ title, body }) => (
  <React.Fragment>
    <Helmet>
      <title>Add Post | CLAP</title>
    </Helmet>
    <Editor state={this.state.body} type="POST_ADD" AddPost={AddPost} />
  </React.Fragment>
);

export default AddPostPresenter;
