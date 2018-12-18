import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import {
  getPostsByGameId,
  getPostsByGameIdVariables,
  getClappedPostsByGameId,
  getClappedPostsByGameIdVariables,
  getRisingPostsByGameId,
  getRisingPostsByGameIdVariables
} from "../../types/api";
import styled from "styled-components";
import ImagePopup from "../../Components/ImagePopup";
import {
  GET_POSTS_BY_GAME_ID,
  GET_CLAPPED_POSTS_BY_GAME_ID,
  GET_RISING_POSTS_BY_GAME_ID
} from "../../sharedQueries";
import Loading from "../../Components/Loading";
// import CategoryTag from "src/Components/CategoryTag";
// import UserTag from "src/Components/UserTag";
import { Table, Tabs, Button, Icon } from "antd";
// import CategoryTag from "src/Components/CategoryTag";
import UserTag from "src/Components/UserTag";
import Helmet from "react-helmet";
const numeral = require("numeral");
const TabPane = Tabs.TabPane;

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  font-family: "Open Sans", sans-serif;
`;

// const CategoryContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
// `;

// const TD = styled.td`
//   border: 1px solid black;
//   vertical-align: middle;
//   text-align: center;
//   /* border-radius: 3px; */
// `;

// const BoardBox = styled.div`
//   width: 700px;
//   max-width: 960px;
// `;

// interface ICategoryImgProps {
//   url: string;
// }

// const CategoryImg = styled<ICategoryImgProps, any>("div")`
//   width: 100%;
//   height: 100%;
//   display: block;
//   transition: background-size 0.2s;
//   background-image: url(${props => props.url});
//   background-position: 50% 50%;
//   background-size: 100%;
//   background-repeat: no-repeat;
// `;

// const Table = styled.table`
//   width: 100%;
//   display: grid;
//   margin-bottom: 20px;
//   tr:nth-child(2n) {
//     background-color: #444;
//     &:hover {
//       background-color: #555;
//     }
//   }
// `;

// const TableRow = styled.tr`
//   display: grid;
//   grid-template-columns: 80px auto 120px;
//   min-width: 400px;
//   background-color: #222;
//   transition: background-color 0.2s ease, box-shadow 0.2s ease;
//   position: relative;
//   &:hover {
//     background-color: #333;
//     box-shadow: 0px 0px 10px 5px black;
//     ${CategoryImg} {
//       background-size: 150%;
//     }
//   }
// `;

// const CategoryData = TD.extend`
//   width: 80px;
//   height: 80px;
//   background-color: black;
//   overflow: hidden;
// `;

// const Comment = styled.span`
//   color: #e74c3c;
//   margin: 0 5px;
//   display: flex;
//   align-items: center;
// `;

// const Title = styled.div`
//   color: white;
//   font-size: 15px;
//   float: left;
//   width: 100%;
//   font-weight: bolder;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   display: flex;
//   justify-content: flex-start;
// `;

// const SubTitle = styled.div`
//   font-size: 11px;
//   line-height: 1em;
//   width: 100%;
//   display: flex;
//   align-items: center;
// `;

// const TitleRow = TD.extend`
//   padding: 10px 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: left;
//   flex-direction: column;
// `;
// const CountRow = TD.extend`
//   width: 120px;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const CountTitle = styled.div`
//   font-size: 15px;
//   padding: 3px;
// `;

// const FlexBox = styled.div`
//   padding: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

// const PostsInfoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const CountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
// `;

// const CountIcon = styled.i`
//   padding-right: 3px;
// `;

// const PostButtonContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const PostButton = styled.div`
//   padding: 10px 15px;
//   margin: 5px;
//   background-color: white;
//   color: black;
//   font-weight: 700;
// `;

const columns = [
  {
    title: <div style={{ display: "flex", justifyContent: "center" }}>ID</div>,
    dataIndex: "id",
    key: "id",
    width: 50,
    render: (id: number) => (
      <div style={{ display: "flex", justifyContent: "center" }}>{id}</div>
    )
  },
  // {
  //   title: (
  //     <div style={{ display: "flex", justifyContent: "center" }}>Category</div>
  //   ),
  //   key: "category",
  //   dataIndex: "category",
  //   render: (category: any) => (
  //     <>
  //       <CategoryTag category={category} display={"both"} />
  //     </>
  //   )
  // },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 500,
    render: (post: any) => (
      <Link
        to={`/post/read/${post.id}`}
        style={{
          textDecoration: "none"
        }}
      >
        {post.title}
      </Link>
    )
  },
  {
    title: (
      <div style={{ display: "flex", justifyContent: "center" }}>User</div>
    ),
    dataIndex: "user",
    key: "user",
    render: (user: any) => (
      <UserTag
        size={"small"}
        display={"both"}
        profilePhoto={user.profilePhoto}
        username={user.nickName}
      />
    )
  },
  {
    title: (
      <div style={{ display: "flex", justifyContent: "center" }}>Clap</div>
    ),
    dataIndex: "clap",
    key: "clap",
    render: (clap: number) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {numeral(clap).format("0 a")}
      </div>
    )
  },
  {
    title: (
      <div style={{ display: "flex", justifyContent: "center" }}>View</div>
    ),
    dataIndex: "view",
    key: "view",
    render: (view: number) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {numeral(view).format("0 a")}
      </div>
    )
  },
  {
    title: (
      <div style={{ display: "flex", justifyContent: "center" }}>Date</div>
    ),
    dataIndex: "date",
    key: "date",
    render: (date: Date) => (
      <span style={{ display: "flex", justifyContent: "center" }}>
        {new Date(date).toLocaleDateString()}
      </span>
    )
  }
];

const pagenationConfig = {
  pagination: {
    defaultPageSize: 20,
    hideOnSinglePage: true
  }
};

interface IProps {
  gameId: number;
  history: any;
}

interface IState {
  hoverImgJson: string;
  onImage: boolean;
  pos: { x: number; y: number };
  newGuideCounter: number;
}

class GetPostsByGameIdQuery extends Query<
  getPostsByGameId,
  getPostsByGameIdVariables
> {}
class GetClappedPostsByGameIdQuery extends Query<
  getClappedPostsByGameId,
  getClappedPostsByGameIdVariables
> {}
class GetRisingPostsByGameIdQuery extends Query<
  getRisingPostsByGameId,
  getRisingPostsByGameIdVariables
> {}

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
    const { gameId } = this.props;
    console.log(this.props);
    return (
      <>
        <BoardContainer>
          <Helmet>
            <title>GUIDE | CLAP</title>
          </Helmet>
          <Tabs
            defaultActiveKey="1"
            tabPosition={"left"}
            style={{ height: "100%" }}
          >
            <TabPane
              tab={
                <>
                  <Icon
                    type="clock-circle"
                    theme="twoTone"
                    twoToneColor="LightGreen"
                  />
                  Recent
                </>
              }
              key="1"
            >
              <GetPostsByGameIdQuery
                query={GET_POSTS_BY_GAME_ID}
                fetchPolicy={"cache-and-network"}
                variables={{ gameId }}
              >
                {({ loading, data, error }) => {
                  if (loading) {
                    console.log(loading);
                    return <Loading color={"black"} />;
                  }
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data === undefined) {
                    return <div>data undefined</div>;
                  }
                  const posts = data.GetPostsByGameId.posts;
                  console.log(posts);
                  return (
                    <React.Fragment>
                      {posts && (
                        <Table
                          rowKey="uid"
                          style={{ minWidth: 850 }}
                          size={"small"}
                          {...pagenationConfig}
                          // style={{ backgroundColor: "white" }}
                          columns={columns}
                          dataSource={posts.map(post => {
                            return {
                              id: post!.id,
                              title: post,
                              user: post!.user,
                              clap: post!.clapsCount,
                              view: post!.view,
                              date: post!.createdAt
                            };
                          })}
                          footer={() => (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end"
                              }}
                            >
                              <Link
                                to={{
                                  pathname: `/game/${gameId}/post/add`
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{ marginRight: "10px" }}
                                >
                                  NEW POST
                                </Button>
                              </Link>
                              <Button size="small">LIST</Button>
                            </div>
                          )}
                          bordered={true}
                        />
                      )}
                      <ImagePopup
                        pos={pos}
                        json={hoverImgJson}
                        onImage={onImage}
                      />
                    </React.Fragment>
                  );
                }}
              </GetPostsByGameIdQuery>
            </TabPane>
            <TabPane
              tab={
                <>
                  <Icon type="star" theme="twoTone" twoToneColor="GoldenRod" />
                  Clapped
                </>
              }
              key="2"
            >
              <GetClappedPostsByGameIdQuery
                query={GET_CLAPPED_POSTS_BY_GAME_ID}
                variables={{ gameId }}
                fetchPolicy={"cache-and-network"}
              >
                {({ loading, data, error }) => {
                  if (loading) {
                    console.log(loading);
                    return <Loading color={"black"} />;
                  }
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data === undefined) {
                    return <div>data undefined</div>;
                  }
                  console.log(data);
                  const posts = data.GetClappedPostsByGameId.posts;
                  console.log(posts);
                  return (
                    <React.Fragment>
                      {posts && (
                        <Table
                          rowKey="uid"
                          style={{ minWidth: 850 }}
                          size={"small"}
                          {...pagenationConfig}
                          // style={{ backgroundColor: "white" }}
                          columns={columns}
                          dataSource={posts.map((post: any) => {
                            console.log(post);
                            return (
                              post && {
                                id: post.id,
                                title: post,
                                user: post.user,
                                clap: post.clapsCount,
                                view: post.view,
                                date: post.createdAt
                              }
                            );
                          })}
                          footer={() => (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end"
                              }}
                            >
                              <Link
                                to={{
                                  pathname: `/game/${gameId}/post/add`
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{ marginRight: "10px" }}
                                >
                                  NEW POST
                                </Button>
                              </Link>
                              <Button size="small">LIST</Button>
                            </div>
                          )}
                          bordered={true}
                        />
                      )}
                      <ImagePopup
                        pos={pos}
                        json={hoverImgJson}
                        onImage={onImage}
                      />
                    </React.Fragment>
                  );
                }}
              </GetClappedPostsByGameIdQuery>
            </TabPane>
            <TabPane
              tab={
                <>
                  <Icon type="fire" theme="twoTone" twoToneColor="red" />
                  Rising
                </>
              }
              key="3"
            >
              <GetRisingPostsByGameIdQuery
                query={GET_RISING_POSTS_BY_GAME_ID}
                variables={{ gameId }}
                fetchPolicy={"cache-and-network"}
              >
                {({ loading, data, error }) => {
                  if (loading) {
                    console.log(loading);
                    return <Loading color={"black"} />;
                  }
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data === undefined) {
                    return <div>data undefined</div>;
                  }
                  const posts = data.GetRisingPostsByGameId.posts;
                  console.log(posts);
                  return (
                    <React.Fragment>
                      {posts && (
                        <Table
                          rowKey="uid"
                          style={{ minWidth: 850 }}
                          size={"small"}
                          {...pagenationConfig}
                          // style={{ backgroundColor: "white" }}
                          columns={columns}
                          dataSource={posts.map(post => {
                            return {
                              id: post!.id,
                              title: post,
                              user: post!.user,
                              clap: post!.clapsCount,
                              view: post!.view,
                              date: post!.createdAt
                            };
                          })}
                          bordered={true}
                          footer={() => (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end"
                              }}
                            >
                              <Link
                                to={{
                                  pathname: `/game/${gameId}/post/add`
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                <Button
                                  type="primary"
                                  size="small"
                                  style={{ marginRight: "10px" }}
                                >
                                  NEW POST
                                </Button>
                              </Link>
                              <Button size="small">LIST</Button>
                            </div>
                          )}
                        />
                      )}
                      <ImagePopup
                        pos={pos}
                        json={hoverImgJson}
                        onImage={onImage}
                      />
                    </React.Fragment>
                  );
                }}
              </GetRisingPostsByGameIdQuery>
            </TabPane>
          </Tabs>
        </BoardContainer>
      </>
    );
  }
}

export default Board;
