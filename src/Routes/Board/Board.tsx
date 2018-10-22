import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps, Link } from "react-router-dom";
import { getAllPosts, getAllPostsVariables } from "../../types/api";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ImagePopup from "../../Components/ImagePopup";
import { POSTS } from "../../sharedQueries";
import { LOST_IMAGE_URL } from "../../constants";
import FeaturedPostCards from "../../Components/FeaturedPostCards";
import Loading from "../../Components/Loading";
import CategoryTag from "src/Components/CategoryTag";
import UserTag from "src/Components/UserTag";

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
  font-family: "Open Sans", sans-serif;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 5px;
`;

const TD = styled.td`
  border: 1px solid black;
  vertical-align: middle;
  text-align: center;
  /* border-radius: 3px; */
`;

const BoardBox = styled.div`
  width: 700px;
  max-width: 960px;
`;

interface ICategoryImgProps {
  url: string;
}

const CategoryImg = styled<ICategoryImgProps, any>("div")`
  width: 100%;
  height: 100%;
  display: block;
  transition: background-size 0.2s;
  background-image: url(${props => props.url});
  background-position: 50% 50%;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const Table = styled.table`
  width: 100%;
  display: grid;
  margin-bottom: 20px;
  tr:nth-child(2n) {
    background-color: #444;
    &:hover {
      background-color: #555;
    }
  }
`;

const TableRow = styled.tr`
  display: grid;
  grid-template-columns: 80px auto 120px;
  min-width: 400px;
  background-color: #222;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  &:hover {
    background-color: #333;
    box-shadow: 0px 0px 10px 5px black;
    ${CategoryImg} {
      background-size: 150%;
    }
  }
`;

const CategoryData = TD.extend`
  width: 80px;
  height: 80px;
  background-color: black;
  overflow: hidden;
`;

const Comment = styled.span`
  color: #e74c3c;
  margin: 0 5px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  font-size: 15px;
  float: left;
  width: 100%;
  font-weight: bolder;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-bottom: 5px;
  display: flex;
  justify-content: flex-start;
`;

const SubTitle = styled.div`
  font-size: 11px;
  line-height: 1em;
  width: 100%;
  display: flex;
  align-items: center;
`;

const TitleRow = TD.extend`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: left;
  flex-direction: column;
`;
const CountRow = TD.extend`
  width: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CountTitle = styled.div`
  font-size: 15px;
  padding: 3px;
`;

const FlexBox = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PostsInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CountIcon = styled.i`
  padding-right: 3px;
`;

const PostButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostButton = styled.div`
  padding: 10px 15px;
  margin: 5px;
  background-color: white;
  color: black;
  font-weight: 700;
`;

interface IProps extends RouteComponentProps<any> {}

interface IState {
  hoverImgJson: string;
  onImage: boolean;
  pos: { x: number; y: number };
  newGuideCounter: number;
}

class PostsQuery extends Query<getAllPosts, getAllPostsVariables> {}

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hoverImgJson: "",
      onImage: false,
      pos: { x: 0, y: 0 },
      newGuideCounter: 0
    };
  }

  public getPos = (e: MouseEvent): void => {
    const pos = { x: e.pageX, y: e.pageY - 100 };
    this.setState({ pos });
  };

  public handleOnMouseOver = (post: any, onImage: boolean) => {
    this.setState({
      hoverImgJson:
        post.category.wikiImages[0] !== undefined
          ? post.category.wikiImages[0].hoverImage
          : null,
      onImage: true
    });
  };

  public handleonMouseOut = (onImage: boolean) => {
    this.setState({
      onImage: false
    });
  };

  public render() {
    const { pos, hoverImgJson, onImage } = this.state;
    console.log(this.props);
    return (
      <PostsQuery
        query={POSTS}
        fetchPolicy={"cache-and-network"}
        variables={{ limit: 100, type: "createdAt" }}
      >
        {({ loading, data, error }) => {
          if (loading) {
            console.log(loading);
            return <Loading />;
          }
          if (error) {
            return <div>{error.message}</div>;
          }
          if (data === undefined) {
            return <div>data undefined</div>;
          }
          const posts = data.GetAllPosts.posts;
          return (
            <React.Fragment>
              {posts && (
                <BoardContainer>
                  <BoardBox>
                    <Table>
                      <tbody>
                        <Helmet>
                          <title>Board | CLAP</title>
                        </Helmet>
                        {posts.map((post: any, index: number) => (
                          <TableRow key={index}>
                            <CategoryData>
                              <CategoryImg
                                url={
                                  post.category.topWikiImage !== null
                                    ? post.category.topWikiImage.shownImage
                                    : LOST_IMAGE_URL
                                }
                                alt={post.category.name}
                              />
                            </CategoryData>
                            <TitleRow>
                              <CategoryContainer>
                                {post.category.parent![0] !== undefined ? (
                                  <CategoryTag
                                    size={"SMALL"}
                                    id={post.category.parent![0]!.id}
                                    name={post.category.parent![0]!.name}
                                  />
                                ) : null}
                                <CategoryTag
                                  size={"SMALL"}
                                  id={post.category.id}
                                  name={post.category.name}
                                />
                              </CategoryContainer>
                              <Title>
                                <Link
                                  to={`/post/read/${post.id}`}
                                  style={{
                                    textDecoration: "none"
                                  }}
                                >
                                  <FlexBox
                                    style={{
                                      flexDirection: "row",
                                      padding: "0px"
                                    }}
                                  >
                                    {post.title}
                                    <Comment>[{post.commentsCount}]</Comment>
                                  </FlexBox>
                                </Link>
                              </Title>

                              <SubTitle>
                                Guide by{" "}
                                <UserTag
                                  size={"SMALL"}
                                  profilePhoto={post.user.profilePhoto}
                                  username={post.user.nickName}
                                />{" "}
                                Updated {post.createdAt}
                              </SubTitle>
                            </TitleRow>
                            <CountRow>
                              <CountContainer>
                                <CountTitle>
                                  <CountIcon className="far fa-thumbs-up" />
                                  {post.clapsCount}
                                </CountTitle>
                                <CountTitle>
                                  <CountIcon className="far fa-eye" />{" "}
                                  {post.view}
                                </CountTitle>
                              </CountContainer>
                            </CountRow>
                          </TableRow>
                        ))}
                      </tbody>
                    </Table>
                    <PostsInfoContainer>
                      <span>
                        THE NUMBER OF POSTS IS{" "}
                        <span
                          style={{
                            color: "skyblue",
                            fontWeight: "bolder"
                          }}
                        >
                          {posts.length}
                        </span>
                      </span>
                      <PostButtonContainer>
                        <Link
                          to={`/post/add`}
                          style={{ textDecoration: "none" }}
                        >
                          <PostButton>NEW POST</PostButton>
                        </Link>
                        <PostButton>LIST</PostButton>
                      </PostButtonContainer>
                    </PostsInfoContainer>
                  </BoardBox>
                </BoardContainer>
              )}
              <PostsQuery
                query={POSTS}
                variables={{ limit: 25, type: "createdAt" }}
              >
                {({ loading, data, error }) => {
                  if (loading) {
                    return <div>Loading...</div>;
                  }
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data === undefined) {
                    return <div>data undefined</div>;
                  }
                  const posts = data.GetAllPosts.posts;
                  if (posts) {
                    return (
                      <React.Fragment>
                        <FeaturedPostCards posts={posts} type="새로운 공략" />
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                }}
              </PostsQuery>
              <PostsQuery
                query={POSTS}
                variables={{ limit: 25, type: "updatedAt" }}
              >
                {({ loading, data, error }) => {
                  if (loading) {
                    return <div>Loading...</div>;
                  }
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data === undefined) {
                    return <div>data undefined</div>;
                  }
                  const posts = data.GetAllPosts.posts;
                  if (posts) {
                    return (
                      <React.Fragment>
                        <FeaturedPostCards
                          posts={posts}
                          type="업데이트 된 공략"
                        />
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                }}
              </PostsQuery>
              <ImagePopup pos={pos} json={hoverImgJson} onImage={onImage} />
            </React.Fragment>
          );
        }}
      </PostsQuery>
    );
  }
}

export default Board;
