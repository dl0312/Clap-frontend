import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps, Link } from "react-router-dom";
import { getAllPosts, getAllPostsVariables } from "../../types/api";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ImagePopup from "../../Components/ImagePopup";
import { POSTS } from "../../sharedQueries";

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
  font-family: "Open Sans", sans-serif;
`;

const BoardOneContainer = styled.div`
  width: 100%;
  padding: 20px 0px;
  background-color: background-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5); */
`;

const BoardOneTitle = styled.div`
  font-size: 25px;
  margin-bottom: 5px;
  color: white;
  font-weight: bolder;
`;

const BoardOneSubTitle = styled.div`
  font-size: 10px;
  color: white;
`;

const FeaturedContainer = styled.div`
  width: 100%;
`;

const FeaturedCardButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const FeaturedCardTitle = styled.div`
//   font-size: 15px;
//   margin: 0px 3px;
// `;

const FeaturedCardType = styled.div`
  font-size: 15px;
  font-weight: bolder;
`;

const FeaturedButtonContainer = styled.div`
  width: 100%;
  padding: 0 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;
const FeaturedCardCounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

interface IFeaturedCardContainerProps {
  newGuideCounter: number;
}

const FeaturedCardContainer = styled<IFeaturedCardContainerProps, any>("div")`
  white-space: nowrap;
  width: 100%;
  display: block;
  transition: transform 1s ease;
  transform: ${props =>
    `translate3d(${props.newGuideCounter * -100}%, 0px, 0px)`};
`;

interface IFeaturedCardCounterProps {
  isSelected: boolean;
}

const FeaturedCardCounter = styled<IFeaturedCardCounterProps, any>("div")`
  margin: 0 1px;
  opacity: ${props => (props.isSelected ? "1" : "0.5")};
  transition: opacity 0.25s ease;
`;

// const FeaturedCard = styled.div``;

const CardContainer = styled.div`
  width: 20%;
  padding: 0 2px;
  display: inline-block;
`;

const Slider = styled.div`
  position: relative;
  margin: 0;
  padding: 0 4%;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
`;

const SlideHandle = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 20;
  width: 4%;
  text-align: center;
  justify-content: center;
  display: flex;
  background-color: transparent;
  border: none;
`;

const SlideIcon = styled.i`
  transform-origin: 55% 50%;
  height: auto;
  align-self: center;
  font-size: 2.5vw;
  color: white;
`;

interface ICardImageProps {
  url: string;
}

const CardImage = styled<ICardImageProps, any>("div")`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${props => `${props.url}`});
  background-size: 100%;
  background-position: 50% 50%;
  height: 130px;
  width: 100%;
  /* position: relative; */
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
  /* margin: 5px; */
  /* border-bottom: 0.5px solid #efefef;
  border-right: 0.5px solid #efefef; */

  /* filter: brightness(0.5); */
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  position: relative;
  top: 5px;
  left: 5px;
`;

const Category = styled.div`
  padding: 3px 5px;
  background-color: white;
  color: black;
  font-weight: bolder;
  border-radius: 2px;
  font-size: 10px;
  margin-left: 2px;
  margin-right: 2px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
`;

const CardTextContainer = styled.div`
  text-align: center;
  margin: 5px;
  border-radius: 2px;
  position: relative;
  top: 25%;
`;

const CardTitle = styled.div`
  /* color: #262626; */
  color: white;
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: bolder;
`;

const CardSubTitle = styled.div`
  /* color: #262626; */
  color: white;
`;

const BoardTwoContainer = styled.div``;

const TD = styled.td`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  vertical-align: middle;
  text-align: center;
  /* border-radius: 3px; */
  background-color: white;
`;

const BoardBox = styled.div`
  width: 700px;
  max-width: 960px;
`;

const CategoryImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: scale-down;
`;

const Table = styled.table`
  width: 100%;
  display: grid;
  grid-gap: 2px;
`;

const TableRow = styled.tr`
  display: grid;
  grid-template-columns: 60px auto 120px;
  grid-gap: 2px;
  min-width: 400px;
`;

const CategoryData = TD.extend`
  width: 60px;
  height: 60px;
  background-color: black;
`;

const Comment = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin: 0 5px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  font-size: 13px;
  float: left;
  width: 100%;
  font-weight: bolder;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #63748f;
  padding-bottom: 5px;
  display: flex;
  justify-content: flex-start;
`;

const SubTitle = styled.div`
  color: #63748f;
  font-size: 11px;
  line-height: 1em;
  float: left;
  width: 100%;
`;

const TitleRow = TD.extend`
  text-align: left;
  padding: 10px 10px;
  vertical-align: top;
`;
const CountRow = TD.extend`
  width: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CountTitle = styled.div`
  font-size: 10px;
`;

const FlexBox = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PostButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const PostButton = styled.div`
  padding: 5px 10px;
  margin: 5px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
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
    return (
      <PostsQuery query={POSTS} variables={{ limit: 20 }}>
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
                                src={
                                  post.category.wikiImages[0] !== undefined
                                    ? `http://localhost:4000/uploads/${
                                        post.category.wikiImages[0].shownImage
                                          .url
                                      }`
                                    : "https://image.freepik.com/free-icon/question-mark-inside-a-box-outline_318-51427.jpg"
                                }
                                alt={post.category.name}
                              />
                            </CategoryData>
                            <TitleRow>
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
                                Guide by {post.user.nickName} updated{" "}
                                {post.createdAt}
                              </SubTitle>
                            </TitleRow>
                            <CountRow>
                              <FlexBox>
                                <CountTitle>
                                  CLAPS: {post.clapsCount}
                                </CountTitle>
                                <CountTitle>VIEWS: {post.view}</CountTitle>
                              </FlexBox>
                            </CountRow>
                          </TableRow>
                        ))}
                      </tbody>
                    </Table>
                    <PostButtonContainer>
                      <Link to={`/post/add`} style={{ textDecoration: "none" }}>
                        <PostButton>New Post</PostButton>
                      </Link>
                    </PostButtonContainer>
                  </BoardBox>
                </BoardContainer>
              )}
              {posts && (
                <BoardContainer>
                  <Helmet>
                    <title>Board | CLAP</title>
                  </Helmet>
                  <BoardOneContainer>
                    <BoardOneTitle>클랩 공략 커뮤니티</BoardOneTitle>
                    <BoardOneSubTitle>
                      게임에 대한 모든 정보를 얻어보세요
                    </BoardOneSubTitle>
                    <FeaturedContainer>
                      <FeaturedButtonContainer>
                        <FeaturedCardButtonContainer>
                          {/* <FeaturedCardTitle>GUIDE</FeaturedCardTitle> */}
                          <FeaturedCardType>새로 올라온 공략</FeaturedCardType>
                          {/* <FeaturedCardType>UPDATED</FeaturedCardType>
                <FeaturedCardType>NEW</FeaturedCardType> */}
                        </FeaturedCardButtonContainer>
                        <FeaturedCardCounterContainer>
                          <FeaturedCardCounter
                            isSelected={0 === this.state.newGuideCounter}
                          >
                            <i className="fas fa-minus" />
                          </FeaturedCardCounter>
                          <FeaturedCardCounter
                            isSelected={1 === this.state.newGuideCounter}
                          >
                            <i className="fas fa-minus" />
                          </FeaturedCardCounter>
                          <FeaturedCardCounter
                            isSelected={2 === this.state.newGuideCounter}
                          >
                            <i className="fas fa-minus" />
                          </FeaturedCardCounter>
                          <FeaturedCardCounter
                            isSelected={3 === this.state.newGuideCounter}
                          >
                            <i className="fas fa-minus" />
                          </FeaturedCardCounter>
                          <FeaturedCardCounter
                            isSelected={4 === this.state.newGuideCounter}
                          >
                            <i className="fas fa-minus" />
                          </FeaturedCardCounter>
                        </FeaturedCardCounterContainer>
                      </FeaturedButtonContainer>
                      <Slider>
                        <SlideHandle
                          className="handle handlePrev active"
                          role="button"
                          aria-label="이전 콘텐츠 보기"
                          style={{ left: "0px" }}
                          onClick={() =>
                            this.setState({
                              newGuideCounter: this.state.newGuideCounter - 1
                            })
                          }
                        >
                          <SlideIcon className="fas fa-angle-left" />
                        </SlideHandle>
                        <FeaturedCardContainer
                          newGuideCounter={this.state.newGuideCounter}
                        >
                          {posts.map((post: any, index: number) => (
                            <CardContainer>
                              <CardImage
                                url={
                                  post.category.wikiImages[0] !== undefined
                                    ? `http://localhost:4000/uploads/${
                                        post.category.wikiImages[0].shownImage
                                          .url
                                      }`
                                    : "https://image.freepik.com/free-icon/question-mark-inside-a-box-outline_318-51427.jpg"
                                }
                                alt={post.category.name}
                                // onMouseOver={() => handleOnMouseOver(post, true)}
                                // onMouseMove={getPos}
                                // onMouseOut={handleonMouseOut}
                              >
                                <CategoryContainer>
                                  {post.category.parent![0] !== undefined ? (
                                    <Category>
                                      {`# ${post.category.parent![0]!.name}`}
                                    </Category>
                                  ) : null}
                                  <Category>{`# ${
                                    post.category.name
                                  }`}</Category>
                                </CategoryContainer>
                                <CardTextContainer>
                                  <CardTitle>{post.title}</CardTitle>
                                  <CardSubTitle>
                                    BY {post.user.nickName}
                                  </CardSubTitle>
                                </CardTextContainer>
                              </CardImage>
                            </CardContainer>
                          ))}
                        </FeaturedCardContainer>
                        <SlideHandle
                          className="handle handlePrev active"
                          role="button"
                          aria-label="다음 콘텐츠 보기"
                          style={{ right: "0px" }}
                          onClick={() =>
                            this.setState({
                              newGuideCounter: this.state.newGuideCounter + 1
                            })
                          }
                        >
                          <SlideIcon className="fas fa-angle-right" />
                        </SlideHandle>
                      </Slider>
                    </FeaturedContainer>
                  </BoardOneContainer>
                  <BoardTwoContainer />
                </BoardContainer>
              )}
              <ImagePopup pos={pos} json={hoverImgJson} onImage={onImage} />
            </React.Fragment>
          );
        }}
      </PostsQuery>
    );
  }
}

export default Board;
