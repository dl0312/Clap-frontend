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

export interface getCategoriesByKeyword_GetCategoriesByKeyword_categories_wikiImages_shownImage {
  __typename: "ShownImage";
  id: number;
  url: string;
}

export interface getCategoriesByKeyword_GetCategoriesByKeyword_categories_wikiImages {
  __typename: "WikiImage";
  id: number;
  shownImage: getCategoriesByKeyword_GetCategoriesByKeyword_categories_wikiImages_shownImage | null;
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

export interface getCategoryById_GetCategoryById_category {
  __typename: "Category";
  id: number;
  name: string;
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
  categoryId: number;
  body: string;
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
}

export interface getAllPosts_GetAllPosts_posts_category_wikiImages_shownImage {
  __typename: "ShownImage";
  id: number;
  url: string;
}

export interface getAllPosts_GetAllPosts_posts_category_wikiImages {
  __typename: "WikiImage";
  id: number;
  shownImage: getAllPosts_GetAllPosts_posts_category_wikiImages_shownImage | null;
  hoverImage: string;
}

export interface getAllPosts_GetAllPosts_posts_category {
  __typename: "Category";
  id: number;
  name: string;
  wikiImages: (getAllPosts_GetAllPosts_posts_category_wikiImages | null)[] | null;
}

export interface getAllPosts_GetAllPosts_posts {
  __typename: "Post";
  id: number;
  title: string;
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
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
