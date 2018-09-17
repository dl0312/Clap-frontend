import * as React from "react";
import Slide from "../../Components/Slide";
import FeaturedPostCards from "../../Components/FeaturedPostCards";
import FeaturedImageCards from "../../Components/FeaturedImageCards";
import { Query } from "react-apollo";
import { POSTS, WIKIIMAGES } from "../../sharedQueries";
import {
  getAllPosts,
  getAllPostsVariables,
  getWikiImages,
  getWikiImagesVariables
} from "../../types/api";
import styled from "styled-components";

const HomeContainer = styled.div`
  margin-top: -70px;
`;

const FeaturedContainer = styled.div`
  margin-bottom: 200px;
`;

class PostsQuery extends Query<getAllPosts, getAllPostsVariables> {}
class WikiImagesQuery extends Query<getWikiImages, getWikiImagesVariables> {}

class Home extends React.Component {
  public render() {
    return (
      <HomeContainer>
        <Slide />
        <FeaturedContainer>
          <PostsQuery
            query={POSTS}
            variables={{ limit: 20, type: "createdAt" }}
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
              const posts = data.GetAllPosts.posts;
              if (posts) {
                return (
                  <React.Fragment>
                    <FeaturedPostCards posts={posts} type="새로운 공략" />
                  </React.Fragment>
                );
              } else {
                return null;
              }
            }}
          </PostsQuery>
          <PostsQuery
            query={POSTS}
            variables={{ limit: 20, type: "updatedAt" }}
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
              const posts = data.GetAllPosts.posts;
              if (posts) {
                return (
                  <React.Fragment>
                    <FeaturedPostCards posts={posts} type="업데이트 공략" />
                  </React.Fragment>
                );
              } else {
                return null;
              }
            }}
          </PostsQuery>
          <WikiImagesQuery
            query={WIKIIMAGES}
            variables={{ limit: 20, type: "createdAt" }}
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
              const wikiImages = data.GetWikiImages.wikiImages;
              if (wikiImages) {
                return (
                  <FeaturedImageCards
                    images={wikiImages}
                    type="새로운 위키 이미지"
                  />
                );
              } else {
                return null;
              }
            }}
          </WikiImagesQuery>
          <WikiImagesQuery
            query={WIKIIMAGES}
            variables={{ limit: 20, type: "createdAt" }}
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
              const wikiImages = data.GetWikiImages.wikiImages;
              if (wikiImages) {
                return (
                  <FeaturedImageCards
                    images={wikiImages}
                    type="업데이트 위키 이미지"
                  />
                );
              } else {
                return null;
              }
            }}
          </WikiImagesQuery>
        </FeaturedContainer>
      </HomeContainer>
    );
  }
}

export default Home;
