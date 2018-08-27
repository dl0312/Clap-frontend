import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { getAllPosts, getAllPostsVariables } from "../../types/api";
import BoardPresenter from "./BoardPresenter";
import { POSTS } from "./BoardQueries";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  hoverImgJson: {
    cards: any[];
    color: { r: string; g: string; b: string; a: string };
    contentWidth: number;
    font: string;
  };
  onImage: boolean;
  pos: { x: number; y: number };
}

class PostsQuery extends Query<getAllPosts, getAllPostsVariables> {}

class BoardContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hoverImgJson: {
        cards: [],
        color: { r: "", g: "", b: "", a: "" },
        contentWidth: 600,
        font: ""
      },
      onImage: false,
      pos: { x: 0, y: 0 }
    };
  }

  public getPos = (e: MouseEvent): void => {
    const pos = { x: e.pageX, y: e.pageY - 100 };
    this.setState({ pos });
  };

  public handleOnMouseOver = (post: any, onImage: boolean) => {
    this.setState({
      hoverImgJson:
        post.category.wikiImages[0] !== undefined
          ? post.category.wikiImages[0].hoverImage
          : null,
      onImage: true
    });
  };

  public handleonMouseOut = (onImage: boolean) => {
    this.setState({
      onImage: false
    });
  };

  public render() {
    const { pos, hoverImgJson, onImage } = this.state;
    return (
      <PostsQuery query={POSTS} variables={{ limit: 20 }}>
        {({ loading, data, error }) => {
          return (
            <BoardPresenter
              data={data}
              loading={loading}
              hoverImgJson={hoverImgJson}
              onImage={onImage}
              pos={pos}
              getPos={this.getPos}
              handleOnMouseOver={this.handleOnMouseOver}
              handleonMouseOut={this.handleonMouseOut}
            />
          );
        }}
      </PostsQuery>
    );
  }
}

export default BoardContainer;
