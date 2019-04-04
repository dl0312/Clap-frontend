import React from "react";
import { Query } from "react-apollo";
import { POSTS_CATEGORY } from "../../sharedQueries";
import PostCards from "../../Components/PostCards";
// import styled from "styled-components";

interface IProps {
  history: any;
  match: { params: { categoryId: number } };
}

interface IState {
  keyword: string;
}

class SearchResult extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      keyword: ""
    };
  }
  public render() {
    console.log(this.props);
    return (
      <Query
        query={POSTS_CATEGORY}
        variables={{ categoryId: this.props.match.params.categoryId }}
      >
        {({ loading, data, error }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>{error.message}</div>;
          }
          if (data === undefined) {
            return <div>data undefined</div>;
          }
          console.log(data);
          const { posts } = data.GetPostsByCategoryId;
          if (posts) {
            return (
              <React.Fragment>
                <PostCards posts={posts} />
              </React.Fragment>
            );
          } else {
            console.log("error");
            return null;
          }
        }}
      </Query>
    );
    // return <div>{this.props.match.params.keyword}</div>;
  }
}

export default SearchResult;
