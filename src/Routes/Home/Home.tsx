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
import { Helmet } from "react-helmet";

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
        <Helmet>
          <title>CLAP</title>
        </Helmet>
        <Slide />
        <FeaturedContainer>
          <PostsQuery
            query={POSTS}
            fetchPolicy={"cache-and-network"}
            variables={{ limit: 25, type: "createdAt" }}
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
                    <FeaturedPostCards posts={posts} type="New Guides" />
                  </React.Fragment>
                );
              } else {
                return null;
              }
            }}
          </PostsQuery>
          <PostsQuery
            query={POSTS}
            fetchPolicy={"cache-and-network"}
            variables={{ limit: 25, type: "updatedAt" }}
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
                    <FeaturedPostCards posts={posts} type="Updated Guides" />
                  </React.Fragment>
                );
              } else {
                return null;
              }
            }}
          </PostsQuery>
          <WikiImagesQuery
            query={WIKIIMAGES}
            fetchPolicy={"cache-and-network"}
            variables={{ limit: 25, type: "createdAt" }}
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
                    type="New Wiki Images"
                  />
                );
              } else {
                return null;
              }
            }}
          </WikiImagesQuery>
          <WikiImagesQuery
            query={WIKIIMAGES}
            fetchPolicy={"cache-and-network"}
            variables={{ limit: 25, type: "createdAt" }}
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
                    type="Updated Wiki Images"
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
