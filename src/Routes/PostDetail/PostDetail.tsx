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
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 30px 30px;
  border: 1px solid black;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)),
    url("${props => props.src}");
  background-size: cover;
  background-position: center;
  color: white;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 100;
  /* width: 100%; */
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
`;

const TitleInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Category = styled.div`
  padding: 3px 7px;
  background-color: white;
  color: black;
  font-weight: bolder;
  border-radius: 5px;
  font-size: 12px;
  margin-bottom: 15px;
  margin-left: 2px;
  margin-right: 2px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 1);
`;

const CountContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin: 0 5px;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 1);
`;

const UserContainer = styled.div`
  text-shadow: 0 3px 5px rgba(0, 0, 0, 1);
`;

const BodyContainer = styled.div`
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const CommentsListContainer = styled.table`
  width: 100%;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
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

interface ICommentUserProps {
  hasIcon: boolean;
}

const CommentUser = styled<ICommentUserProps, any>("div")`
  position: relative;
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
  color: #9980fa;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: opacity 0.5s ease;
  cursor: pointer;
  margin-left: 5px;
  margin-right: -3px;
  transform: translateY(-2.5px);
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
  background-color: #fffce8;
  border-left: 0.5px solid #f8efba;
`;

const CommentDate = styled.div`
  margin-top: 10px;
  width: 80px;
  text-align: right;
  position: relative;
  float: right;
`;

const CommentContainer = styled.tr`
  display: flex;
  width: 100%;
  align-items: center;
  min-height: 60px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  display: table-row;
  vertical-align: inherit;
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
`;

const CommentInput = styled.textarea`
  /* width: 100%; */
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  vertical-align: top;
  resize: vertical;
  padding: 10px;
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
  color: darkgreen;
`;

const DeleteCommentButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: darkred;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostButton = styled.div`
  padding: 5px 10px;
  margin: 5px;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  border-radius: 5px;
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

  public formatDate(date: any) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  public render() {
    return (
      <React.Fragment>
        <PostQuery
          query={POST}
          variables={{ postId: this.props.match.params.postId }}
          skip={!this.props.match.params.postId}
          notifyOnNetworkStatusChange={true}
        >
          {({ loading, data, error }) => {
            if (loading) {
              return <div>loading</div>;
            }
            if (error) {
              return <div>{error.message}</div>;
            }
            if (data === undefined) {
              return <div>something wrong</div>;
            }
            const post = data.GetPostById.post;
            if (post === null) {
              return <div>have no post</div>;
            }
            if (post.body === null) {
              return <div>have no post</div>;
            }
            if (post.category === null) {
              return <div>have no post</div>;
            }
            const body = JSON.parse(post.body);
            return (
              <React.Fragment>
                <Helmet>
                  <title>{`${post.title} | CLAP`}</title>
                </Helmet>
                <DetailContainer>
                  <PostContainer>
                    <TitleContainer
                      src={`http://localhost:4000/uploads/${
                        post.category.wikiImages![0]!.shownImage!.url
                      }`}
                    >
                      <TitleInnerContainer>
                        <CategoryContainer>
                          {post.category.parent![0] !== undefined ? (
                            <Category>
                              {`${post.category.parent![0]!.name}`}
                            </Category>
                          ) : null}
                          <Category>{`${post.category.name}`}</Category>
                        </CategoryContainer>
                        <Title>{post.title}</Title>
                        <CountContainer>
                          <CountItem>
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
                        <UserContainer>{`by ${
                          post.user.nickName
                        }`}</UserContainer>
                      </TitleInnerContainer>
                    </TitleContainer>
                    <BodyContainer>
                      <UserView json={body} />
                    </BodyContainer>
                    <ButtonsContainer>
                      <Mutation
                        mutation={SEND_CLAP}
                        onCompleted={() => this.props.history.push(`/guide`)}
                      >
                        {SendClap => (
                          <PostButton
                            onClick={e => {
                              e.preventDefault();
                              SendClap({
                                variables: { postId: post.id }
                              });
                            }}
                          >
                            CLAP!
                          </PostButton>
                        )}
                      </Mutation>
                      <Link
                        to={`/post/edit/${post.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <PostButton>Edit</PostButton>
                      </Link>
                      <DeletePostQuery
                        mutation={DELETE_POST}
                        onCompleted={() => this.props.history.push(`/guide`)}
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
                    <CommentsListContainer>
                      <tbody>
                        {/* <Comments items={post.comments} /> */}
                        {post.comments!.map((comment: any, index: number) => (
                          <CommentContainer key={index}>
                            <CommentBodyContainer level={comment!.level}>
                              <CommentUserTable>
                                <CommentUser hasIcon={comment!.level > 1}>
                                  {comment!.level > 1 ? (
                                    <ReCommentIcon className="fas fa-reply fa-rotate-180" />
                                  ) : null}

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
                                <ReplyText>답글</ReplyText>
                              </ReplyContainer>
                              <EditCommentButton>
                                <i className="far fa-edit" />
                              </EditCommentButton>
                              <DeleteCommentQuery
                                mutation={DELETE_COMMENT}
                                onCompleted={data =>
                                  this.props.history.push(
                                    `/post/read/${
                                      this.props.match.params.postId
                                    }`
                                  )
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
                                    this.props.history.push(
                                      `/post/read/${
                                        this.props.match.params.postId
                                      }`
                                    )
                                  }
                                >
                                  {(AddComment, { error }) => {
                                    // if (loading) return "Loading...";
                                    if (error)
                                      return <div>{error.message}</div>;
                                    return (
                                      <RereplyContainer>
                                        <RereplyInput
                                          placeholder="댓글은 당신을 비추는 얼굴입니다."
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
                                          등록
                                        </RereplyButton>
                                      </RereplyContainer>
                                    );
                                  }}
                                </AddCommentQuery>
                              ) : null}
                            </CommentBodyContainer>
                            <CommentInfo>
                              <CommentDate>
                                {this.formatDate(comment.createdAt)}
                              </CommentDate>
                            </CommentInfo>
                          </CommentContainer>
                        ))}
                      </tbody>
                    </CommentsListContainer>
                    <CommentInputContainer>
                      <CommentInput
                        placeholder="댓글은 당신을 비추는 얼굴입니다."
                        value={this.state.commentBody}
                        onChange={e =>
                          this.setState({ commentBody: e.target.value })
                        }
                      />
                      <AddCommentQuery
                        mutation={ADD_COMMENT}
                        onCompleted={data =>
                          this.props.history.push(
                            `/post/read/${this.props.match.params.postId}`
                          )
                        }
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
                              등록
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