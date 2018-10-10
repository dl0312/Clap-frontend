import React from "react";
import { Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import {
  WIKIIMAGE,
  DELETE_WIKIIMAGE,
  CATEGORIES_KEYWORD
} from "../../sharedQueries";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { deleteWikiImage, deleteWikiImageVariables } from "../../types/api";
// import toast from "react-toastify"

import ImagePopup from "../../Components/ImagePopup";
import { GetPos } from "../../Utility/GetPos";
import { toast } from "react-toastify";
import { LOST_IMAGE_URL } from "../../constants";

const WikiImageDetailContainer = styled.div`
  width: 100%;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const WikiImageDetailInner = styled.div`
  width: 1000px;
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

const EditButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
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
  margin: 5px;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
`;

const CurrentName = styled.div`
  margin: 5px;
`;

const CurrentHoverContainer = styled.div``;

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

  public render() {
    const { pos, hoverImgJson, onImage } = this.state;
    return (
      <React.Fragment>
        <Query
          query={WIKIIMAGE}
          variables={{ wikiImageId: this.props.match.params.wikiImageId }}
        >
          {({ loading, data, error }) => {
            if (loading) return "Loading...";
            if (error) return `${error.message}`;
            console.log(data);
            const { wikiImage } = data.GetWikiImageById;
            return (
              <WikiImageDetailContainer>
                <Helmet>
                  <title>{`WikiImage: ${wikiImage.id}`}</title>
                </Helmet>
                <WikiImageDetailInner>
                  <WikiImageEditContainer>
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
                          onClick={e => {
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
                  </WikiImageEditContainer>

                  <WikiImageInfoContainer>
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
                    <CurrentName>{wikiImage.name}</CurrentName>
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
                    <ImagePopup
                      pos={pos}
                      json={hoverImgJson}
                      onImage={onImage}
                    />
                  </WikiImageInfoContainer>
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
