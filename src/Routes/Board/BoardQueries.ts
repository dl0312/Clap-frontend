import { gql } from 'apollo-boost';

export const POSTS = gql`
  query getAllPosts($limit: Int!) {
    GetAllPosts(limit: $limit) {
      ok
      error
      posts {
        id
        title
        user {
          id
          nickName
        }
        category {
          id
          name
          wikiImages {
            id
            shownImage {
              id
              url
            }
            hoverImage
          }
        }
        commentsCount
        clapsCount
        view
        createdAt
      }
    }
  }
`;
