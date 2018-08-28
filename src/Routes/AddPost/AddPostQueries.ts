import { gql } from "apollo-boost";

export const ADD_POST = gql`
  mutation addPost($title: String!, $categoryId: Int!, $body: String!) {
    AddPost(title: $title, categoryId: $categoryId, body: $body) {
      ok
      error
    }
  }
`;
