import { gql } from "apollo-boost";

export const SIMPLE_CATEGORY = gql`
  query getCategoryById($categoryId: Int!) {
    GetCategoryById(categoryId: $categoryId) {
      ok
      error
      category {
        id
        name
      }
    }
  }
`;
