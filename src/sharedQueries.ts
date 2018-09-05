import gql from "graphql-tag";

export const POST = gql`
  query getPostById($postId: Int!) {
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
      isClapped
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($title: String!, $categoryId: Int!, $body: String!) {
    AddPost(title: $title, categoryId: $categoryId, body: $body) {
      ok
      error
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost(
    $postId: Int!
    $title: String
    $categoryId: Int
    $body: String
  ) {
    EditPost(
      postId: $postId
      title: $title
      categoryId: $categoryId
      body: $body
    ) {
      ok
      error
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: Int!) {
    DeletePost(postId: $postId) {
      ok
      error
    }
  }
`;

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

export const ADD_COMMENT = gql`
  mutation addComment(
    $postId: Int!
    $parentCommentId: Int
    $body: String!
    $level: Int!
  ) {
    AddComment(
      postId: $postId
      parentCommentId: $parentCommentId
      body: $body
      level: $level
    ) {
      ok
      error
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation editComment($commentId: Int!, $body: String!) {
    EditComment(commentId: $commentId, body: $body) {
      ok
      error
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: Int!) {
    DeleteComment(commentId: $commentId) {
      ok
      error
    }
  }
`;

export const CATEGORIES_KEYWORD = gql`
  query getCategoriesByKeyword($keyword: String!) {
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

export const CATEGORY = gql`
  query getCategoryById($categoryId: Int!) {
    GetCategoryById(categoryId: $categoryId) {
      ok
      error
      category {
        id
        name
        wikiImages {
          shownImage {
            url
          }
          hoverImage
        }
        parent {
          name
          id
        }
        children {
          name
          id
        }
      }
    }
  }
`;

export const SIMPLE_CATEGORY = gql`
  query GetCategoryById($categoryId: Int!) {
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

export const CATEGORIES_IDS = gql`
  query getCategoriesByIds($categoriesIds: [Int]) {
    GetCategoriesByIds(categoriesIds: $categoriesIds) {
      ok
      error
      categories {
        id
        name
        wikiImages {
          shownImage {
            url
          }
          hoverImage
        }
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!, $parentIds: [Int], $childrenIds: [Int]) {
    AddCategory(name: $name, parentIds: $parentIds, childrenIds: $childrenIds) {
      ok
      error
      categoryId
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation editCategory(
    $categoryId: Int!
    $parentIds: [Int]
    $childrenIds: [Int]
    $name: String!
  ) {
    EditCategory(
      categoryId: $categoryId
      parentIds: $parentIds
      childrenIds: $childrenIds
      name: $name
    ) {
      ok
      error
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($categoryId: Int!) {
    DeleteCategory(categoryId: $categoryId) {
      ok
      error
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation emailSignIn($email: String!, $password: String!) {
    EmailSignIn(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

export const ADD_WIKIIMAGE = gql`
  mutation addWikiImage(
    $categoryId: Int!
    $name: String
    $shownImageId: Int!
    $hoverImage: String!
  ) {
    AddWikiImage(
      categoryId: $categoryId
      name: $name
      shownImageId: $shownImageId
      hoverImage: $hoverImage
    ) {
      ok
      error
      wikiImageId
    }
  }
`;

export const EDIT_WIKIIMAGE = gql`
  mutation editWikiImage(
    $wikiImageId: Int!
    $categoryId: Int
    $name: String
    $shownImageId: Int!
    $hoverImage: String!
  ) {
    EditWikiImage(
      wikiImageId: $wikiImageId
      categoryId: $categoryId
      name: $name
      shownImageId: $shownImageId
      hoverImage: $hoverImage
    ) {
      ok
      error
    }
  }
`;

export const DELETE_WIKIIMAGE = gql`
  mutation deleteWikiImage($wikiImageId: Int!) {
    DeleteWikiImage(wikiImageId: $wikiImageId) {
      ok
      error
    }
  }
`;

export const WIKIIMAGE = gql`
  query getWikiImageById($wikiImageId: Int!) {
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

// export const CLAP_TO_WIKIIMAGE = gql``;

export const SEND_CLAP = gql`
  mutation sendClap($postId: Int!) {
    SendClap(postId: $postId) {
      ok
      error
    }
  }
`;

export const UPLOAD_SHOWNIMAGE = gql`
  mutation uploadShownImage($file: Upload!) {
    UploadShownImage(file: $file) {
      ok
      error
      shownImage {
        id
        url
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation emailSignUp(
    $nickName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
  ) {
    EmailSignUp(
      nickName: $nickName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
    ) {
      ok
      error
    }
  }
`;

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;

// export const LOG_USER_IN = gql`
//   mutation logUserIn($token: String!) {
//     logUserIn(token: $token) @client
//   }
// `;

// export const LOG_USER_OUT = gql`
//   mutation logUserOut {
//     logUserOut @client
//   }
// `;
