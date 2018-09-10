import * as React from "react";
import Slide from "../../Components/Slide";
import FeaturedCards from "../../Components/FeaturedCards";
import { Query } from "react-apollo";
import { POSTS } from "../../sharedQueries";
import { getAllPosts, getAllPostsVariables } from "../../types/api";
import styled from "styled-components";

const HomeContainer = styled.div`
  margin-top: -70px;
`;

const FeaturedContainer = styled.div``;

class PostsQuery extends Query<getAllPosts, getAllPostsVariables> {}

class Home extends React.Component {
  public render() {
    return (
      <HomeContainer>
        <Slide />
        <FeaturedContainer>
          <PostsQuery query={POSTS} variables={{ limit: 20 }}>
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
              const posts = data.GetAllPosts.posts;
              if (posts) {
                return (
                  <React.Fragment>
                    <FeaturedCards posts={posts} type="새로운 공략" />
                    <FeaturedCards posts={posts} type="새로운 공략" />
                    <FeaturedCards posts={posts} type="새로운 공략" />
                    <FeaturedCards posts={posts} type="새로운 공략" />
                    <FeaturedCards posts={posts} type="새로운 공략" />
                  </React.Fragment>
                );
              } else {
                return null;
              }
            }}
          </PostsQuery>
        </FeaturedContainer>
      </HomeContainer>
    );
  }
}

export default Home;
