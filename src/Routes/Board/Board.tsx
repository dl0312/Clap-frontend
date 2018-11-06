import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps, Link } from "react-router-dom";
import {
  getAllPosts,
  getAllPostsVariables,
  getClappedPosts,
  getRisingPosts
} from "../../types/api";
// import { Helmet } from "react-helmet";
import styled from "styled-components";
import ImagePopup from "../../Components/ImagePopup";
import { POSTS, CLAPPEDPOSTS, RISINGPOSTS } from "../../sharedQueries";
// import { LOST_IMAGE_URL } from "../../constants";
import Loading from "../../Components/Loading";
// import CategoryTag from "src/Components/CategoryTag";
// import UserTag from "src/Components/UserTag";
import { Table, Tabs } from "antd";
import CategoryTag from "src/Components/CategoryTag";
import UserTag from "src/Components/UserTag";
const TabPane = Tabs.TabPane;

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
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
    title: "Id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Category",
    key: "category",
    dataIndex: "category",
    render: (category: any) => (
      <>
        <CategoryTag category={category} display={"both"} />
      </>
    )
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
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
    title: "User",
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
    title: "Clap",
    dataIndex: "clap",
    key: "clap"
  },
  {
    title: "View",
    dataIndex: "view",
    key: "view"
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: Date) => <span>{new Date(date).toLocaleDateString()}</span>
  }
];

// const dataSource = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"]
//   }
// ];

interface IProps extends RouteComponentProps<any> {}

interface IState {
  hoverImgJson: string;
  onImage: boolean;
  pos: { x: number; y: number };
  newGuideCounter: number;
}

class PostsQuery extends Query<getAllPosts, getAllPostsVariables> {}
class ClappedPostsQuery extends Query<getClappedPosts> {}
class RisingPostsQuery extends Query<getRisingPosts> {}

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
      <>
        <BoardContainer>
          <Tabs
            defaultActiveKey="1"
            tabPosition={"left"}
            style={{ height: "100%" }}
          >
            <TabPane tab="Recent" key="1">
              <PostsQuery
                query={POSTS}
                fetchPolicy={"cache-and-network"}
                variables={{ limit: 100, type: "createdAt" }}
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
                  const posts = data.GetAllPosts.posts;
                  console.log(posts);
                  return (
                    <React.Fragment>
                      {posts && (
                        <Table
                          size={"small"}
                          // style={{ backgroundColor: "white" }}
                          columns={columns}
                          dataSource={posts.map(post => {
                            return {
                              id: post!.id,
                              title: post,
                              user: post!.user,
                              category: post!.category,
                              clap: post!.clapsCount,
                              view: post!.view,
                              date: post!.createdAt
                            };
                          })}
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
              </PostsQuery>
            </TabPane>
            <TabPane tab="Clapped" key="2">
              <ClappedPostsQuery
                query={CLAPPEDPOSTS}
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
                  const posts = data.GetClappedPosts.posts;
                  console.log(posts);
                  return (
                    <React.Fragment>
                      {posts && (
                        <Table
                          size={"small"}
                          // style={{ backgroundColor: "white" }}
                          columns={columns}
                          dataSource={posts.map((post: any) => {
                            return {
                              id: post!.id,
                              title: post,
                              user: post!.user,
                              category: post!.category,
                              clap: post!.clapsCount,
                              view: post!.view,
                              date: post!.createdAt
                            };
                          })}
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
              </ClappedPostsQuery>
            </TabPane>
            <TabPane tab="Rising" key="3">
              <RisingPostsQuery
                query={RISINGPOSTS}
                fetchPolicy={"cache-and-network"}
                variables={{ limit: 100, type: "createdAt" }}
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
                  const posts = data.GetRisingPosts.posts;
                  console.log(posts);
                  return (
                    <React.Fragment>
                      {posts && (
                        <Table
                          size={"small"}
                          // style={{ backgroundColor: "white" }}
                          columns={columns}
                          dataSource={posts.map(post => {
                            return {
                              id: post!.id,
                              title: post,
                              user: post!.user,
                              category: post!.category,
                              clap: post!.clapsCount,
                              view: post!.view,
                              date: post!.createdAt
                            };
                          })}
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
              </RisingPostsQuery>
            </TabPane>
          </Tabs>
        </BoardContainer>
      </>
    );
  }
}

export default Board;
