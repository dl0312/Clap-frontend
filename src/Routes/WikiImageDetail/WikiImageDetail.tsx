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
import { deleteWikiImage, deleteWikiImageVariables } from "../../types/api";
// import toast from "react-toastify"

import ImagePopup from "../../Components/ImagePopup";
import { GetPos } from "../../Utility/GetPos";
import { toast } from "react-toastify";
import { LOST_IMAGE_URL } from "../../constants";
import UserTag from "src/Components/UserTag";

const WikiImageDetailContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WikiImageDetailInner = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid white;
`;

const WikiImageEditContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const WikiImageInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CategoryTitle = styled.div`
  outline: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bolder;
  text-transform: uppercase;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  outline: 1px solid white;
  font-size: 12px;
`;

const CountIcon = styled.i`
  margin: 5px;
`;

const CountItem = styled.div``;

interface IEditButtonProps {
  isClapped: boolean;
}

const EditButton = styled<IEditButtonProps, any>("button")`
  border: none;
  background-color: transparent;
  cursor: pointer;
  opacity: ${props => (props.isClapped ? "1" : "0.5")};
  & svg {
    fill: white;
    transition: fill 0.5s ease;
  }
  &:hover {
    & svg {
      fill: green;
    }
  }
`;

const CurrentImg = styled.img`
  width: 200px;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
  outline: 1px solid white;
`;

const CurrentName = styled.div``;

const CurrentHoverContainer = styled.div`
  outline: 1px solid white;
`;

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
    return (
      <React.Fragment>
        <Query
          query={WIKIIMAGE}
          fetchPolicy={"cache-and-network"}
          variables={{ wikiImageId: this.props.match.params.wikiImageId }}
        >
          {({ loading, data, error }) => {
            if (loading) return "Loading...";
            if (error) return `${error.message}`;
            console.log(data);
            const { wikiImage, isClapped, isMine } = data.GetWikiImageById;
            return (
              <WikiImageDetailContainer>
                <Helmet>
                  <title>{`WikiImage: ${wikiImage.id}`}</title>
                </Helmet>
                <WikiImageDetailInner>
                  <WikiImageEditContainer>
                    <Mutation
                      mutation={SEND_CLAP}
                      onCompleted={data => this.sendClapConfirm(data)}
                    >
                      {SendClap => (
                        <EditButton
                          onClick={(e: any) => {
                            e.preventDefault();
                            SendClap({
                              refetchQueries: [
                                {
                                  query: WIKIIMAGE,
                                  variables: {
                                    wikiImageId: this.props.match.params
                                      .wikiImageId
                                  }
                                }
                              ],
                              variables: {
                                wikiImageId: wikiImage.id
                              }
                            });
                          }}
                          isClapped={isClapped}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z" />
                          </svg>
                        </EditButton>
                      )}
                    </Mutation>
                    {isMine ? (
                      <React.Fragment>
                        <Link
                          to={`/category/${
                            this.props.match.params.categoryId
                          }/wikiImage/edit/${wikiImage.id}`}
                        >
                          <EditButton>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              color="white"
                            >
                              <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" />
                            </svg>
                          </EditButton>
                        </Link>
                        <WikiImageDeleteQuery
                          mutation={DELETE_WIKIIMAGE}
                          onCompleted={data => this.confirm(data)}
                        >
                          {DeleteWikiImage => (
                            <EditButton
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                color="white"
                              >
                                <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                              </svg>
                            </EditButton>
                          )}
                        </WikiImageDeleteQuery>
                      </React.Fragment>
                    ) : null}
                  </WikiImageEditContainer>
                  <WikiImageInfoContainer>
                    <CategoryTitle>{wikiImage.category.name}</CategoryTitle>
                    {wikiImage ? (
                      <React.Fragment>
                        <CurrentImg
                          src={wikiImage.shownImage}
                          alt={wikiImage.name}
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
                      </React.Fragment>
                    ) : (
                      <CurrentImg src={LOST_IMAGE_URL} />
                    )}
                    <CountContainer>
                      <CountItem>
                        <CountIcon className="fas fa-heart" />
                        {wikiImage.clapsCount}
                      </CountItem>
                      <CountItem>
                        <CountIcon className="fas fa-pencil-alt" />
                        {wikiImage.postsCount}
                      </CountItem>
                    </CountContainer>
                    <CurrentName>{wikiImage.name}</CurrentName>
                    <UserContainer>
                      <UserTag
                        size={"SMALL"}
                        profilePhoto={wikiImage.user.profilePhoto}
                        username={wikiImage.user.nickName}
                      />
                    </UserContainer>

                    <ImagePopup
                      pos={pos}
                      json={hoverImgJson}
                      onImage={onImage}
                    />
                  </WikiImageInfoContainer>
                  <CurrentHoverContainer>
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
                  </CurrentHoverContainer>
                </WikiImageDetailInner>
              </WikiImageDetailContainer>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default WikiImageDetail;
