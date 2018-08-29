import { gql } from "apollo-boost";

export const POST = gql`
  query GetPostById($postId: Int!) {
    GetPostById(postId: $postId) {
      ok
      error
      post {
        id
        title
        body
        category {
          id
          name
          parent {
            name
          }
          wikiImages {
            id
            name
            shownImage {
              id
              url
            }
            hoverImage
          }
        }
        view
        user {
          id
          nickName
        }
        clapsCount
        commentsCount
        comments {
          id
          user {
            id
            nickName
          }
          childrenComments {
            id
            body
            level
            childrenComments {
              id
              body
              level
              childrenComments {
                id
                body
                level
                childrenComments {
                  id
                  body
                  level
                }
              }
            }
          }
          body
          level
          createdAt
        }
        createdAt
      }
    }
  }
`;

export const WIKIIMAGE = gql`
  query GetWikiImageById($wikiImageId: Int!) {
    GetWikiImageById(wikiImageId: $wikiImageId) {
      ok
      error
      wikiImage {
        id
        name
        shownImage {
          id
          url
        }
        hoverImage
      }
    }
  }
`;
