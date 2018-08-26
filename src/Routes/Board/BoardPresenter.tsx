import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import ImagePopup from '../../components/ImagePopup';
import { getAllPosts } from '../../types/api';

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 150px 30px;
  font-family: 'Open Sans', sans-serif;
  background-color: white;
`;

const TD = styled.td`
  border: 1px solid black;
  vertical-align: middle;
  text-align: center;
  border-radius: 3px;
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
`;

const CategoryData = TD.extend`
  width: 60px;
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
  font-size: 15px;
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

const Indicator = styled.div`
  width: 100px;
  border: 2px solid grey;
  height: 15px;
  border-radius: 5px;
  margin: 5px 0;
  align-items: center;
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

interface IProps {
  data?: getAllPosts;
  loading: boolean;
  error?: string;
  hoverImgJson: {
    cards: any[];
    color: { r: string; g: string; b: string; a: string };
    contentWidth: number;
    font: string;
  };
  onImage: boolean;
  pos: { x: number; y: number };
  getPos: any;
  handleOnMouseOver: any;
  handleonMouseOut: any;
}

const BoardPresenter: React.SFC<IProps> = ({
  data: { GetAllPosts: { posts = [] } = {} } = {},
  hoverImgJson,
  onImage,
  pos,
  getPos,
  handleOnMouseOver,
  handleonMouseOut
}) => (
  <React.Fragment>
    {posts && (
      <BoardContainer>
        <BoardBox>
          <Table>
            <tbody>
              <Helmet>
                <title>Board</title>
              </Helmet>
              {posts.map((post: any, index: number) => (
                <TableRow key={index}>
                  <CategoryData>
                    <CategoryImg
                      src={
                        post.category.wikiImages[0] !== undefined
                          ? `http://localhost:4000/uploads/${
                              post.category.wikiImages[0].shownImage.url
                            }`
                          : 'https://image.freepik.com/free-icon/question-mark-inside-a-box-outline_318-51427.jpg'
                      }
                      alt={post.category.name}
                      onMouseOver={handleOnMouseOver}
                      onMouseMove={getPos}
                      onMouseOut={handleonMouseOut}
                    />
                  </CategoryData>
                  <TitleRow>
                    <Title>
                      <Link
                        to={`/post/read/${post.id}`}
                        style={{
                          textDecoration: 'none'
                        }}
                      >
                        <FlexBox
                          style={{
                            flexDirection: 'row',
                            padding: '0px'
                          }}
                        >
                          {post.title}
                          <Comment>[{post.commentsCount}]</Comment>
                        </FlexBox>
                      </Link>
                    </Title>
                    <SubTitle>
                      Guide by {post.user.nickName} updated {post.createdAt}
                    </SubTitle>
                  </TitleRow>
                  <CountRow>
                    <FlexBox>
                      <CountTitle>CLAPS: {post.clapsCount}</CountTitle>
                      <Indicator />
                      <CountTitle>VIEWS: {post.view}</CountTitle>
                    </FlexBox>
                  </CountRow>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <PostButtonContainer>
            <Link to={`/post/add`} style={{ textDecoration: 'none' }}>
              <PostButton>New Post</PostButton>
            </Link>
          </PostButtonContainer>
        </BoardBox>
      </BoardContainer>
    )}
    {/* <ImagePopup
      pos={pos}
      json={hoverImgJson ? hoverImgJson : null}
      onImage={onImage}
    /> */}
  </React.Fragment>
);

export default BoardPresenter;
