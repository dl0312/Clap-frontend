/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPostById
// ====================================================

export interface getPostById_GetPostById_post_category_parent {
  __typename: "Category";
  id: number;
  name: string;
}

export interface getPostById_GetPostById_post_category_topWikiImage {
  __typename: "WikiImage";
  id: number;
  name: string | null;
  shownImage: string;
  hoverImage: string;
}

export interface getPostById_GetPostById_post_category {
  __typename: "Category";
  id: number;
  name: string;
  parent: (getPostById_GetPostById_post_category_parent | null)[] | null;
  topWikiImage: getPostById_GetPostById_post_category_topWikiImage | null;
}

export interface getPostById_GetPostById_post_user {
  __typename: "User";
  id: number;
  nickName: string;
  profilePhoto: string | null;
}

export interface getPostById_GetPostById_post_comments_user {
  __typename: "User";
  id: number;
  nickName: string;
  profilePhoto: string | null;
}

export interface getPostById_GetPostById_post_comments_childrenComments_childrenComments_childrenComments_childrenComments {
  __typename: "Comment";
  id: number;
  body: string;
  level: number;
}

export interface getPostById_GetPostById_post_comments_childrenComments_childrenComments_childrenComments {
  __typename: "Comment";
  id: number;
  body: string;
  level: number;
  childrenComments: (getPostById_GetPostById_post_comments_childrenComments_childrenComments_childrenComments_childrenComments | null)[] | null;
}

export interface getPostById_GetPostById_post_comments_childrenComments_childrenComments {
  __typename: "Comment";
  id: number;
  body: string;
  level: number;
  childrenComments: (getPostById_GetPostById_post_comments_childrenComments_childrenComments_childrenComments | null)[] | null;
}

export interface getPostById_GetPostById_post_comments_childrenComments {
  __typename: "Comment";
  id: number;
  body: string;
  level: number;
  childrenComments: (getPostById_GetPostById_post_comments_childrenComments_childrenComments | null)[] | null;
}

export interface getPostById_GetPostById_post_comments {
  __typename: "Comment";
  id: number;
  user: getPostById_GetPostById_post_comments_user;
  childrenComments: (getPostById_GetPostById_post_comments_childrenComments | null)[] | null;
  body: string;
  level: number;
  createdAt: string;
}

export interface getPostById_GetPostById_post {
  __typename: "Post";
  id: number;
  title: string;
  titleImg: string | null;
  titleImgPos: number | null;
  body: string | null;
  category: getPostById_GetPostById_post_category | null;
  view: number;
  user: getPostById_GetPostById_post_user;
  clapsCount: number | null;
  commentsCount: number | null;
  comments: (getPostById_GetPostById_post_comments | null)[] | null;
  createdAt: string;
}

export interface getPostById_GetPostById {
  __typename: "GetPostByIdResponse";
  ok: boolean;
  error: string | null;
  post: getPostById_GetPostById_post | null;
  isClapped: boolean | null;
  isMine: boolean | null;
}

export interface getPostById {
  GetPostById: getPostById_GetPostById;
}

export interface getPostByIdVariables {
  postId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPost
// ====================================================

export interface addPost_AddPost {
  __typename: "AddPostResponse";
  ok: boolean;
  error: string | null;
}

export interface addPost {
  AddPost: addPost_AddPost;
}

export interface addPostVariables {
  title: string;
  titleImg?: string | null;
  titleImgPos?: number | null;
  categoryId: number;
  body: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editPost
// ====================================================

export interface editPost_EditPost {
  __typename: "EditPostResponse";
  ok: boolean;
  error: string | null;
}

export interface editPost {
  EditPost: editPost_EditPost;
}

export interface editPostVariables {
  postId: number;
  title?: string | null;
  titleImg?: string | null;
  titleImgPos?: number | null;
  categoryId?: number | null;
  body?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deletePost
// ====================================================

export interface deletePost_DeletePost {
  __typename: "DeletePostResponse";
  ok: boolean;
  error: string | null;
}

export interface deletePost {
  DeletePost: deletePost_DeletePost;
}

export interface deletePostVariables {
  postId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPostsByCategoryId
// ====================================================

export interface getPostsByCategoryId_GetPostsByCategoryId_posts_user {
  __typename: "User";
  id: number;
  profilePhoto: string | null;
  nickName: string;
}

export interface getPostsByCategoryId_GetPostsByCategoryId_posts_category_parent {
  __typename: "Category";
  name: string;
}

export interface getPostsByCategoryId_GetPostsByCategoryId_posts_category_wikiImages {
  __typename: "WikiImage";
  shownImage: string;
}

export interface getPostsByCategoryId_GetPostsByCategoryId_posts_category {
  __typename: "Category";
  id: number;
  name: string;
  parent: (getPostsByCategoryId_GetPostsByCategoryId_posts_category_parent | null)[] | null;
  wikiImages: (getPostsByCategoryId_GetPostsByCategoryId_posts_category_wikiImages | null)[] | null;
}

export interface getPostsByCategoryId_GetPostsByCategoryId_posts {
  __typename: "Post";
  id: number;
  title: string;
  user: getPostsByCategoryId_GetPostsByCategoryId_posts_user;
  category: getPostsByCategoryId_GetPostsByCategoryId_posts_category | null;
  commentsCount: number | null;
  clapsCount: number | null;
  view: number;
  createdAt: string;
}

export interface getPostsByCategoryId_GetPostsByCategoryId {
  __typename: "GetPostsByCategoryIdResponse";
  ok: boolean;
  error: string | null;
  posts: (getPostsByCategoryId_GetPostsByCategoryId_posts | null)[] | null;
}

export interface getPostsByCategoryId {
  GetPostsByCategoryId: getPostsByCategoryId_GetPostsByCategoryId;
}

export interface getPostsByCategoryIdVariables {
  categoryId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllPosts
// ====================================================

export interface getAllPosts_GetAllPosts_posts_user {
  __typename: "User";
  id: number;
  nickName: string;
  profilePhoto: string | null;
}

export interface getAllPosts_GetAllPosts_posts_category_parent {
  __typename: "Category";
  name: string;
}

export interface getAllPosts_GetAllPosts_posts_category_topWikiImage {
  __typename: "WikiImage";
  id: number;
  shownImage: string;
  hoverImage: string;
}

export interface getAllPosts_GetAllPosts_posts_category {
  __typename: "Category";
  id: number;
  name: string;
  parent: (getAllPosts_GetAllPosts_posts_category_parent | null)[] | null;
  topWikiImage: getAllPosts_GetAllPosts_posts_category_topWikiImage | null;
}

export interface getAllPosts_GetAllPosts_posts {
  __typename: "Post";
  id: number;
  title: string;
  titleImg: string | null;
  titleImgPos: number | null;
  user: getAllPosts_GetAllPosts_posts_user;
  category: getAllPosts_GetAllPosts_posts_category | null;
  commentsCount: number | null;
  clapsCount: number | null;
  view: number;
  createdAt: string;
}

export interface getAllPosts_GetAllPosts {
  __typename: "GetAllPostsResponse";
  ok: boolean;
  error: string | null;
  posts: (getAllPosts_GetAllPosts_posts | null)[] | null;
}

export interface getAllPosts {
  GetAllPosts: getAllPosts_GetAllPosts;
}

export interface getAllPostsVariables {
  limit: number;
  type: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getWikiImages
// ====================================================

export interface getWikiImages_GetWikiImages_wikiImages_user {
  __typename: "User";
  id: number;
  nickName: string;
  profilePhoto: string | null;
}

export interface getWikiImages_GetWikiImages_wikiImages_category_parent {
  __typename: "Category";
  name: string;
}

export interface getWikiImages_GetWikiImages_wikiImages_category {
  __typename: "Category";
  id: number;
  name: string;
  parent: (getWikiImages_GetWikiImages_wikiImages_category_parent | null)[] | null;
}

export interface getWikiImages_GetWikiImages_wikiImages {
  __typename: "WikiImage";
  id: number;
  user: getWikiImages_GetWikiImages_wikiImages_user;
  category: getWikiImages_GetWikiImages_wikiImages_category;
  shownImage: string;
  hoverImage: string;
  postsCount: number;
  clapsCount: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface getWikiImages_GetWikiImages {
  __typename: "GetWikiImagesResponse";
  ok: boolean;
  error: string | null;
  wikiImages: (getWikiImages_GetWikiImages_wikiImages | null)[] | null;
}

export interface getWikiImages {
  GetWikiImages: getWikiImages_GetWikiImages;
}

export interface getWikiImagesVariables {
  limit: number;
  type: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addComment
// ====================================================

export interface addComment_AddComment {
  __typename: "AddCommentResponse";
  ok: boolean;
  error: string | null;
}

export interface addComment {
  AddComment: addComment_AddComment;
}

export interface addCommentVariables {
  postId: number;
  parentCommentId?: number | null;
  body: string;
  level: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editComment
// ====================================================

export interface editComment_EditComment {
  __typename: "EditCommentResponse";
  ok: boolean;
  error: string | null;
}

export interface editComment {
  EditComment: editComment_EditComment;
}

export interface editCommentVariables {
  commentId: number;
  body: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteComment
// ====================================================

export interface deleteComment_DeleteComment {
  __typename: "DeleteCommentResponse";
  ok: boolean | null;
  error: string | null;
}

export interface deleteComment {
  DeleteComment: deleteComment_DeleteComment;
}

export interface deleteCommentVariables {
  commentId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategoriesByKeyword
// ====================================================

export interface getCategoriesByKeyword_GetCategoriesByKeyword_categories_parent {
  __typename: "Category";
  id: number;
  name: string;
}

export interface getCategoriesByKeyword_GetCategoriesByKeyword_categories_wikiImages {
  __typename: "WikiImage";
  id: number;
  shownImage: string;
  hoverImage: string;
  clapsCount: number;
  postsCount: number;
}

export interface getCategoriesByKeyword_GetCategoriesByKeyword_categories {
  __typename: "Category";
  id: number;
  name: string;
  parent: (getCategoriesByKeyword_GetCategoriesByKeyword_categories_parent | null)[] | null;
  wikiImages: (getCategoriesByKeyword_GetCategoriesByKeyword_categories_wikiImages | null)[] | null;
}

export interface getCategoriesByKeyword_GetCategoriesByKeyword {
  __typename: "GetCategoriesByKeywordResponse";
  ok: boolean;
  error: string | null;
  categories: (getCategoriesByKeyword_GetCategoriesByKeyword_categories | null)[] | null;
}

export interface getCategoriesByKeyword {
  GetCategoriesByKeyword: getCategoriesByKeyword_GetCategoriesByKeyword;
}

export interface getCategoriesByKeywordVariables {
  keyword: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategoryById
// ====================================================

export interface getCategoryById_GetCategoryById_category_topWikiImage {
  __typename: "WikiImage";
  shownImage: string;
  hoverImage: string;
}

export interface getCategoryById_GetCategoryById_category_wikiImages {
  __typename: "WikiImage";
  shownImage: string;
  hoverImage: string;
}

export interface getCategoryById_GetCategoryById_category_parent {
  __typename: "Category";
  name: string;
  id: number;
}

export interface getCategoryById_GetCategoryById_category_children {
  __typename: "Category";
  name: string;
  id: number;
}

export interface getCategoryById_GetCategoryById_category {
  __typename: "Category";
  id: number;
  name: string;
  topWikiImage: getCategoryById_GetCategoryById_category_topWikiImage | null;
  wikiImages: (getCategoryById_GetCategoryById_category_wikiImages | null)[] | null;
  parent: (getCategoryById_GetCategoryById_category_parent | null)[] | null;
  children: (getCategoryById_GetCategoryById_category_children | null)[] | null;
}

export interface getCategoryById_GetCategoryById {
  __typename: "GetCategoryByIdResponse";
  ok: boolean;
  error: string | null;
  category: getCategoryById_GetCategoryById_category | null;
}

export interface getCategoryById {
  GetCategoryById: getCategoryById_GetCategoryById;
}

export interface getCategoryByIdVariables {
  categoryId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategoryById
// ====================================================

export interface GetCategoryById_GetCategoryById_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface GetCategoryById_GetCategoryById {
  __typename: "GetCategoryByIdResponse";
  ok: boolean;
  error: string | null;
  category: GetCategoryById_GetCategoryById_category | null;
}

export interface GetCategoryById {
  GetCategoryById: GetCategoryById_GetCategoryById;
}

export interface GetCategoryByIdVariables {
  categoryId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategoriesByIds
// ====================================================

export interface getCategoriesByIds_GetCategoriesByIds_categories_wikiImages {
  __typename: "WikiImage";
  shownImage: string;
  hoverImage: string;
}

export interface getCategoriesByIds_GetCategoriesByIds_categories {
  __typename: "Category";
  id: number;
  name: string;
  wikiImages: (getCategoriesByIds_GetCategoriesByIds_categories_wikiImages | null)[] | null;
}

export interface getCategoriesByIds_GetCategoriesByIds {
  __typename: "GetCategoriesByIdsResponse";
  ok: boolean;
  error: string | null;
  categories: (getCategoriesByIds_GetCategoriesByIds_categories | null)[] | null;
}

export interface getCategoriesByIds {
  GetCategoriesByIds: getCategoriesByIds_GetCategoriesByIds;
}

export interface getCategoriesByIdsVariables {
  categoriesIds?: (number | null)[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addCategory
// ====================================================

export interface addCategory_AddCategory {
  __typename: "AddCategoryResponse";
  ok: boolean;
  error: string | null;
  categoryId: number | null;
}

export interface addCategory {
  AddCategory: addCategory_AddCategory;
}

export interface addCategoryVariables {
  name: string;
  parentIds?: (number | null)[] | null;
  childrenIds?: (number | null)[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editCategory
// ====================================================

export interface editCategory_EditCategory {
  __typename: "EditCategoryResponse";
  ok: boolean;
  error: string | null;
}

export interface editCategory {
  EditCategory: editCategory_EditCategory;
}

export interface editCategoryVariables {
  categoryId: number;
  parentIds?: (number | null)[] | null;
  childrenIds?: (number | null)[] | null;
  name: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteCategory
// ====================================================

export interface deleteCategory_DeleteCategory {
  __typename: "DeleteCategoryResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteCategory {
  DeleteCategory: deleteCategory_DeleteCategory;
}

export interface deleteCategoryVariables {
  categoryId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignIn
// ====================================================

export interface emailSignIn_EmailSignIn {
  __typename: "EmailSignInResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface emailSignIn {
  EmailSignIn: emailSignIn_EmailSignIn;
}

export interface emailSignInVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addWikiImage
// ====================================================

export interface addWikiImage_AddWikiImage {
  __typename: "AddWikiImageResponse";
  ok: boolean | null;
  error: string | null;
  wikiImageId: number | null;
}

export interface addWikiImage {
  AddWikiImage: addWikiImage_AddWikiImage;
}

export interface addWikiImageVariables {
  categoryId: number;
  name?: string | null;
  shownImage: string;
  hoverImage: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editWikiImage
// ====================================================

export interface editWikiImage_EditWikiImage {
  __typename: "EditWikiImageResponse";
  ok: boolean | null;
  error: string | null;
}

export interface editWikiImage {
  EditWikiImage: editWikiImage_EditWikiImage;
}

export interface editWikiImageVariables {
  wikiImageId: number;
  categoryId?: number | null;
  name?: string | null;
  shownImage?: string | null;
  hoverImage?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteWikiImage
// ====================================================

export interface deleteWikiImage_DeleteWikiImage {
  __typename: "DeleteWikiImageResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteWikiImage {
  DeleteWikiImage: deleteWikiImage_DeleteWikiImage;
}

export interface deleteWikiImageVariables {
  wikiImageId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getWikiImageById
// ====================================================

export interface getWikiImageById_GetWikiImageById_wikiImage {
  __typename: "WikiImage";
  id: number;
  name: string | null;
  shownImage: string;
  hoverImage: string;
}

export interface getWikiImageById_GetWikiImageById {
  __typename: "GetWikiImageByIdResponse";
  ok: boolean;
  error: string | null;
  wikiImage: getWikiImageById_GetWikiImageById_wikiImage | null;
}

export interface getWikiImageById {
  GetWikiImageById: getWikiImageById_GetWikiImageById;
}

export interface getWikiImageByIdVariables {
  wikiImageId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendClap
// ====================================================

export interface sendClap_SendClap {
  __typename: "SendClapResponse";
  ok: boolean;
  error: string | null;
}

export interface sendClap {
  SendClap: sendClap_SendClap;
}

export interface sendClapVariables {
  postId?: number | null;
  wikiImageId?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadShownImage
// ====================================================

export interface uploadShownImage_UploadShownImage_shownImage {
  __typename: "ShownImage";
  id: number;
  url: string;
}

export interface uploadShownImage_UploadShownImage {
  __typename: "UploadShownImageResponse";
  ok: boolean;
  error: string | null;
  shownImage: uploadShownImage_UploadShownImage_shownImage | null;
}

export interface uploadShownImage {
  UploadShownImage: uploadShownImage_UploadShownImage;
}

export interface uploadShownImageVariables {
  file: any;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignUp
// ====================================================

export interface emailSignUp_EmailSignUp {
  __typename: "EmailSignUpResponse";
  ok: boolean;
  error: string | null;
}

export interface emailSignUp {
  EmailSignUp: emailSignUp_EmailSignUp;
}

export interface emailSignUpVariables {
  nickName: string;
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyProfile
// ====================================================

export interface getMyProfile_GetMyProfile_user_following {
  __typename: "User";
  fullName: string | null;
  nickName: string;
  profilePhoto: string | null;
}

export interface getMyProfile_GetMyProfile_user_followers {
  __typename: "User";
  fullName: string | null;
  nickName: string;
  profilePhoto: string | null;
}

export interface getMyProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  email: string | null;
  fullName: string | null;
  nickName: string;
  age: number | null;
  gender: string | null;
  password: string | null;
  profilePhoto: string | null;
  following: (getMyProfile_GetMyProfile_user_following | null)[] | null;
  followers: (getMyProfile_GetMyProfile_user_followers | null)[] | null;
}

export interface getMyProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: getMyProfile_GetMyProfile_user | null;
}

export interface getMyProfile {
  GetMyProfile: getMyProfile_GetMyProfile;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateMyProfile
// ====================================================

export interface updateMyProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateMyProfile {
  UpdateMyProfile: updateMyProfile_UpdateMyProfile;
}

export interface updateMyProfileVariables {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  nickName?: string | null;
  age?: number | null;
  password?: string | null;
  profilePhoto?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: facebookConnect
// ====================================================

export interface facebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface facebookConnect {
  FacebookConnect: facebookConnect_FacebookConnect;
}

export interface facebookConnectVariables {
  firstName: string;
  lastName: string;
  nickName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: googleConnect
// ====================================================

export interface googleConnect_GoogleConnect {
  __typename: "GoogleConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface googleConnect {
  GoogleConnect: googleConnect_GoogleConnect;
}

export interface googleConnectVariables {
  firstName: string;
  lastName: string;
  nickName: string;
  email?: string | null;
  profilePhoto?: string | null;
  googleId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: nickNameOverlap
// ====================================================

export interface nickNameOverlap_NickNameOverlap {
  __typename: "NickNameOverlapResponse";
  ok: boolean;
  error: string | null;
}

export interface nickNameOverlap {
  NickNameOverlap: nickNameOverlap_NickNameOverlap;
}

export interface nickNameOverlapVariables {
  nickName: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: emailOverlap
// ====================================================

export interface emailOverlap_EmailOverlap {
  __typename: "EmailOverlapResponse";
  ok: boolean;
  error: string | null;
}

export interface emailOverlap {
  EmailOverlap: emailOverlap_EmailOverlap;
}

export interface emailOverlapVariables {
  email: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
