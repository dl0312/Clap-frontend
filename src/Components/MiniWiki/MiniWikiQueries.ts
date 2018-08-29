import { gql } from "apollo-boost";

export const CATEGORIES_KEYWORD = gql`
  query GetCategoriesByKeyword($keyword: String!) {
    GetCategoriesByKeyword(keyword: $keyword) {
      ok
      error
      categories {
        id
        name
        parent {
          id
          name
        }
        wikiImages {
          id
          shownImage {
            id
            url
          }
          hoverImage
          clapsCount
          postsCount
        }
      }
    }
  }
`;
