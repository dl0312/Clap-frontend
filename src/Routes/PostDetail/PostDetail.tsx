import * as React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import {
  POST,
  DELETE_POST,
  ADD_COMMENT,
  SEND_CLAP,
  DELETE_COMMENT,
  POSTS
} from "../../sharedQueries";
import UserView from "../../Components/UserView";
import {
  getPostById,
  getPostByIdVariables,
  deletePost,
  deletePostVariables,
  addComment,
  addCommentVariables,
  // editComment,
  // editCommentVariables,
  deleteComment,
  deleteCommentVariables
} from "../../types/api";
import { toast } from "react-toastify";
import { formatDate } from "../../Utility/FormatDate";
import { LOST_IMAGE_URL } from "../../constants";
import Loading from "src/Components/Loading";
import CategoryTag from "src/Components/CategoryTag";

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const PostContainer = styled.div`
  width: 960px;
`;

interface ITitleContainerProps {
  src: string;
}

const TitleContainer = styled<ITitleContainerProps, any>("div")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 40px;
  border: 1px solid black;
  background-color: black;
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url("${props => props.src}");
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-size: 60%;
  background-position: right center;
      background-repeat: no-repeat;

  color: white;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bolder;
  /* width: 100%; */
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  margin: 10px 0px;
`;

const TitleInnerContainer = styled.div`
  display: flex;
  /* align-items: center;
  justify-content: center; */
  flex-direction: column;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-left: 4px;
`;

const CountContainer = styled.div`
  margin: 5px 0;
  margin-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
`;

const CountItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const CountText = styled.div`
  /* width: 100%; */
  text-shadow: 0 3px 5px rgba(0, 0, 0, 1);
`;

const CountIcon = styled.i`
  margin-right: 5px;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 1);
`;

interface IUserImgProps {
  url: string;
}

const UserImg = styled<IUserImgProps, any>("div")`
  width: 25px;
  height: 25px;
  overflow: hidden;
  border-radius: 100%;
  background-image: url(${props => `${props.url}`});
  background-size: auto 100%;
  background-position: 50% 50%;

  margin-left: 5px;
`;

const UserContainer = styled.span`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const UserNickName = styled.div`
  margin-left: 5px;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 1);
`;

const BodyContainer = styled.div`
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #222;
`;

const CommentsListContainer = styled.table`
  width: 100%;
  border-top: 4px solid white;
  border-bottom: 0.5px solid white;
  margin: 10px 0;
  background-color: white;
`;

const CommentUserTable = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: bolder;
  display: table-cell;
  vertical-align: inherit;
`;

interface IUserProfilePhotoProps {
  url: string;
}

const UserProfilePhoto = styled<IUserProfilePhotoProps, any>("div")`
  width: 15px;
  height: 15px;
  overflow: hidden;
  position: relative;
  transition: filter 0.5s ease;
  margin-right: 5px;
  background-image: url(${props => `${props.url}`});
  background-size: auto 100%;
  background-position: 50% 50%;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
`;

const UserViewContainer = styled.div`
  border: 2px solid #444;
  outline: 0.5px solid rgba(255, 255, 255, 0.5);
`;

interface ICommentUserProps {
  hasIcon: boolean;
}

const CommentUser = styled<ICommentUserProps, any>("div")`
  position: relative;
  display: flex;
  align-self: center;
  padding: 5px 0;
  margin-left: ${props => (props.hasIcon ? "-18px" : null)};
`;

interface ICommentBodyContainerProps {
  level: number;
}

const CommentBodyContainer = styled<ICommentBodyContainerProps, any>("td")`
  min-width: 300px;
  width: 100%;
  padding: 10px 20px;
  padding-left: ${props =>
    props.level > 1 ? `${(props.level - 2) * 15 + 50}px` : null};
  display: table-cell;
  vertical-align: inherit;
  line-height: 18px;
`;

const CommentBody = styled.span`
  font-size: 12px;
`;

const ReplyContainer = styled.button`
  display: inline-flex;
  border: none;
  background-color: transparent;
  color: #8ccaff;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  /* transition: opacity 0.5s ease; */
  cursor: pointer;
  margin-left: 5px;
  margin-right: -3px;
  transform: translateY(-0.5px);
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: none;
  }
`;

const ReplyIcon = styled.i`
  font-size: 10px;
`;

const ReplyText = styled.div`
  font-size: 12px;
  margin-left: 5px;
`;

const RereplyContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 50px;
  color: black;
`;

const RereplyInput = styled.textarea`
  /* width: 100%; */
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  vertical-align: top;
  resize: vertical;
  padding: 10px;
`;

const RereplyButton = styled.button`
  height: 100%;
  width: 85px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-weight: bolder;
  background-color: #9980fa;
  border: none;
`;

const CommentInfo = styled.td`
  position: relative;
  padding: 0 15px;
  display: table-cell;
  vertical-align: inherit;
  background-color: #222;
  border-left: 0.5px solid gray;
`;

const CommentDate = styled.div`
  margin-top: 10px;
  width: 80px;
  text-align: center;
  position: relative;
  float: right;
`;

const CommentContainer = styled.tr`
  display: flex;
  width: 100%;
  align-items: center;
  min-height: 60px;
  border-bottom: 0.5px solid gray;
  display: table-row;
  vertical-align: inherit;
  background-color: #333;
`;

const CommentInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 80px;
`;

const ReCommentIcon = styled.i`
  margin-right: 5px;
  transform: rotate(180deg) translateX(9px) translateY(4px);
`;

const CommentInput = styled.textarea`
  /* width: 100%; */
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  vertical-align: top;
  resize: none;
  padding: 10px;
  color: black;
`;

const CommentButton = styled.button`
  height: 100%;
  width: 85px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-weight: bolder;
  background-color: #9980fa;
  border: none;
`;

const EditCommentButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: LawnGreen;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const DeleteCommentButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: Tomato;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const ClapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const PostButton = styled.div`
  padding: 5px 10px;
  margin: 5px;
  width: 60px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  background-color: white;
  color: black;
`;

// const ClapButton = styled.div`
//   /* height: 60px; */
//   margin: 5px;
//   border: 0.5px solid rgba(0, 0, 0, 0.3);
//   box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
// `;

const ClapImageContainer = styled.div`
  margin-top: 15px;
  border: 1px solid white;
  background-color: white
  border-radius: 4px;
`;

interface IClapImageProps {
  isClapped: boolean;
}

const ClapImage = styled<IClapImageProps, any>("div")`
  margin: 10px 20px 5px 20px;
  font-size: 20px;
  cursor: pointer;
  opacity: ${props => (props.isClapped ? "1" : "0.5")};
  transition: opacity 0.5s ease;
  &:hover {
    opacity: 0.75;
  }
`;

const ClapCount = styled.div`
  text-align: center;
  margin: 3px;
  border-radius: 3px;
  background-color: #999;
  color: white;
`;

class PostQuery extends Query<getPostById, getPostByIdVariables> {}
class DeletePostQuery extends Mutation<deletePost, deletePostVariables> {}
class AddCommentQuery extends Mutation<addComment, addCommentVariables> {}
// class EditCommentQuery extends Mutation<editComment, editCommentVariables> {}
class DeleteCommentQuery extends Mutation<
  deleteComment,
  deleteCommentVariables
> {}

interface IProps {
  match: { params: { postId: number } };
  history: any;
}

interface IState {
  pos: { x: number; y: number };
  hoverImgJson: string;
  onImage: boolean;
  commentBody: string;
  reCommentBody: string;
  parentCommentId: number | null;
}

class PostDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      pos: { x: 0, y: 0 },
      hoverImgJson: "",
      onImage: false,
      commentBody: "",
      reCommentBody: "",
      parentCommentId: null
    };
  }

  public sendClapConfirm = (data: any) => {
    const { SendClap } = data;
    if (SendClap.ok) {
      toast.success("Clap Success");
    } else {
      toast.error(SendClap.error);
    }
  };

  public deletePostConfirm = (data: any) => {
    const { DeletePost } = data;
    if (DeletePost.ok) {
      toast.success("Delete Post Success");
      this.props.history.push(`/guide`);
    } else {
      toast.error(DeletePost.error);
    }
  };

  public deleteCommentConfirm = (data: any) => {
    const { DeleteComment } = data;
    if (DeleteComment.ok) {
      toast.success("Delete Comment Success");
      this.props.history.push(`/post/read/${this.props.match.params.postId}`);
    } else {
      toast.error(DeleteComment.error);
    }
  };

  public addCommentConfirm = (data: any) => {
    const { AddComment } = data;
    if (AddComment.ok) {
      toast.success("Add Comment Success");
      this.props.history.push(`/post/read/${this.props.match.params.postId}`);
    } else {
      toast.error(AddComment.error);
    }
  };

  public render() {
    return (
      <React.Fragment>
        <PostQuery
          query={POST}
          variables={{ postId: this.props.match.params.postId }}
          skip={!this.props.match.params.postId}
          notifyOnNetworkStatusChange={true}
          fetchPolicy={"cache-and-network"}
        >
          {({ loading, data, error }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <div>{error.message}</div>;
            }
            if (data === undefined) {
              return <div>something wrong</div>;
            }
            console.log(data);
            const post = data.GetPostById.post;
            const isClapped = data.GetPostById.isClapped;
            const isMine = data.GetPostById.isMine;
            if (post === null) {
              return <div>have no post [post]</div>;
            }
            if (post.body === null) {
              return <div>have no post [body]</div>;
            }
            if (post.category === null) {
              return <div>have no post [category]</div>;
            }
            const body = JSON.parse(post.body);
            console.log(body);
            console.log(post.category.wikiImages!.length);
            return (
              <React.Fragment>
                <Helmet>
                  <title>{`${post.title} | CLAP`}</title>
                </Helmet>
                <DetailContainer>
                  <PostContainer>
                    <TitleContainer
                      src={
                        post.category.wikiImages!.length !== 0
                          ? post.category.wikiImages![0]!.shownImage
                          : LOST_IMAGE_URL
                      }
                    >
                      <TitleInnerContainer>
                        <CategoryContainer>
                          {post.category.parent![0] !== undefined ? (
                            <CategoryTag
                              id={post.category.parent![0]!.id}
                              name={post.category.parent![0]!.name}
                            />
                          ) : null}
                          <CategoryTag
                            id={post.category.id}
                            name={post.category.name}
                          />
                        </CategoryContainer>
                        <Title>{post.title}</Title>
                        <CountContainer>
                          <CountItem style={{ marginLeft: "0px" }}>
                            <CountIcon className="far fa-eye" />
                            <CountText>{post.view}</CountText>
                          </CountItem>
                          <CountItem>
                            <CountIcon className="far fa-comments" />
                            <CountText>{post.commentsCount}</CountText>
                          </CountItem>
                          <CountItem>
                            <CountIcon className="fas fa-heart" />
                            <CountText>{post.clapsCount}</CountText>
                          </CountItem>
                        </CountContainer>
                        <UserContainer>
                          <UserImg url={post.user.profilePhoto!} />
                          <UserNickName>{`${post.user.nickName}`}</UserNickName>
                        </UserContainer>
                      </TitleInnerContainer>
                    </TitleContainer>
                    <BodyContainer>
                      <UserViewContainer>
                        <UserView json={body} />
                      </UserViewContainer>
                      <ClapContainer>
                        <Mutation
                          mutation={SEND_CLAP}
                          onCompleted={data => this.sendClapConfirm(data)}
                        >
                          {SendClap => (
                            <ClapImageContainer>
                              <ClapImage
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  SendClap({
                                    refetchQueries: [
                                      {
                                        query: POST,
                                        variables: {
                                          postId: this.props.match.params.postId
                                        }
                                      }
                                    ],
                                    variables: { postId: post.id }
                                  });
                                }}
                                isClapped={isClapped}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="red"
                                >
                                  <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                                </svg>
                              </ClapImage>
                              <ClapCount>1</ClapCount>
                            </ClapImageContainer>
                          )}
                        </Mutation>
                      </ClapContainer>
                      {isMine ? (
                        <ButtonsContainer>
                          <Link
                            to={`/post/edit/${post.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <PostButton>Edit</PostButton>
                          </Link>
                          <DeletePostQuery
                            mutation={DELETE_POST}
                            onCompleted={data => this.deletePostConfirm(data)}
                          >
                            {(DeletePost, { data }) => (
                              <PostButton
                                onClick={e => {
                                  e.preventDefault();
                                  DeletePost({
                                    refetchQueries: [
                                      {
                                        query: POSTS
                                      }
                                    ]
                                  });
                                }}
                              >
                                Delete
                              </PostButton>
                            )}
                          </DeletePostQuery>
                        </ButtonsContainer>
                      ) : null}
                    </BodyContainer>

                    <CommentsListContainer>
                      <tbody>
                        {post.comments!.map((comment: any, index: number) => (
                          <CommentContainer key={index}>
                            <CommentBodyContainer level={comment!.level}>
                              <CommentUserTable>
                                <CommentUser hasIcon={comment!.level > 1}>
                                  {comment!.level > 1 ? (
                                    <ReCommentIcon className="fas fa-reply" />
                                  ) : null}
                                  <UserProfilePhoto
                                    url={comment.user.profilePhoto}
                                  />
                                  {comment.user.nickName}
                                </CommentUser>
                              </CommentUserTable>
                              <CommentBody>{comment.body}</CommentBody>
                              <ReplyContainer
                                onClick={() =>
                                  this.setState({
                                    parentCommentId: comment.id
                                  })
                                }
                              >
                                <ReplyIcon className="fas fa-level-up-alt fa-rotate-90" />
                                <ReplyText>Reply</ReplyText>
                              </ReplyContainer>
                              <EditCommentButton>
                                <i className="far fa-edit" />
                              </EditCommentButton>
                              <DeleteCommentQuery
                                mutation={DELETE_COMMENT}
                                onCompleted={data =>
                                  this.deleteCommentConfirm(data)
                                }
                              >
                                {(DeleteComment, { error }) => {
                                  if (error) return <div>{error.message}</div>;
                                  return (
                                    <DeleteCommentButton
                                      onClick={() => {
                                        DeleteComment({
                                          refetchQueries: [
                                            {
                                              query: POST,
                                              variables: {
                                                postId: this.props.match.params
                                                  .postId
                                              }
                                            }
                                          ],
                                          variables: {
                                            commentId: comment.id
                                          }
                                        });
                                      }}
                                    >
                                      <i className="fas fa-times" />
                                    </DeleteCommentButton>
                                  );
                                }}
                              </DeleteCommentQuery>
                              {this.state.parentCommentId === comment.id ? (
                                <AddCommentQuery
                                  mutation={ADD_COMMENT}
                                  onCompleted={data =>
                                    this.addCommentConfirm(data)
                                  }
                                >
                                  {(AddComment, { error }) => {
                                    // if (loading) return "Loading...";
                                    if (error)
                                      return <div>{error.message}</div>;
                                    return (
                                      <RereplyContainer>
                                        <RereplyInput
                                          placeholder="Your comment is your face bro :)"
                                          value={this.state.reCommentBody}
                                          onChange={e =>
                                            this.setState({
                                              reCommentBody: e.target.value
                                            })
                                          }
                                        />
                                        <RereplyButton
                                          onClick={e => {
                                            e.preventDefault();
                                            this.setState({
                                              reCommentBody: "",
                                              parentCommentId: null
                                            });
                                            AddComment({
                                              refetchQueries: [
                                                {
                                                  query: POST,
                                                  variables: {
                                                    postId: this.props.match
                                                      .params.postId
                                                  }
                                                }
                                              ],
                                              variables: {
                                                postId: this.props.match.params
                                                  .postId,
                                                parentCommentId: comment.id,
                                                body: this.state.reCommentBody,
                                                level: comment.level + 1
                                              }
                                            });
                                          }}
                                        >
                                          POST
                                        </RereplyButton>
                                      </RereplyContainer>
                                    );
                                  }}
                                </AddCommentQuery>
                              ) : null}
                            </CommentBodyContainer>
                            <CommentInfo>
                              <CommentDate>
                                {formatDate(comment.createdAt)}
                              </CommentDate>
                            </CommentInfo>
                          </CommentContainer>
                        ))}
                      </tbody>
                    </CommentsListContainer>
                    <CommentInputContainer>
                      <CommentInput
                        placeholder="Your comment is your face bro :)"
                        value={this.state.commentBody}
                        onChange={e =>
                          this.setState({ commentBody: e.target.value })
                        }
                      />
                      <AddCommentQuery
                        mutation={ADD_COMMENT}
                        onCompleted={data => this.addCommentConfirm(data)}
                      >
                        {(AddComment, { error }) => {
                          // if (loading) return "Loading...";
                          if (error) return <div>{error.message}</div>;
                          return (
                            <CommentButton
                              onClick={e => {
                                e.preventDefault();
                                this.setState({ commentBody: "" });
                                AddComment({
                                  refetchQueries: [
                                    {
                                      query: POST,
                                      variables: {
                                        postId: this.props.match.params.postId
                                      }
                                    }
                                  ],
                                  variables: {
                                    postId: this.props.match.params.postId,
                                    parentCommentId: null,
                                    body: this.state.commentBody,
                                    level: 1
                                  }
                                });
                              }}
                            >
                              POST
                            </CommentButton>
                          );
                        }}
                      </AddCommentQuery>
                    </CommentInputContainer>
                  </PostContainer>
                </DetailContainer>
              </React.Fragment>
            );
          }}
        </PostQuery>
      </React.Fragment>
    );
  }
}

export default PostDetail;
