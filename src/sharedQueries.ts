import gql from "graphql-tag";

export const POST = gql`
  query getPostById($postId: Int!) {
    GetPostById(postId: $postId) {
      ok
      error
      post {
        id
        title
        titleImg
        titleImgPos
        body
        category {
          id
          name
          parent {
            id
            name
          }
          topWikiImage {
            id
            name
            shownImage
            hoverImage
          }
        }
        view
        user {
          id
          nickName
          profilePhoto
        }
        clapsCount
        commentsCount
        comments {
          id
          user {
            id
            nickName
            profilePhoto
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
      isMine
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $title: String!
    $titleImg: String
    $titleImgPos: Float
    $categoryId: Int!
    $body: String!
  ) {
    AddPost(
      title: $title
      titleImg: $titleImg
      titleImgPos: $titleImgPos
      categoryId: $categoryId
      body: $body
    ) {
      ok
      error
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost(
    $postId: Int!
    $title: String
    $titleImg: String
    $titleImgPos: Float
    $categoryId: Int
    $body: String
  ) {
    EditPost(
      postId: $postId
      title: $title
      titleImg: $titleImg
      titleImgPos: $titleImgPos
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

export const POSTS_CATEGORY = gql`
  query getPostsByCategoryId($categoryId: Int!) {
    GetPostsByCategoryId(categoryId: $categoryId) {
      ok
      error
      posts {
        id
        title
        user {
          id
          profilePhoto
          nickName
        }
        category {
          id
          name
          parent {
            name
          }
          wikiImages {
            shownImage
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

export const POSTS = gql`
  query getAllPosts($limit: Int!, $type: String!) {
    GetAllPosts(limit: $limit, type: $type) {
      ok
      error
      posts {
        id
        title
        titleImg
        titleImgPos
        user {
          id
          nickName
          profilePhoto
        }
        category {
          id
          name
          parent {
            id
            name
          }
          topWikiImage {
            id
            shownImage
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

export const WIKIIMAGES = gql`
  query getWikiImages($limit: Int!, $type: String!) {
    GetWikiImages(limit: $limit, type: $type) {
      ok
      error
      wikiImages {
        id
        user {
          id
          nickName
          profilePhoto
        }
        category {
          id
          name
          parent {
            id
            name
          }
        }
        shownImage
        hoverImage
        postsCount
        clapsCount
        createdAt
        updatedAt
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
        topWikiImage {
          id
          shownImage
          hoverImage
        }
        wikiImages {
          id
          shownImage
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
        topWikiImage {
          id
          shownImage
          hoverImage
        }
        wikiImages {
          id
          shownImage
          hoverImage
        }
        parent {
          id
          name
        }
        children {
          id
          name
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
          shownImage
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
    $shownImage: String!
    $hoverImage: String!
  ) {
    AddWikiImage(
      categoryId: $categoryId
      name: $name
      shownImage: $shownImage
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
    $shownImage: String
    $hoverImage: String
  ) {
    EditWikiImage(
      wikiImageId: $wikiImageId
      categoryId: $categoryId
      name: $name
      shownImage: $shownImage
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
        shownImage
        hoverImage
        category {
          id
          name
        }
        user {
          id
          nickName
          profilePhoto
        }
        clapsCount
        postsCount
      }
      isClapped
      isMine
    }
  }
`;

// export const CLAP_TO_WIKIIMAGE = gql``;

export const SEND_CLAP = gql`
  mutation sendClap($postId: Int, $wikiImageId: Int) {
    SendClap(postId: $postId, wikiImageId: $wikiImageId) {
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
  ) {
    EmailSignUp(nickName: $nickName, email: $email, password: $password) {
      ok
      error
    }
  }
`;

export const PROFILE = gql`
  query getMyProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        email
        fullName
        nickName
        age
        gender
        password
        profilePhoto
        following {
          fullName
          nickName
          profilePhoto
        }
        followers {
          fullName
          nickName
          profilePhoto
        }
      }
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation updateMyProfile(
    $email: String
    $firstName: String
    $lastName: String
    $nickName: String
    $age: Int
    $password: String
    $profilePhoto: String
  ) {
    UpdateMyProfile(
      email: $email
      firstName: $firstName
      lastName: $lastName
      nickName: $nickName
      age: $age
      password: $password
      profilePhoto: $profilePhoto
    ) {
      ok
      error
    }
  }
`;

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $firstName: String!
    $lastName: String!
    $nickName: String!
    $email: String
    $fbId: String!
  ) {
    FacebookConnect(
      firstName: $firstName
      lastName: $lastName
      nickName: $nickName
      email: $email
      fbId: $fbId
    ) {
      ok
      error
      token
    }
  }
`;

export const GOOGLE_CONNECT = gql`
  mutation googleConnect(
    $firstName: String!
    $lastName: String!
    $nickName: String!
    $email: String
    $profilePhoto: String
    $googleId: String!
  ) {
    GoogleConnect(
      firstName: $firstName
      lastName: $lastName
      nickName: $nickName
      email: $email
      profilePhoto: $profilePhoto
      googleId: $googleId
    ) {
      ok
      error
      token
    }
  }
`;

export const NICKNAME_OVERLAP = gql`
  query nickNameOverlap($nickName: String!) {
    NickNameOverlap(nickName: $nickName) {
      ok
      error
    }
  }
`;

export const EMAIL_OVERLAP = gql`
  query emailOverlap($email: String!) {
    EmailOverlap(email: $email) {
      ok
      error
    }
  }
`;
