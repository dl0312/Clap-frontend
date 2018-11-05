import React from "react";
import { Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import {
  WIKIIMAGE,
  DELETE_WIKIIMAGE,
  CATEGORIES_KEYWORD,
  SEND_CLAP
} from "../../sharedQueries";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import {
  deleteWikiImage,
  deleteWikiImageVariables,
  getWikiImageById,
  getWikiImageByIdVariables,
  sendClap,
  sendClapVariables
} from "../../types/api";
// import toast from "react-toastify"

import ImagePopup from "../../Components/ImagePopup";
import { GetPos } from "../../Utility/GetPos";
import { toast } from "react-toastify";
import UserTag from "src/Components/UserTag";
import { Card, Icon, Skeleton } from "antd";
import { Meta } from "antd/lib/list/Item";

const WikiImageDetailContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WikiImageDetailInner = styled.div`
  width: 100%;
  min-width: 450px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// const CurrentHoverContainer = styled.div``;

interface IProps {
  history: any;
  match: { params: { wikiImageId: number; categoryId: number } };
}

interface IState {
  pos: { x: number; y: number };
  name: string;
  shownImgUrl: string;
  hoverImgJson: string;
  onImage: boolean;
  category: any;
}

class WikiImageQuery extends Query<
  getWikiImageById,
  getWikiImageByIdVariables
> {}

class SendClapQuery extends Mutation<sendClap, sendClapVariables> {}

class WikiImageDeleteQuery extends Mutation<
  deleteWikiImage,
  deleteWikiImageVariables
> {}

class WikiImageDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      pos: { x: 0, y: 0 },
      name: "",
      shownImgUrl: "",
      hoverImgJson: "",
      onImage: false,
      category: null
    };
  }

  public confirm = (data: any) => {
    const { DeleteWikiImage } = data;
    if (DeleteWikiImage.ok) {
      toast.success("Delete WikiImage Success");
      this.props.history.push(`/wiki`);
    } else {
      toast.error(DeleteWikiImage.error);
    }
  };

  public sendClapConfirm = (data: any) => {
    const { SendClap } = data;
    if (SendClap.ok) {
      toast.success("Clap Success");
    } else {
      toast.error(SendClap.error);
    }
  };

  public render() {
    const { pos, hoverImgJson, onImage } = this.state;
    console.log(this.props);
    return (
      <WikiImageQuery
        query={WIKIIMAGE}
        fetchPolicy={"cache-and-network"}
        variables={{ wikiImageId: this.props.match.params.wikiImageId }}
      >
        {({ loading, data, error }) => {
          if (loading)
            return (
              <WikiImageDetailContainer>
                <WikiImageDetailInner>
                  <Card
                    style={{ width: 300 }}
                    actions={[
                      <>
                        <Icon
                          style={{ marginRight: "5px" }}
                          key={1}
                          type="smile"
                        />
                      </>,
                      <>
                        <Icon
                          style={{ marginRight: "5px" }}
                          key={2}
                          type="edit"
                        />
                      </>,
                      <Icon key={3} type="ellipsis" />
                    ]}
                  >
                    <Skeleton loading={loading} avatar={true} active={true} />
                  </Card>
                </WikiImageDetailInner>
              </WikiImageDetailContainer>
            );
          if (error) return `${error.message}`;
          console.log(data);
          if (data !== undefined) {
            const { wikiImage, isClapped, isMine } = data.GetWikiImageById;
            return (
              wikiImage && (
                <WikiImageDetailContainer>
                  <Helmet>
                    <title>{`WikiImage: ${wikiImage.category.name}`}</title>
                  </Helmet>
                  <WikiImageDetailInner>
                    <SendClapQuery
                      mutation={SEND_CLAP}
                      onCompleted={data => this.sendClapConfirm(data)}
                    >
                      {SendClap => (
                        <WikiImageDeleteQuery
                          mutation={DELETE_WIKIIMAGE}
                          onCompleted={data => this.confirm(data)}
                        >
                          {DeleteWikiImage => (
                            <Card
                              style={{ width: 300 }}
                              cover={
                                <img
                                  src={wikiImage.shownImage}
                                  alt={wikiImage.name!}
                                  onMouseOver={() =>
                                    this.setState({
                                      hoverImgJson: wikiImage.hoverImage,
                                      onImage: true
                                    })
                                  }
                                  onMouseMove={(
                                    e: React.MouseEvent<HTMLImageElement>
                                  ) => this.setState({ pos: GetPos(e) })}
                                  onMouseOut={() => {
                                    this.setState({ onImage: false });
                                  }}
                                />
                              }
                              actions={
                                isMine
                                  ? [
                                      <>
                                        <span
                                          onClick={(e: any) => {
                                            e.preventDefault();
                                            SendClap({
                                              refetchQueries: [
                                                {
                                                  query: WIKIIMAGE,
                                                  variables: {
                                                    wikiImageId: this.props
                                                      .match.params.wikiImageId
                                                  }
                                                }
                                              ],
                                              variables: {
                                                wikiImageId: wikiImage.id
                                              }
                                            });
                                          }}
                                          style={{
                                            color: isClapped
                                              ? "#30cb46"
                                              : "rgba(0,0,0,.45)"
                                          }}
                                        >
                                          <Icon
                                            style={{ marginRight: "5px" }}
                                            key={1}
                                            type="smile"
                                          />
                                          {wikiImage.clapsCount}
                                        </span>
                                      </>,
                                      <>
                                        <Link
                                          to={`/category/${
                                            this.props.match.params.categoryId
                                          }/wikiImage/edit/${wikiImage.id}`}
                                        >
                                          <Icon
                                            style={{ marginRight: "5px" }}
                                            key={2}
                                            type="edit"
                                          />
                                        </Link>
                                      </>,
                                      <>
                                        <span
                                          onClick={(e: any) => {
                                            e.preventDefault();
                                            DeleteWikiImage({
                                              refetchQueries: [
                                                {
                                                  query: CATEGORIES_KEYWORD,
                                                  variables: {
                                                    keyword: ""
                                                  }
                                                }
                                              ],
                                              variables: {
                                                wikiImageId: wikiImage.id
                                              }
                                            });
                                          }}
                                        >
                                          <Icon key={3} type="delete" />
                                        </span>
                                      </>
                                    ]
                                  : [
                                      <>
                                        <span
                                          onClick={(e: any) => {
                                            e.preventDefault();
                                            SendClap({
                                              refetchQueries: [
                                                {
                                                  query: WIKIIMAGE,
                                                  variables: {
                                                    wikiImageId: this.props
                                                      .match.params.wikiImageId
                                                  }
                                                }
                                              ],
                                              variables: {
                                                wikiImageId: wikiImage.id
                                              }
                                            });
                                          }}
                                          style={{
                                            color: isClapped
                                              ? "#30cb46"
                                              : "rgba(0,0,0,.45)"
                                          }}
                                        >
                                          <Icon
                                            style={{ marginRight: "5px" }}
                                            key={1}
                                            type="smile"
                                          />
                                          {wikiImage.clapsCount}
                                        </span>
                                      </>
                                    ]
                              }
                            >
                              <Meta
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  margin: "-10px"
                                }}
                                title={<h2>{wikiImage.category.name}</h2>}
                                avatar={
                                  <div style={{ marginBottom: "10px" }}>
                                    <UserTag
                                      size={"small"}
                                      profilePhoto={wikiImage.user.profilePhoto}
                                      username={wikiImage.user.nickName}
                                    />
                                  </div>
                                }
                              />
                            </Card>
                          )}
                        </WikiImageDeleteQuery>
                      )}
                    </SendClapQuery>
                    <ImagePopup
                      pos={pos}
                      json={hoverImgJson}
                      onImage={onImage}
                    />
                    {/* <CurrentHoverContainer>
                      {wikiImage !== undefined ? (
                        <ImagePopup
                          pos={pos}
                          follow={false}
                          json={wikiImage.hoverImage}
                          onImage={true}
                        />
                      ) : (
                        <div>no hover image</div>
                      )}
                    </CurrentHoverContainer> */}
                  </WikiImageDetailInner>
                </WikiImageDetailContainer>
              )
            );
          } else {
            return null;
          }
        }}
      </WikiImageQuery>
    );
  }
}

export default WikiImageDetail;
